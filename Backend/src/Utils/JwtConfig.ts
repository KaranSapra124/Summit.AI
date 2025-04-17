import { sign, SignOptions, verify } from "jsonwebtoken";

interface DecodedToken {
  userId: string;
  iat: number;
  exp: number;
}

export const generateToken = (
  id: string,
  secretKey: string,
  expiresIn: string
) => {
  return sign({ userId: id }, secretKey, { expiresIn } as SignOptions);
};

export const verifyToken = (token: string, secretKey: string) => {
  return verify(token, secretKey);
};
