const UserService = require('./user.service');

class UserController {
  async insert(req, resp) {
    let respObj = await UserService.insert(req.body);
    
    if (respObj.user) {
      return resp.status(200).send(respObj.user);
    }

    if (respObj.duplicationErrors ) {
      return resp.status(400).send(respObj.duplicationErrors);
    }
    if (respObj.validationErrors ) {
      return resp.status(400).send(respObj.validationErrors);
    }

    if (respObj.error ) {
      console.log(respObj.error)
      return resp.status(400).send({message: "Validation Error"});
    }
    return resp.status(500).send({message: "Registration Error"});
  }
  
  async list(req, resp) {
    return await UserService.list(req, resp);
  }
  
  async getByEmail(req, resp) {
    return await UserService.getByEmail(req.params.email);
  }

  async getByMobile(req, resp) {
    return await UserService.getByMobile(req.params.mobile);
  }
}

module.exports = new UserController();
