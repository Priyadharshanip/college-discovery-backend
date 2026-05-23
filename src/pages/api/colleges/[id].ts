import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const { id } = req.query;

    if (typeof id !== 'string') {
      return res.status(400).json({ success: false, error: 'Invalid ID' });
    }

    const college = await prisma.college.findUnique({
      where: { id },
      include: {
        courses: {
          select: { id: true, name: true, duration: true, fees: true }
        },
        placements: {
          select: { id: true, avgPackage: true, topRecruiters: true }
        },
        reviews: {
          select: { id: true, rating: true, comment: true, authorName: true, createdAt: true },
          orderBy: { createdAt: 'desc' }
        }
      }
    });

    if (!college) {
      return res.status(404).json({ success: false, error: 'College not found' });
    }

    return res.status(200).json({ success: true, data: college });
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Internal server error' });
  }
}
