const Trade = require('../model');
const { errorHandler } = require("../helpers/errorHandler");
const unselect = '-updatedAt -__v -_id';

exports.tradeByUserId = (req, res, next, userId) => {
    Trade.find({'user.id': userId}).select(unselect).exec((err, data) => {
        if(err) return res.status(400).json({ error: err });
        if(!data) return res.status(404).json({ error: "No existe el id indicado" });
        else {
            req.trade = data;
            next();
        }
    });
};

exports.listByUser = (req, res) => {
    return res.status(200).json(req.trade);
}

exports.create = (req, res) => {
    const { id, type, user, symbol, shares, price } = req.body;
    if( !id || !type || !user || !user.id || !user.name || !symbol || !shares || !price) {
        return res.status(400).json({ error: "Debe enviar todos los datos" });
    }
    const trade = new Trade(req.body);
    trade.save((err, data) => {
        if(err) return res.status(400).json({ error: errorHandler(err) })
        const response = {
            id: data.id,
            type: data.type,
            user: data.user,
            symbol: data.symbol,
            shares: data.shares,
            price: data.price,
            timestamp: data.timestamp
        };
        return res.status(201).json(response);
    });
};

exports.getAll = (req, res) => {
    Trade.find().sort({ id: 1 }).select(unselect).exec((err, data) => {
        if(err) return res.status(400).json({ error: "Error al obtener las transacciones" });
        return res.json(data);
    });
};

exports.deleteAll = (req, res) => {
    Trade.deleteMany().exec((err, data) => {
        if(err) return res.status(400).json({ error: "Error al eliminar las transacciones" });
        return res.status(200).json({});
    });
}