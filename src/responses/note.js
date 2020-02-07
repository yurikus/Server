"use strict";

require('../libs.js');

router.addItemRoute("AddNote", note_f.addNote);
router.addItemRoute("EditNote", note_f.editNode);
router.addItemRoute("DeleteNote", note_f.deleteNote);