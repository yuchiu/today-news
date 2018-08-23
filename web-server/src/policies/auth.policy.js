import Joi from "joi";

const authPolicy = {
  register: (req, res, next) => {
    const schema = {
      username: Joi.string().regex(new RegExp("^[a-zA-Z0-9]{4,32}$")),
      email: Joi.string().email(),
      password: Joi.string().regex(new RegExp("^[a-zA-Z0-9]{4,32}$"))
    };
    const { error, value } = Joi.validate(req.body, schema);
    if (error) {
      switch (error.details[0].context.key) {
        case "username":
          res.status(400).send({
            confirmation: false,
            message: "username is not valid"
          });
          break;
        case "email":
          res.status(400).send({
            confirmation: false,
            message: "email address is not valid"
          });
          break;
        case "password":
          res.status(400).send({
            confirmation: false,
            message: `the password provided failed to match the following rules:
                    <br>
                    1. It must contain ONLY the following characters: lower case, upper case, numerics
                    <br>
                    2. It must be at least 4 characters and not greater than 32 characters.
                    `
          });
          break;
        default:
          res.status(400).send({
            confirmation: false,
            message: "invalid registration infomation"
          });
      }
    } else {
      next(); // call next if no errors in validation
    }
  }
};
export default authPolicy;
