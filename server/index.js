import dotenv from 'dotenv';
import express from 'express';
import jwt from 'jsonwebtoken';

import prisma from './utils/prisma.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 6000;

app.use(express.json({ limit: '100mb' }));

app.post('/login', async (req, res) => {
  try {
    const { signedToken } = req.body;
    const data = jwt.verify(signedToken, process.env.JWT_SECRET_KEY);
    if (data) {
      const isUserExist = await prisma.user.findUnique({
        where: {
          email: data.email,
        },
      });

      if (isUserExist) {
        // await sendToken(isUserExist, res);
      } else {
        const user = await prisma.user.create({
          data: {
            name: data.name,
            email: data.email,
            avatar: data.avatar,
          },
        });

        // await sendToken(user, res);
      }
    } else {
      res
        .status(404)
        .json({ success: false, message: 'Your request is not authorized!' });
    }
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log('Server is running on port ' + port);
});

export default app;
