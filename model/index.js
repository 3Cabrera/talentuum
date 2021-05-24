const mongoose = require('mongoose');

const tradeSchema = new mongoose.Schema(
    {
        id: {
            type: Number,
            unique: true,
            trim: true,
            required: true
        },
        type: {
            type: String,
            trim: true,
            required: true
        },
        user:  {
            id: {
                type: Number,
                required: true
            },
            name: {
                type: String,
                trim: true
            }
        },
        symbol: {
            type: String,
            trim: true,
            required: true
        },
        shares: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        }
    },
    { timestamps: { createdAt: 'timestamp' } }
);

// tradeSchema
//     .virtual('timestamp')
//     .get(function() { this.createdAt })
//     .set(function(createdAt) {
//         this.timestamp = createdAt;
//     });

module.exports = mongoose.model('Trade', tradeSchema);