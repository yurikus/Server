"use strict";

require('../libs.js');

router.addItemRoute("Move", move_f.moveItem);
router.addItemRoute("Remove", move_f.discardItem);
router.addItemRoute("Split", move_f.splitItem);
router.addItemRoute("Merge", move_f.mergeItem);
router.addItemRoute("Transfer", move_f.transferItem);
router.addItemRoute("Swap", move_f.swapItem);