import { z } from 'zod';
import { PublicationStatus } from '@prisma/client';

export const updateSchema = z.object({
  title: z.string().min(5, "O título deve ter pelo menos 5 caracteres").max(100),
  slug: z.string().min(3).regex(/^[a-z0-9-]+$/, "Slug deve conter apenas letras minúsculas, números e hífens"),
  excerpt: z.string().max(300, "O resumo deve ser breve (máx 300 caracteres)").optional(),
  body: z.string().min(20, "O conteúdo é muito curto"),
  coverImage: z.string().url("URL de imagem inválida").optional().or(z.literal('')),
  status: z.nativeEnum(PublicationStatus),
  tags: z.string().transform((str) => str.split(',').map((s) => s.trim()).filter((s) => s !== '')),
});

export type UpdateFormData = z.infer<typeof updateSchema>;