import dotenv from 'dotenv';
import express from 'express';
import jwt from 'jsonwebtoken';

import prisma from './utils/prisma.js';
import { sendToken } from './utils/sendToken.js';
import { isAuthenticated } from './middleware/isAuthenticated.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 6000;

app.use(express.json({ limit: '100mb' }));

app.post('/login', async (req, res) => {
  try {
    const { signedToken } = req.body;
    const secretKey = process.env.JWT_SECRET_KEY;

    if (!signedToken) {
      return res.status(404).json({ message: 'Invalid signature token' });
    }

    const data = jwt.verify(signedToken, secretKey);

    if (data) {
      const isUserExist = await prisma.user.findUnique({
        where: { email: data.email },
      });

      if (isUserExist) {
        await sendToken(isUserExist, res);
      } else {
        const user = await prisma.user.create({
          data: {
            name: data.name,
            email: data.email,
            avatar: data.avatar,
          },
        });

        await sendToken(user, res);
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

app.get('/me', isAuthenticated, async (req, res) => {
  try {
    const { user } = req;

    res.status(201).json({ success: true, user });
  } catch (error) {
    console.error(error);
  }
});

app.get('/get-courses', async (req, res) => {
  try {
    const courses = await prisma.course.findMany({
      include: {
        courseData: {
          include: { links: true },
        },
        benefits: true,
        prerequisites: true,
      },
    });

    res.status(201).json({ success: true, courses });
  } catch (error) {
    console.log(error);

    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/get-reviews/:courseId', async (req, res) => {
  const reviewsData = await prisma.reviews.findMany({
    where: { courseId: req.params.courseId },
    include: { user: true, replies: { include: { user: true } } },
    orderBy: { createdAt: 'desc' },
  });

  res.status(201).json({ success: true, reviewsData });
});

app.listen(port, () => {
  console.log('Server is running on port ' + port);
});

export default app;
