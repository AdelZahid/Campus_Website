import jwt from "jsonwebtoken";

const createTonkenAndSaveCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_TOKEN, {
    expiresIn: "10d",
  });
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Only set secure in production
    sameSite: "strict",
    domain: "localhost",
    maxAge: 10 * 24 * 60 * 60 * 1000,
  });
};

export default createTonkenAndSaveCookie;
