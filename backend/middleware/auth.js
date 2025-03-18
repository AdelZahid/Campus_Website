import jwt from "jsonwebtoken";

const protect = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);
    req.user = { _id: decoded.userId };
    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(401).json({ message: "Not authorized, token failed" });
  }
};

export { protect };
