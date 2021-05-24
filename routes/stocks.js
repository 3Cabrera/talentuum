var express = require('express');
var router = express.Router();

const { stockBySymbol, listBySymbol, listBySymbolAndPrice } = require('../controllers/stocks');

// Routes related to stocks
router.get("/stocks/:stockSymbol/trades", listBySymbol);
router.get("/stocks/:stockSymbol/price", listBySymbolAndPrice);

router.param("stockSymbol", stockBySymbol);

module.exports = router;