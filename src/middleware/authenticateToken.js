import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export async function authenticateToken(req, res, next) {
  // Mendapatkan token dari header Authorization
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.sendStatus(401)
  
  try {
    const decoded = jwt.verify(token, `${process.env.JWT_TOKEN}`);
    req.user = decoded;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }
    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    }
    // Handle kesalahan lainnya
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
