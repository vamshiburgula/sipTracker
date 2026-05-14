import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

const SECRET_KEY: string | undefined | any = process.env.JWT_SECRET;

export const signJWT = (payload: object) => {
  try {
    return jwt.sign(payload, SECRET_KEY, {
      expiresIn: "1d",
    });
  } catch (err: any) {
    return err.message;
  }
};

export const verifyJWT = (token: string) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (err: any) {
    return err.message;
  }
};
