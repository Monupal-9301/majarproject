const Joi = require('joi');

const schema = Joi.object({
    listing:Joi.object({
        title: Joi.string().required(),
         description: Joi.string().required(),
        price: Joi.number().min(0).required(),
        image:Joi.string().allow("",null),
        location: Joi.string().required(),
        country: Joi.string().required(),

    })
    
});

module.exports = schema;