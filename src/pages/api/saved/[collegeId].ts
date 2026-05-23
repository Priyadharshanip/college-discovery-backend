import { NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';
import { withAuth, AuthenticatedRequest } from '../../../middleware/withAuth';

async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
  const { collegeId } = req.query;
  const userId = req.user?.id;

  if (!userId) return res.status(401).json({ success: false, error: 'Unauthorized' });

  if (typeof collegeId !== 'string') {
    return res.status(400).json({ success: false, error: 'Invalid College ID' });
  }

  if (req.method === 'POST') {
    try {
      const collegeExists = await prisma.college.findUnique({ where: { id: collegeId } });
      if (!collegeExists) {
        return res.status(404).json({ success: false, error: 'College not found' });
      }

      const saved = await prisma.savedCollege.create({
        data: { userId, collegeId }
      });
      return res.status(201).json({ success: true, data: saved });
    } catch (error: any) {
      if (error.code === 'P2002') {
        return res.status(409).json({ success: false, error: 'College already saved' });
      }
      return res.status(500).json({ success: false, error: 'Internal server error' });
    }
  } else if (req.method === 'DELETE') {
    try {
      await prisma.savedCollege.delete({
        where: {
          userId_collegeId: { userId, collegeId }
        }
      });
      return res.status(200).json({ success: true, data: { message: 'College unsaved successfully' } });
    } catch (error: any) {
      if (error.code === 'P2025') {
        return res.status(404).json({ success: false, error: 'Saved college not found' });
      }
      return res.status(500).json({ success: false, error: 'Internal server error' });
    }
  } else {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }
}

export default withAuth(handler);
