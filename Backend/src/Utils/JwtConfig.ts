import { sign, verify } from "jsonwebtoken";

interface DecodedToken {
  userId: string;
  iat: number;
  exp: number;
}

export const generateToken = (
  id: string,
  secretKey: string,
  expiresIn: number
) => {
  return sign({ userId: id }, secretKey, { expiresIn });
};

export const verifyToken = (token: string, secretKey: string) => {
  return verify(token, secretKey);
};
