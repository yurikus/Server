"use strict";

function main(sessionID) {
    if (!account_f.accountServer.isWiped(sessionID)) {
        updateTraders(sessionID);
        updatePlayerHideout(sessionID);
    }
}

function updateTraders(sessionID) {
    // update each hour
    let update_per = 3600;
    let timeNow = Math.floor(Date.now() / 1000);
    let tradersToUpdateList = trader_f.traderServer.getAllTraders(sessionID);

    tradersToUpdateList = tradersToUpdateList.data;
    
    for (let i = 0; i < tradersToUpdateList.length; i++) {
        if ((tradersToUpdateList[i].supply_next_time + update_per) > timeNow) {
            continue;
        }

        // update restock timer
        let substracted_time = timeNow - tradersToUpdateList[i].supply_next_time;
        let days_passed = Math.floor((substracted_time) / 86400);
        let time_co_compensate = days_passed * 86400;
        let newTraderTime = tradersToUpdateList[i].supply_next_time + time_co_compensate;
        let compensateUpdate_per = Math.floor((timeNow - newTraderTime) / update_per);

        compensateUpdate_per = compensateUpdate_per * update_per;
        newTraderTime = newTraderTime + compensateUpdate_per + update_per;
        tradersToUpdateList[i].supply_next_time = newTraderTime;
    }
}

function updatePlayerHideout(sessionID) {
    let pmcData = profile_f.profileServer.getPmcProfile(sessionID);
    let receipes = json.parse(json.read(db.user.cache.hideout_production));
    let btcFarmLevel;
    let solarPowerLevel = 0;
    let btcFarmCGs = 0;
    let isGeneratorOn;

    for( let area of pmcData.Hideout.Areas)
    {
        if(area.type == 18){solarPowerLevel = area.level}
    }
    for (let area in pmcData.Hideout.Areas) 
    {
        switch(pmcData.Hideout.Areas[area].type)
        {
            case 4:
                isGeneratorOn = pmcData.Hideout.Areas[area].active;
                if(isGeneratorOn == true)
                {
                    pmcData.Hideout.Areas[area] = updateFuel(pmcData.Hideout.Areas[area],solarPowerLevel);//i know solapower is always false but let me find a workaround later
                }
                break;

            case 17:
                if(isGeneratorOn){ pmcData.Hideout.Areas[area] = updateAirFilters(pmcData.Hideout.Areas[area]) }
                break;

            case 20:
                btcFarmLevel = pmcData.Hideout.Areas[area].level;
                for(let slot of pmcData.Hideout.Areas[area].slots )
                {
                    if(slot.item != null){btcFarmCGs++;}
                }
                break;
        }
    }

    // update production time
    for (let prod in pmcData.Hideout.Production)
    { 
        if(pmcData.Hideout.Production[prod].inProgress == false){continue;}

        let needGenerator = false;
        for(let receipe of receipes.data)
        {
            if(receipe._id == pmcData.Hideout.Production[prod].RecipeId )
            {
                if(receipe.continuous == true)
                {
                    needGenerator = true;
                }

                if(pmcData.Hideout.Production[prod].RecipeId == "5d5c205bd582a50d042a3c0e") //if its btcFarm
                {
                    if(isGeneratorOn == true)
                    {
                        pmcData.Hideout.Production[prod] = updateBitcoinFarm(pmcData.Hideout.Production[prod],receipe,btcFarmLevel,btcFarmCGs);
                    }
                }
                else
                {
                    let time_elapsed = (Math.floor(Date.now() / 1000) - pmcData.Hideout.Production[prod].StartTime) - pmcData.Hideout.Production[prod].Progress;
                    if(needGenerator == true && isGeneratorOn == false)
                    {
                        time_elapsed = time_elapsed*0.2;
                    }
                    pmcData.Hideout.Production[prod].Progress += time_elapsed; 

                    /*
                    if(pmcData.Hideout.Production[prod].Progress > receipe.productionTime)
                    {
                        pmcData.Hideout.Production[prod].inProgress = false;
                    }*/
                }
            }
        }
    }

}

function updateFuel(generatorArea,solarPower)
{   
    let decreaseFuel = 0.0665;

    if(solarPower == 1){ decreaseFuel = 0.0332; }

    for (let i = 0; i < generatorArea.slots.length; i++) 
    {
        if(generatorArea.slots[i].item == null || generatorArea.slots[i].item === undefined){continue;}
        else
        {
            let resourceValue = (typeof generatorArea.slots[i].item[0].upd.Resource !== "undefined" ? generatorArea.slots[i].item[0].upd.Resource.Value : null);  
            if(resourceValue == null)
            {
                resourceValue = 100-decreaseFuel;
            }
            else
            {
                resourceValue -= decreaseFuel
            }
            resourceValue = Math.round(resourceValue * 1000) / 1000;
            generatorArea.slots[i].item[0].upd ={ "StackObjectsCount": 1,"Resource": {"Value": resourceValue} } ;
            console.log("Generator : " + resourceValue + " fuel left on slot " + (i+1) )
            break;//break here to avoid update all the fuel tanks
        }
    }
    return generatorArea;
}

function updateAirFilters(airFilterArea)
{
    let decreaseValue = 0.00417;

    for (let i = 0; i < airFilterArea.slots.length;  i++) 
    { 
        if(airFilterArea.slots[i].item == null || airFilterArea.slots[i].item === undefined){continue;}
        else
        {
            let resourceValue = (typeof airFilterArea.slots[i].item[0].upd.Resource !== "undefined" ? airFilterArea.slots[i].item[0].upd.Resource.Value : null);  
            if(resourceValue == null)
            {
                resourceValue = 300-decreaseValue;
            }
            else
            {
                resourceValue -= decreaseValue
            }
            resourceValue = Math.round(resourceValue * 10000) / 10000;
            airFilterArea.slots[i].item[0].upd = { "StackObjectsCount": 1,"Resource": {"Value": resourceValue} } ;
            console.log("air filters : " + resourceValue +" left on tank " + (i+1) )
            break;
        }
    }
    return airFilterArea;
}

function updateBitcoinFarm(btcProd,farmReceipe,btcFarmLevel,btcFarmCGs)
{
    //console.log("bitcoin farm : level "+ btcFarmLevel + " & cgs = " +btcFarmCGs)

    let time_elapsed = 120;
    let speedBoost = 2940/(3*btcFarmCGs+46)^-2 //this is an invert function from tarkov wiki, very usefull

    time_elapsed = time_elapsed - speedBoost;
  
    btcProd.Progress += time_elapsed; 

    if(btcProd.Progress > 72000 && btcProd.Products[0] === undefined)
    {
        //btcProd.Products[0].push({ id: newid(), tpl:farmReceipe.Endproduct,upd:{stackthingblablabal:1}})
    }
    if(btcProd.Progress > 144000 && btcProd.Products[1] === undefined && btcFarmLevel > 1)
    {
        //add a second btc
    }
    if(btcProd.Progress > 216000 && btcProd.Products[2] === undefined && btcFarmLevel > 2)
    {
        //add a third btc and then reset timer of btcProd.Progress
    }
    
    return btcProd;
}

module.exports.main = main;
