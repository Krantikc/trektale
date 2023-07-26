const bcrypt = require('bcryptjs');
const Joi = require('@hapi/joi');
const User = require('../../models/user.model');
const ErrorHandlerService = require('../../util/error-handler.service');

const userSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email(),
  mobile: Joi.string().regex(/^[1-9][0-9]{9}$/),
  password: Joi.string().required()
})

class UserService {
    async insert(user) {
      user = await userSchema.validate(user, { abortEarly: false }).value;
      console.log(user);
      user.password = bcrypt.hashSync(user.password, 10);
      
      //delete user.password;
      let newUser = null;
      let errorList = [];
      try {
        errorList = await this.validateDuplication(user);
        console.log('============ errors ========');
        console.log(errorList)
        if (errorList.length > 0) {
          return {duplicationErrors: errorList};
        }
        newUser = await new User(user).save();
      } catch (error) {
        if (error.name == 'ValidationError') {
          const errorList = ErrorHandlerService.parseValidationErrors(error.errors)
          return {validationErrors: errorList}
        }
        return {error};
      }
      
      return {user: newUser};
    }
    
    async list(req, resp) {
      const users = await User.find({});
      return resp.json(users);
    }
    
    async getByEmail(email) {
      const user = await User.findOne({
        email: email
      });
      return user;
    }

    async getByMobile(mobile) {
      const user = await User.findOne({
        mobile: mobile
      });
      return user;
    }

    async validateDuplication(user) {
      const errors = []
      const userByEmail = await this.getByEmail(user.email);
      const userByMobile = await this.getByMobile(user.mobile);

      console.log('userByEmail ==============')
      console.log(userByEmail)
      console.log('userBymobil ==============')
      console.log(userByMobile)
      if (userByEmail || userByMobile) {
        if (userByEmail) {
          errors.push({
            name: 'DuplicationError',
            message: 'Email Id is already in use'
          });
        }
        if (userByMobile) {
          errors.push({
            name: 'DuplicationError',
            message: 'Mobile number is already in use'
          });
        }
      }
      return errors;
    }
}

module.exports = new UserService();