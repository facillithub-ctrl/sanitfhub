import 'server-only';
import { prisma } from '@/lib/prisma/client';
import { CreateUpdateDTO, UpdateItem } from './types';
import { ContentType } from '@prisma/client';

export const UpdatesService = {
  async listAll(): Promise<UpdateItem[]> {
    return prisma.contentItem.findMany({
      where: { type: ContentType.UPDATE },
      orderBy: { createdAt: 'desc' },
    });
  },

  async getBySlug(slug: string): Promise<UpdateItem | null> {
    return prisma.contentItem.findUnique({
      where: { slug },
    });
  },

  async create(data: CreateUpdateDTO): Promise<UpdateItem> {
    const existing = await prisma.contentItem.findUnique({
      where: { slug: data.slug },
    });

    if (existing) {
      throw new Error(`O slug "${data.slug}" já está em uso.`);
    }

    return prisma.contentItem.create({
      data: {
        ...data,
        type: ContentType.UPDATE,
        publishedAt: data.status === 'PUBLISHED' ? new Date() : null,
      },
    });
  },
};