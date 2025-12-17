const fs = require('fs');
const path = require('path');

// Estrutura de pastas baseada no padrão DDD/Modular
const directories = [
  'src/lib/prisma',
  'src/domains/cms/updates/components',
  'src/app/(admin)/updates/new',
];

// Arquivos vazios para serem criados
const files = [
  // Prisma
  'src/lib/prisma/schema.prisma',
  'src/lib/prisma/client.ts',
  
  // Domain: Updates (Logic)
  'src/domains/cms/updates/actions.ts',
  'src/domains/cms/updates/services.ts',
  'src/domains/cms/updates/validators.ts',
  'src/domains/cms/updates/types.ts',
  'src/domains/cms/updates/index.ts',
  
  // Domain: Updates (Components)
  'src/domains/cms/updates/components/update-form.tsx',
  'src/domains/cms/updates/components/update-list.tsx',
  
  // App Router (Pages)
  'src/app/(admin)/updates/page.tsx',
  'src/app/(admin)/updates/new/page.tsx',
  'src/app/(admin)/layout.tsx',
];

console.log('🏗️  Iniciando a construção da arquitetura SANIT...');

// 1. Criar Pastas
directories.forEach(dir => {
  const fullPath = path.join(process.cwd(), dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
    console.log(`✅ Pasta criada: ${dir}`);
  }
});

// 2. Criar Arquivos (apenas se não existirem)
files.forEach(file => {
  const fullPath = path.join(process.cwd(), file);
  if (!fs.existsSync(fullPath)) {
    fs.writeFileSync(fullPath, '// Aguardando implementação...\n');
    console.log(`📄 Arquivo criado: ${file}`);
  } else {
    console.log(`⚠️  Arquivo já existe: ${file}`);
  }
});

console.log('\n🚀 Arquitetura pronta! Agora você pode colar os códigos.');
console.log('👉 Lembre-se de configurar o .env com a DATABASE_URL.');