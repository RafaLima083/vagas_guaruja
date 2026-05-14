# Vagas Guarujá — Design System

Design system para **Vagas Guarujá**, um aplicativo de vagas de emprego local para a região do Guarujá (litoral de São Paulo). Empresas compram créditos para publicar vagas; candidatos se inscrevem; comunicação por email + push. Integração de pagamento via Mercado Pago. Compliance com LGPD.

> **Status:** v0.1 — fundações + 3 UI kits. Sem codebase prévio, sem brand assets fornecidos. Tudo neste design system foi criado do zero a partir do briefing.

---

## Sobre o produto

**Vagas Guarujá** é uma plataforma local de empregos com três superfícies:

| Superfície | Para quem | O que faz |
|---|---|---|
| **App mobile (candidato)** | Pessoas em busca de emprego | Buscar vagas, salvar, candidatar-se, acompanhar status |
| **Painel web (empresa)** | RH e gestores das empresas | Comprar créditos, publicar vagas, gerenciar candidatos |
| **Landing page (marketing)** | Visitantes / SEO | Apresentar a plataforma, conversão |

### Funcionalidades-chave

- **Cadastro de vaga:** cargo, faixa salarial, cidade/bairro (Guarujá e arredores), modalidade (presencial / remoto / híbrido), tipo de contrato (CLT / PJ / Estágio / Temporário / Freela), nível de escolaridade, requisitos, benefícios, vagas afirmativas (PCD, mulheres, LGBTQIA+, 50+), idiomas
- **Cadastro de candidato:** nome completo, endereço, idade, escolaridade — quando superior, curso + status (concluído / trancado / em progresso), experiência, idiomas
- **Validação de email** antes de candidatar
- **LGPD:** consentimento explícito + central de privacidade
- **Créditos:** compra via API Mercado Pago, pacotes de créditos consomem ao publicar
- **Notificações:** empresa recebe email a cada nova candidatura; candidatos recebem email/push quando vaga é preenchida ou status muda (visualizada / em análise / rejeitada / aprovada)
- **Extras incluídos no design:** salvamento de vagas, alertas, perfil público do candidato, currículo PDF, chat empresa↔candidato, dashboard de candidatos por vaga

### Fontes / contexto fornecido

| Fonte | Acessada? | Notas |
|---|---|---|
| Codebase | — | Nenhum fornecido |
| Figma | — | Nenhum fornecido |
| Logo / brand | — | Nenhum fornecido — criamos um wordmark+mark placeholder |
| Briefing | ✅ | Texto colado em PT-BR + respostas do formulário inicial |

---

## Content Fundamentals

**Idioma:** Português brasileiro. Sempre. Sem mistura com inglês exceto termos técnicos universais (email, link, app, login).

**Tom:** Moderno e direto, inspirado em Gupy/Revelo, mas com calor humano local. Falamos com o leitor (tu/você → **você** sempre). Evitamos jargão de RH ("colaborador", "talento estratégico"). Preferimos palavras concretas: "vaga", "empresa", "trabalho".

**Casing:**
- Botões e CTAs: **Frase capitalizada** ("Publicar vaga", "Enviar candidatura"), não Title Case ("Publicar Vaga")
- Títulos de página: **Frase** ("Suas candidaturas")
- Etiquetas/meta em UPPERCASE só para labels muito pequenos com tracking (ex: "NOVO", "DESTAQUE")

**Pessoa gramatical:**
- Para candidatos: **você** ("Encontre sua próxima vaga", "Seu currículo")
- Para empresas: **vocês** quando coletivo, **sua empresa** quando direto ("Sua empresa publica em 2 minutos")

**Emojis:** Não usar em UI. Aceitável em notificações push muito ocasionais (1 emoji por mensagem máximo, ex: "✅ Sua candidatura foi enviada"). Nunca em headings, botões ou estados de erro.

**Exemplos reais (use isto como referência):**

| Bom ✅ | Ruim ❌ |
|---|---|
| "Publique sua vaga em 2 minutos" | "Anuncie suas oportunidades de carreira de forma ágil" |
| "Você foi selecionado para a próxima etapa" | "Parabéns! Sua jornada conosco avança 🎉" |
| "Não encontramos vagas com esses filtros. Tente ampliar a busca." | "Ops! Nenhum resultado encontrado." |
| "Aceito os Termos e a Política de Privacidade" | "Li e concordo com todos os termos legais aplicáveis..." |
| "Faltam 3 créditos para publicar" | "Saldo insuficiente. Por favor, adquira mais créditos." |
| "Vaga preenchida — obrigado pela candidatura" | "Esta posição não está mais disponível no momento." |

**Microcopy de erro:** sempre diz o quê + como resolver. "Email inválido. Use o formato nome@exemplo.com" — não apenas "Email inválido".

**Números & datas:** padrão BR. R$ 2.500,00. "Publicada há 2 dias". "Salário a combinar" quando empresa não revela.

**LGPD / consentimento:** sempre transparente, em primeira pessoa: "Usamos seus dados para conectar você a empresas. Você pode revogar a qualquer momento." Sem juridiquês.

---

## Visual Foundations

### Paleta

**Verde** é a cor primária — significa oportunidade, crescimento e a paisagem natural do Guarujá. **Coral** é o acento quente, usado com extrema parcimônia (vagas em destaque, badges premium, CTAs muito especiais — nunca em mais de um lugar por tela).

- `--vg-green-500: #00A86B` — primary. CTAs principais, brand mark
- `--vg-green-800: #0A4D3C` — wordmark, headings em fundos especiais
- `--vg-coral-500: #FF6B35` — acento; uso restrito
- `--vg-ink-*` — escala neutra com leve viés olive/morno (NÃO use grays frios puros)
- `--vg-bg: #FAFAF7` — off-white morno; nunca usamos branco puro como fundo de página

### Tipografia

- **Display:** Bricolage Grotesque (variável; 12–96pt opsz). Para headlines, hero, números grandes. Tracking apertado em tamanhos grandes (-0.02em).
- **Body / UI:** Plus Jakarta Sans. Leitura, formulários, botões.
- **Mono:** JetBrains Mono. Só em códigos/IDs/dados técnicos.

> ⚠️ **Substituição:** ambas são fontes do Google Fonts — não há TTFs locais. Se o cliente quiser fontes próprias no futuro, substitua os `@import`s em `colors_and_type.css`.

### Espaçamento

Escala 4px. Tokens `--vg-space-1` (4px) até `--vg-space-24` (96px). Componentes seguem **8/12/16/24** majoritariamente. Densidade média — não tão apertado quanto produtividade-tools, não tão arejado quanto landing pages premium.

### Cantos

- Inputs e cards: **12px** (`--vg-radius-md`)
- Painéis grandes, hero: **16px** (`--vg-radius-lg`)
- Botões: **12px** padrão; **pill (999px)** para chips/filtros/badges
- Avatares e logos de empresa: círculo completo (ou quadrado 8px se for marca)

### Sombras

Sombras **muito sutis**, levemente quentes (não cinza puro — base `rgba(15,17,16,...)`). Cards em repouso usam `--vg-shadow-sm`. Hover sobe para `--vg-shadow-md`. Modais e popovers usam `--vg-shadow-lg`. **Nunca** sombras pesadas tipo Material Elevation 24.

### Bordas

- Padrão: `1px solid var(--vg-border)` (#E5E8E2) — sutil, separa sem gritar
- Cards: bordas + sombra-sm (não dependa só de sombra)
- Inputs: borda de 1.5px em foco, na cor `--vg-green-500`

### Fundos

- **Página:** off-white morno `#FAFAF7`
- **Seções alternadas (landing):** `--vg-bg-alt` (#F2F3EF) — cinza-verde muito leve
- **Hero/destaque:** verde profundo (`--vg-green-800`) com texto branco, OU off-white com um único elemento gráfico
- **Padrões:** não usamos gradientes coloridos (anti-slop). Aceito: gradient de verde-500 → verde-700 em CTAs hero. Aceito: blob orgânico em SVG como decoração leve atrás de hero, opacidade 8-15%.
- **Imagens:** preferimos fotos com luz natural, tons quentes (sol do litoral). Não usamos B&W ou filtros saturados de mais. Sempre com leve overlay verde para coesão (opcional).

### Animação

- Easing padrão: `cubic-bezier(0.22, 1, 0.36, 1)` (ease-out suave)
- Durações: 120ms (micro), 200ms (padrão), 320ms (transições de página)
- **Hover:** translate-y(-1px) + sombra md, em 200ms
- **Press:** scale(0.98), 100ms
- **Loading:** skeleton com shimmer suave, NÃO spinners exceto onde indispensável
- Sem bounces gratuitos. Spring (`--vg-ease-spring`) só em entrada de toasts e modais móveis.

### Estados de interação

| Estado | Tratamento |
|---|---|
| Hover (botão primário) | bg sobe para `--vg-green-600`, sombra cresce |
| Hover (link / ghost) | underline OU bg `--vg-green-50` |
| Active/press | `transform: scale(0.98)` |
| Focus | outline 2px `--vg-green-500` + offset 2px (visível!) |
| Disabled | opacity 0.5, cursor not-allowed, sem hover |
| Loading | conteúdo vira skeleton; botão mantém largura + spinner pequeno alinhado |

### Transparência e blur

- **Pouco uso.** Aceito em: top bar do app mobile durante scroll (backdrop-blur leve), modais (overlay rgba(15,17,16,0.4)), drawer.
- Glassmorphism não é nosso estilo. Cards são sólidos.

### Cards

- `background: var(--vg-surface)` (#FFF)
- `border: 1px solid var(--vg-border)`
- `border-radius: var(--vg-radius-md)` (12px)
- `box-shadow: var(--vg-shadow-sm)`
- Hover: `box-shadow: var(--vg-shadow-md)` + translate -1px
- Padding interno: 20–24px (varia)

### Layout

- Container max-width: **1200px** (web)
- Grid responsivo 12 colunas, gutter 24px
- Mobile: 16px gutter
- App nativo: safe-areas respeitadas, conteúdo 16px lateral

---

## Iconography

**Sistema:** [Lucide Icons](https://lucide.dev) via CDN. Stroke-based, 1.75px, cantos arredondados. Tamanho padrão UI: **20px**. Inline em listas: **16px**. Hero/feature: **28–32px**.

```html
<!-- CDN: ESM -->
<script type="module">
  import { createIcons, icons } from 'https://cdn.jsdelivr.net/npm/lucide@latest/+esm';
  createIcons({ icons });
</script>
<i data-lucide="briefcase"></i>
```

Por que Lucide: stroke neutro combina com Plus Jakarta Sans, biblioteca enorme (>1000 ícones), licença ISC, gratuita.

**Substituição flagged:** se no futuro for desejado um estilo mais "filled" (estilo iOS), considerar Heroicons solid OU criar um set custom. Por ora, **stroke-only**.

**Cores de ícone:**
- Padrão UI: `currentColor`, herdando do texto adjacente
- Em verde dentro de containers de status sucesso: `--vg-green-500`
- Em coral: somente em badges/highlights
- **Nunca** colorir um ícone só por enfeite

**Emoji:** ver Content Fundamentals — só em push, parcimônia total.

**Imagens / ilustrações:**
- Logos de empresa: círculo, fallback é monograma de 2 letras em `--vg-green-50` com texto `--vg-green-700`
- Hero illustrations: estilo simples geométrico, paleta da marca. **Não desenhar SVGs complexos** — usar placeholders ou solicitar arte real.
- Foto de candidato: opcional, círculo, mesmo fallback de monograma

---

## Index — manifesto do projeto

```
/
├── README.md                ← você está aqui
├── SKILL.md                 ← descritor pra Claude Code / Agent Skills
├── colors_and_type.css      ← TOKENS (cores, type, spacing, radii, shadows, motion)
├── assets/
│   ├── logo.svg             ← wordmark horizontal
│   ├── logo-mark.svg        ← mark quadrado (favicon, app icon)
│   └── logo-mark-dark.svg   ← variante p/ fundos escuros
├── preview/                 ← cards do Design System tab (1 HTML por card)
│   ├── colors-*.html
│   ├── type-*.html
│   ├── spacing-*.html
│   ├── components-*.html
│   └── brand-*.html
├── ui_kits/
│   ├── company_web/         ← Painel web da empresa
│   │   ├── index.html       ← protótipo interativo
│   │   ├── README.md
│   │   └── *.jsx
│   ├── candidate_app/       ← App mobile do candidato (iOS frame)
│   │   ├── index.html
│   │   ├── README.md
│   │   └── *.jsx
│   └── landing/             ← Landing page de marketing
│       ├── index.html
│       ├── README.md
│       └── *.jsx
```

### O que falta / próximos passos para você

Veja a seção **Caveats** no final desta resposta.
