import db from "../models/index.js";
import { ApiError } from "../utility/api-error.js";
import {
  comparePassword,
  generateToken,
  hashPassword,
} from "../utility/helper.js";
import { MESSAGES } from "../utility/messages.js";

const user = db.user;

const registerService = async (name, email, password, type) => {
  try {
    const existingUser = await getUserByEmail({email});
    if (existingUser) {
      throw new ApiError(409, MESSAGES.USER_ALREADY_EXISTS);
    }
    const hash = await hashPassword(password);
    const userData = await insertUser(name, email, hash, type);
    if (!userData) {
      throw new ApiError(500, MESSAGES.FAILED_TO_CREATE_USER);
    }

    return userData;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(500, MESSAGES.INTERNAL_SERVER_ERROR, error);
  }
};

const loginService = async (email, inputPassword) => {
  try {
    const existingUser = await getUserByEmail({email}, [
      "id",
      "name",
      "password",
      "email",
      "type",
    ]);
    if (!existingUser) throw new ApiError(404, MESSAGES.USER_NOT_FOUND);

    const isPasswordValid = await comparePassword(
      inputPassword,
      existingUser.password
    );
    if (!isPasswordValid) throw new ApiError(401, MESSAGES.INVALID_PASSWORD);

    const token = generateToken({
      id: existingUser.id,
      type: existingUser.type,
    });
    const { password, ...userWithoutPassword } = existingUser;
    return { ...userWithoutPassword, token };
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(500, MESSAGES.INTERNAL_SERVER_ERROR + error);
  }
};

const insertUser = async (name, email, password, type) => {
  try {
    const userData = await user.create({
      name: name,
      email: email,
      password: password,
      type: type,
    });
    return userData;
  } catch (error) {
    throw new ApiError(404, MESSAGES.ERROR_WHILE_CREATING_USER + error.message);
  }
};

const getUserByEmail = async (where, attributes) => {
  where = { ...where, is_active: true };
  try {
    const userData = await user.findOne({
      where,
      attributes,
      raw: true,
    });
    return userData;
  } catch (error) {
    throw new Error(MESSAGES.ERROR_WHILE_FETCHING_USER + error.message);
  }
};


export { registerService, loginService, getUserByEmail };
