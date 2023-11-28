import bcrypt from 'bcrypt';
import { hashPassword } from "../utils/hashing.js";
// import { generateToken } from '../middleware/authenticateToken.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();



export async function signup (req, res){
    const { username, password} = req.body;

    try {
        const hash = await hashPassword(password);

        const user = await prisma.user.create({data : {
          username, 
          password:hash
        },
      });
        res.status(201).json(user);
    }
    catch (err ) {
        console.log(err);
        res.status(404).send('error, user tidak berhasil dibuat');
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

    const token = jwt.sign({ username: user.username }, `${process.env.JWT_TOKEN}`, { expiresIn: '1h' });
    
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
  res.clearCookie('token', {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  });
  res.sendStatus(204);

}