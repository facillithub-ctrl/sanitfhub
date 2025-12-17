import { ContentItem } from '@prisma/client';

export type UpdateItem = ContentItem;

export type CreateUpdateDTO = {
  title: string;
  slug: string;
  excerpt?: string | null;
  body: string;
  coverImage?: string | null;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  tags: string[];
  authorId: string;
};