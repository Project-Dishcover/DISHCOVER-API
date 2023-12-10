import bcrypt from 'bcrypt';
import { hashPassword } from "../utils/hashing.js";
// import { generateToken } from '../middleware/authenticateToken.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();



export async function signup(req, res) {
  const { name, username, email, password } = req.body;

  try {
      // Cek apakah email atau username sudah ada
      const existingUser = await prisma.user.findFirst({
          where: {
              OR: [
                  { email: email },
                  { username: username },
              ],
          },
      });

      if (existingUser) {
          // Jika email atau username sudah ada, kirim respons kesalahan
          return res.status(409).json({
              message: 'Email atau username sudah digunakan. Silakan gunakan yang lain.',
          });
      }

      // Jika email dan username unik, lanjutkan dengan membuat pengguna baru
      const hash = await hashPassword(password);

      const newUser = await prisma.user.create({
          data: {
              name,
              email,
              username,
              password: hash,
          },
      });

      res.status(201).json({
        message: "berhasil membuat akun",
        data:{
          id: newUser.id,
          username: newUser.username,
        }
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({
          message: 'Terjadi kesalahan server',
      });
  }
}



export async function login(req, res) {
  try {
    const { username, password } = req.body;
    const user = await prisma.user.findFirst ({ where: {username} });

    if (!user) {
      return res.status(401).json({ message: 'username or password is incorrect' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ message: 'username or password is incorrect' });
    }

    const payload = {
      id: user.id,
      username: user.username
    }
    const token = jwt.sign(payload, `${process.env.JWT_TOKEN}`, { expiresIn: '10h' });
    
    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 30 * 60 * 1000, // 30 minutes
    });
    res.status(200).json({
      message: 'Login successful',
      token,
    });
    // res.header('auth-token', token).send('Berhasil Login');
    // res.status(200).json({ message : 'login berhasil'});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}


export async function logout (req, res) {
  try {
    res.clearCookie('token');

    // Tambahkan pesan "Berhasil Logout" ke respons
    res.status(204).json({
      message: 'Berhasil Logout',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Terjadi kesalahan server',
    });
  }
}