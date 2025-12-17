'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { updateSchema } from './validators';
import { UpdatesService } from './services';

type ActionState = {
  errors?: { [key: string]: string[] };
  message?: string;
};

export async function createUpdateAction(prevState: ActionState, formData: FormData): Promise<ActionState> {
  const rawData = {
    title: formData.get('title'),
    slug: formData.get('slug'),
    excerpt: formData.get('excerpt'),
    body: formData.get('body'),
    coverImage: formData.get('coverImage'),
    status: formData.get('status'),
    tags: formData.get('tags'),
  };

  const validatedFields = updateSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Erro na validação. Verifique os campos.',
    };
  }

  // TODO: Pegar ID do usuário logado via Auth.js
  const authorId = "admin-temp-id"; 

  try {
    await UpdatesService.create({
      ...validatedFields.data,
      authorId,
    });

    revalidatePath('/updates');
  } catch (error: any) {
    return {
      message: error.message || 'Erro ao criar update.',
    };
  }

  redirect('/updates');
}