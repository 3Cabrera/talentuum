var express = require('express');
var router = express.Router();
const { deleteAll } = require("../controllers/trades");
// Route to delete all trades

router.delete("/erase", deleteAll);
module.exports = router;
