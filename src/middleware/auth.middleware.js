import jwt from "jsonwebtoken";
import { MESSAGES } from "../utility/messages.js";

const authMiddleware = (userType) => (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res
        .status(401)
        .json({ error: MESSAGES.AUTHORIZATION_HEADER_MISSING });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: MESSAGES.TOKEN_MISSING });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ error: MESSAGES.INVALID_TOKEN });
      }

      // Check if user type matches required type
      if (userType && user.type !== userType) {
        return res.status(403).json({ error: MESSAGES.UNAUTHORIZED_ACCESS });
      }

      req.user = {
        user_id: user.id,
        type: user.type,
      };
      next();
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" + error });
  }
};

export default authMiddleware;
