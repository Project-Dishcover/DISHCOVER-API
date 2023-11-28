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
    next(); // Panggil next jika otentikasi berhasil
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }
    return res.status(401).json({ message: "Invalid token" });
  }
}
