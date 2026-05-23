import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const querySchema = z.object({
  page: z.string().optional().transform(v => (v ? parseInt(v) : 1)),
  limit: z.string().optional().transform(v => (v ? parseInt(v) : 10)),
  search: z.string().optional(),
  location: z.string().optional(),
  minFees: z.string().optional().transform(v => (v ? parseInt(v) : undefined)),
  maxFees: z.string().optional().transform(v => (v ? parseInt(v) : undefined)),
  minRating: z.string().optional().transform(v => (v ? parseFloat(v) : undefined)),
});
