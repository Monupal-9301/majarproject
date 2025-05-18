const Joi = require('joi');
const schema2 = Joi.object({
    review:Joi.object({
        rating:Joi.number().min(1).max(5).required(),
        comment:Joi.string().required(),
        createdAt:Joi.date().required()
   })

});
    
module.exports=schema2;
