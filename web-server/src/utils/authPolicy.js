import Joi from "joi";

export default {
  register: (req, res, next) => {
    const schema = {
      email: Joi.string().email(),
      password: Joi.string().regex(new RegExp("^[a-zA-Z0-9]{4,32}$"))
    };
    const { error, value } = Joi.validate(req.body, schema);
    if (error) {
      switch (error.details[0].context.key) {
        case "email":
          res.send({
            confirmation: false,
            error: "email address is not valid"
          });
          break;
        case "password":
          res.send({
            confirmation: false,
            error: `the password provided failed to match the following rules:
                    <br>
                    1. It must contain ONLY the following characters: lower case, upper case, numerics
                    <br>
                    2. It must be at least 4 characters and not greater than 32 characters.
                    `
          });
          break;
        default:
          res.send({
            confirmation: false,
            error: "invalid registration infomation"
          });
      }
    } else {
      next(); // call next if no errors in validation
    }
  }
};
