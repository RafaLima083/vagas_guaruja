# Vagas Guarujá — Handoff para Claude Code

Pacote de handoff para construir o produto **Vagas Guarujá** (plataforma de vagas de emprego do litoral) em código de produção, usando este design system como referência visual + a especificação técnica deste documento.

---

## Sobre os arquivos deste pacote

Os arquivos HTML em `ui_kits/` são **referências de design** — protótipos em HTML/CSS/React+Babel inline mostrando como o produto deve **parecer e se comportar**. Eles **não são código de produção** e **não devem ser copiados como estão**.

Sua tarefa é **recriar esses designs no ambiente do codebase alvo** (React, Next.js, Vue, etc.), usando os tokens de design (`colors_and_type.css`) e a especificação técnica deste documento.

## Fidelidade

**Alta fidelidade (hi-fi).** As cores, tipografia, espaçamentos e interações são finais. Recrie pixel-perfect usando a stack escolhida. Use exatamente:
- Cores do `colors_and_type.css` (CSS vars `--vg-*`)
- Fontes Bricolage Grotesque + Plus Jakarta Sans (Google Fonts)
- Raios: 12px default, 16px hero, 999px pill
- Sombras conforme definidas

## Stack recomendada (sugestão — adapte conforme preferir)

| Camada | Tecnologia sugerida | Por quê |
|---|---|---|
| **Frontend web (landing + painel empresa)** | Next.js 14 (App Router) + Tailwind CSS | SSR para SEO da landing, ótimo DX |
| **App candidato** | React Native (Expo) | Compartilha lógica com web, deploy Play/App Store |
| **Backend** | Node.js + Fastify ou NestJS | Stack JS uniforme; alternativa: Django/Rails |
| **Banco** | PostgreSQL (Supabase ou Neon) | Relacional, robusto, com Row Level Security |
| **Auth** | Supabase Auth ou Clerk | Confirmação por email pronta |
| **Email transacional** | Resend ou AWS SES | Templates em React Email |
| **Pagamentos** | Mercado Pago Checkout Pro (Brasil) | Pix/boleto/cartão BR nativos |
| **Storage** | Supabase Storage ou S3 | Currículos PDF, fotos |
| **Hospedagem** | Vercel (web) + Railway/Fly (backend) | Deploy contínuo |
| **Domínio** | Registro.br | vagasguaruja.com.br |

---

## Estrutura sugerida do monorepo

```
vagasguaruja/
├── apps/
│   ├── web/              ← Next.js: landing + painel empresa
│   ├── mobile/           ← Expo React Native: app candidato
│   └── api/              ← Node.js: backend REST/GraphQL
├── packages/
│   ├── ui/               ← componentes compartilhados (recriados deste handoff)
│   ├── design-tokens/    ← cores/type derivados de colors_and_type.css
│   └── types/            ← tipos TS compartilhados (Vaga, Candidato, etc.)
├── design_handoff/       ← este pacote
└── docs/
```

---

## Telas / Views (resumo — ver `ui_kits/*/index.html` para detalhe)

### Landing (`ui_kits/landing/index.html`)
Marketing single-page. Seções: Hero, Stats, Para Candidatos, Para Empresas, Como Funciona, Pricing, FAQ, CTA, Footer. SSR no Next.js para SEO. Form de captura de email para alertas.

### Painel da Empresa (`ui_kits/company_web/index.html`)
Web app autenticado. Telas:
- **Dashboard** — métricas + atividade recente + vagas em destaque
- **Vagas** — lista filtrada com status (Ativa/Pausada/Preenchida/Expirada)
- **Kanban de candidatos** (por vaga) — 4 colunas: Novos, Em análise, Selecionados, Rejeitados. Drag-and-drop entre colunas → muda status na API.
- **Nova vaga** — wizard 4 passos (Cargo → Detalhes → Requisitos → Revisar). Consome 1 crédito ao publicar.
- **Créditos** — saldo, pacotes (5/10/30), histórico, checkout Mercado Pago

### App do Candidato (`ui_kits/candidate_app/index.html` — referência em iOS frame)
App mobile autenticado. Telas:
- **Welcome** — onboarding e login/cadastro
- **Feed** — busca e filtros por categoria
- **Detalhe da vaga** — descrição completa + CTA candidatar
- **Formulário de candidatura + LGPD** — 2 checkboxes obrigatórios (Termos + Compartilhamento)
- **Sucesso** — confirmação após enviar
- **Tabs: Buscar / Salvas / Inscrições / Perfil**

---

## Próximos passos para o dev

1. Leia `BACKEND_SPEC.md` (especificação completa: schema, endpoints, integrações)
2. Leia `README.md` raiz do projeto (Content Fundamentals, Visual Foundations, Iconography)
3. Abra cada `ui_kits/*/index.html` no navegador para entender as interações
4. Copie `colors_and_type.css` e converta as CSS vars para o sistema de tokens do framework escolhido (ex: `tailwind.config.ts` com `theme.extend.colors`)
5. Baixe os ícones do [Lucide](https://lucide.dev) ou use `lucide-react` no NPM
6. Configure Mercado Pago em modo sandbox antes do produção (ver BACKEND_SPEC)
7. Antes de coletar dados de usuários, redija Termos de Uso e Política de Privacidade com advogado (LGPD)

---

## Design Tokens (resumo — fonte completa: `colors_and_type.css`)

```css
/* Brand */
--vg-green-500: #00A86B;  /* primary */
--vg-green-800: #0A4D3C;  /* deep */
--vg-coral-500: #FF6B35;  /* accent */

/* Surfaces */
--vg-bg: #FAFAF7;
--vg-surface: #FFFFFF;
--vg-border: #E5E8E2;

/* Text */
--vg-fg-1: #1E211C;  /* primary */
--vg-fg-2: #4B514A;  /* secondary */
--vg-fg-3: #6B7268;  /* meta */

/* Type */
--vg-font-display: 'Bricolage Grotesque';
--vg-font-body: 'Plus Jakarta Sans';

/* Radii */
--vg-radius-md: 12px;
--vg-radius-pill: 999px;
```

## Arquivos neste handoff

```
design_handoff/
├── README.md            ← este arquivo
├── BACKEND_SPEC.md      ← especificação do backend
├── DESIGN_RULES.md      ← copy do README.md raiz (Content + Visual Foundations)
├── SKILL.md             ← descritor para o Claude Code se quiser usar como Agent Skill
├── colors_and_type.css  ← TOKENS — copie para o projeto
├── assets/              ← logos SVG
└── ui_kits/             ← protótipos HTML (referência visual)
```
