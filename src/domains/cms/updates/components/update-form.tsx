'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { createUpdateAction } from '../actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? 'Publicando...' : 'Publicar Update'}
    </Button>
  );
}

export function UpdateForm() {
  const [state, formAction] = useFormState(createUpdateAction, { message: '', errors: {} });

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Novo Update / Changelog</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Título</Label>
              <Input id="title" name="title" placeholder="Ex: Versão 2.0 Lançada" required />
              {state.errors?.title && <p className="text-red-500 text-sm">{state.errors.title}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">Slug (URL)</Label>
              <Input id="slug" name="slug" placeholder="versao-2-0-lancada" required />
              {state.errors?.slug && <p className="text-red-500 text-sm">{state.errors.slug}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select name="status" defaultValue="DRAFT">
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="DRAFT">Rascunho</SelectItem>
                  <SelectItem value="PUBLISHED">Publicado</SelectItem>
                  <SelectItem value="ARCHIVED">Arquivado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">Tags (separadas por vírgula)</Label>
              <Input id="tags" name="tags" placeholder="feature, fix, security" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt">Resumo (SEO)</Label>
            <Textarea id="excerpt" name="excerpt" placeholder="Breve descrição do que mudou..." />
          </div>

          <div className="space-y-2">
            <Label htmlFor="body">Conteúdo (Markdown)</Label>
            <Textarea 
              id="body" 
              name="body" 
              className="min-h-[200px] font-mono text-sm" 
              placeholder="# Título\n\n- Mudança 1..." 
              required 
            />
            {state.errors?.body && <p className="text-red-500 text-sm">{state.errors.body}</p>}
          </div>

          {state.message && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
              {state.message}
            </div>
          )}

          <div className="pt-4">
            <SubmitButton />
          </div>
        </form>
      </CardContent>
    </Card>
  );
}