import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

import prisma from '../utils/prisma.js';

dotenv.config();

export const isAuthenticated = async (req, res, next) => {
  try {
    const accessToken = req.headers['authorization'];
    if (accessToken && accessToken.startsWith('Bearer ')) {
      const token = accessToken.slice(7, accessToken.length);

      const userData = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET);

      const user = await prisma.user.findUnique({
        where: { id: userData.id },
        include: {
          orders: true,
          reviews: true,
          Tickets: true,
        },
      });

      req.user = user;

      next();
    } else {
      res.status(401).json({
        success: false,
        message: 'Authentication token is missing or invalid',
      });
    }
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Invalid token. Authentication failed',
    });
  }
};
