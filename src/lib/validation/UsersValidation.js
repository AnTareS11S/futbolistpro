import * as z from 'zod';
export const usersFormSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: 'Name must be at least 4 characters.',
    })
    .max(30, {
      message: 'Name must not be longer than 30 characters.',
    }),
  surname: z
    .string()
    .min(1, {
      message: 'Surname must be at least 4 characters.',
    })
    .max(30, {
      message: 'Surname must not be longer than 30 characters.',
    }),
  birthDate: z.string().min(1, {
    message: 'Birth Date is required',
  }),
  nationality: z.string().min(1, {
    message: 'Nationality is required',
  }),
  city: z.string().min(1, {
    message: 'City is required',
  }),
  photo: z.string().optional(),
  bio: z.string().min(1, {
    message: 'Bio is required',
  }),
});
