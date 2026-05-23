import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';
import { querySchema } from '../../../lib/validate';
import { Prisma } from '@prisma/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const query = querySchema.parse(req.query);
    const { page = 1, limit = 10, search, location, minFees, maxFees, minRating } = query;

    const where: Prisma.CollegeWhereInput = {};

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { location: { contains: search, mode: 'insensitive' } }
      ];
    }

    if (location) {
      where.location = { contains: location, mode: 'insensitive' };
    }

    if (minFees !== undefined || maxFees !== undefined) {
      where.fees = {};
      if (minFees !== undefined) where.fees.gte = minFees;
      if (maxFees !== undefined) where.fees.lte = maxFees;
    }

    if (minRating !== undefined) {
      where.rating = { gte: minRating };
    }

    const skip = (page - 1) * limit;

    const [total, colleges] = await prisma.$transaction([
      prisma.college.count({ where }),
      prisma.college.findMany({
        where,
        skip,
        take: limit,
        select: {
          id: true,
          name: true,
          location: true,
          fees: true,
          rating: true,
          _count: {
            select: { courses: true }
          }
        },
        orderBy: { rating: 'desc' }
      })
    ]);

    const formattedColleges = colleges.map(c => ({
      id: c.id,
      name: c.name,
      location: c.location,
      fees: c.fees,
      rating: c.rating,
      courseCount: c._count.courses
    }));

    return res.status(200).json({
      success: true,
      data: formattedColleges,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    });

  } catch (error: any) {
    if (error.name === 'ZodError') {
      return res.status(400).json({ success: false, error: error.errors[0].message });
    }
    return res.status(500).json({ success: false, error: 'Internal server error' });
  }
}
