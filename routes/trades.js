const express = require('express');
const router = express.Router();
const { create, getAll, listByUser, tradeByUserId } = require("../controllers/trades");

// Routes related to trades

router.post("/trades", create);
router.get("/trades", getAll);
router.get("/trades/users/:userId", listByUser);

router.param("userId", tradeByUserId);

module.exports = router;