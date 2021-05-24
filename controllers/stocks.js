const Trade = require('../model');

const unselect = '-updatedAt -__v -_id';

exports.stockBySymbol = (req, res, next, symbol) => {
    Trade.find({ symbol }).exec((err, data) => {
        if(err) return res.status(400).json({ error: err });
        else if(!data) return res.status(404).json({ error: "No existe el symbolo indicado" });
        else {
            req.symbol = symbol;
            next();
        }
    });
};

exports.listBySymbol = (req, res) => {
    const { type, start, end } = req.query;
    let conditions = { symbol: req.symbol };
    let timestamp = {};
    if(type) conditions.type = type;
    if(start) timestamp = { $gte: new Date(new Date(start).setUTCHours(0,0,0,0)) };
    if(end) timestamp = { ...timestamp, $lte: new Date(new Date(end).setUTCHours(23,59,59,59)) };
    if(Object.keys(timestamp).length > 0) conditions = { ...conditions, timestamp };

    Trade.find(conditions)
        .select(unselect)
        .sort({ id: 1 })
        .exec((err, data) => {
        if(err) return res.status(400).json({ error: "Error al buscar las transacciones"});
        return res.status(200).json(data);
    });
};

exports.listBySymbolAndPrice = (req, res) => {
    const { start, end } = req.query;
    let conditions = { symbol: req.symbol };
    let timestamp = {};
    if(start) timestamp = { $gte: new Date(new Date(start).setUTCHours(0,0,0,0)) };
    if(end) timestamp = { ...timestamp, $lte: new Date(new Date(end).setUTCHours(23,59,59,59)) };
    if(Object.keys(timestamp).length > 0) condition = { ...conditions, timestamp };

    Trade.aggregate([
        { $project: { _id: 0, __v: 0, updatedAt: 0 }},
        { $match: { ...conditions }},
        { $group: { _id: "$symbol", highest: { $max: "$price" }, lowest: { $min: "$price" } } },
        { $addFields: { symbol: "$_id" } },
        { $unset: "_id" }
    ]).exec((err, data) => {
        if(err) return res.status(400).json({ error: err});
        return res.status(200).json(data[0]);
    })
}