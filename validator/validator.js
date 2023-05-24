const Joi =require('joi')
const { clientError, serverError } = require("./joiresponce");
module.exports.updateProfileValidator=async function(req, res, next) {
    const schema = Joi.object().keys({
        phonenumber: Joi.string().required(),
        name: Joi.string(),
        website: Joi.string(),
        email: Joi.string().email(),
        gender: Joi.string(),
        dob: Joi.string(),
        business_category:Joi.string(),
        business_address:Joi.string(),
        business_ph_1:Joi.string(),
        business_ph_2:Joi.string()

    });
    try {
      const { error } = await schema.validate(req.body);
      if (error) {
        return clientError(req, res, error);
      }
      return next();
    } 
    catch (error) {
      return serverError(req, res, error);
    }
  

  };