import userService from "../service/user.service.js";
import { ApiResponse } from "../utility/api-response.js";
import { MESSAGES } from "../utility/messages.js";

const register = async (req, res, next) => {
  try {
    const { name, email, password, type } = req.body;
    await userService.registerService(name, email, password, type);
    return res.send(new ApiResponse(200, MESSAGES.REGISTER_SUCCESS));
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userService.loginService(email, password);
    return res.send(new ApiResponse(200, user, MESSAGES.LOGIN_SUCCESS));
  } catch (error) {
    next(error);
  }
};


export { register, login };
