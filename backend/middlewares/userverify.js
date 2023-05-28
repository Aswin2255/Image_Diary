import jwt from "jsonwebtoken";
import usermodel from "../models/usermodel.js";

export const verifyuser = async (req, res, next) => {
  try {
    let token = req.cookies.jwt;
    if (token) {
      jwt.verify(token, "secret", async (err, decodedtoken) => {
        if (err) {
          res
            .status(401)
            .json({
              status: false,
              errorcode: 1,
              message: "jwt token expired",
            });
        } else {
          req.user = decodedtoken.id;

          next();
        }
      });
    } else {
      res
        .status(401)
        .json({ status: false, errorcode: 1, message: "jwt token missing" });
    }
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};
