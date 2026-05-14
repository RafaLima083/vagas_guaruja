# Vagas Guarujá — Backend Specification

Especificação técnica completa para construir o backend e a integração com Mercado Pago. Pensada para um stack Node.js + PostgreSQL, mas adaptável.

---

## 1. Modelo de dados (PostgreSQL)

```sql
-- ============ USERS (base de candidatos + empresas) ============
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  email_verified_at TIMESTAMPTZ,
  password_hash TEXT NOT NULL,
  user_type TEXT NOT NULL CHECK (user_type IN ('candidate', 'company')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  lgpd_consent_at TIMESTAMPTZ,
  lgpd_share_consent_at TIMESTAMPTZ,
  deleted_at TIMESTAMPTZ                       -- soft delete (LGPD)
);

-- ============ CANDIDATES ============
CREATE TABLE candidates (
  user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  birth_date DATE,
  phone TEXT,
  cep TEXT,
  street TEXT,
  number TEXT,
  neighborhood TEXT,
  city TEXT,
  state TEXT,
  education_level TEXT,                        -- 'fundamental', 'medio_incompleto', 'medio', 'tecnico', 'superior_em_curso', 'superior_completo'
  course_name TEXT,                            -- se superior
  course_status TEXT CHECK (course_status IN ('concluido','trancado','em_progresso','cursando')),
  resume_pdf_url TEXT,                         -- Supabase Storage / S3
  avatar_url TEXT,
  public_profile BOOLEAN DEFAULT FALSE
);

-- ============ COMPANIES ============
CREATE TABLE companies (
  user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  legal_name TEXT NOT NULL,
  trade_name TEXT,
  cnpj TEXT UNIQUE NOT NULL,
  logo_url TEXT,
  city TEXT,
  description TEXT,
  credits_balance INTEGER DEFAULT 0 NOT NULL CHECK (credits_balance >= 0)
);

-- ============ JOBS ============
CREATE TABLE jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID REFERENCES companies(user_id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  city TEXT NOT NULL,
  neighborhood TEXT,
  modality TEXT CHECK (modality IN ('presencial','hibrido','remoto')),
  contract_type TEXT CHECK (contract_type IN ('clt','pj','estagio','temporario','freela')),
  salary_min NUMERIC(10,2),
  salary_max NUMERIC(10,2),
  salary_undisclosed BOOLEAN DEFAULT FALSE,
  workload TEXT,                               -- '44h semanais', etc.
  education_required TEXT,
  experience_required TEXT,
  languages TEXT[],                            -- ['Inglês intermediário', 'Espanhol']
  benefits TEXT[],                             -- ['VR', 'VT', 'Plano de saúde']
  affirmative TEXT[],                          -- ['PCD', 'Mulheres', 'LGBTQIA+', '50+', 'Pretos e pardos']
  highlight BOOLEAN DEFAULT FALSE,
  status TEXT DEFAULT 'active' CHECK (status IN ('active','paused','filled','expired')),
  views_count INTEGER DEFAULT 0,
  published_at TIMESTAMPTZ DEFAULT now(),
  expires_at TIMESTAMPTZ NOT NULL,             -- now() + 30 days ao publicar
  filled_at TIMESTAMPTZ
);

CREATE INDEX idx_jobs_active_city ON jobs(city, status) WHERE status = 'active';
CREATE INDEX idx_jobs_company ON jobs(company_id);

-- ============ APPLICATIONS ============
CREATE TABLE applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID REFERENCES jobs(id) ON DELETE CASCADE,
  candidate_id UUID REFERENCES candidates(user_id) ON DELETE CASCADE,
  message TEXT,
  status TEXT DEFAULT 'em_analise' CHECK (status IN ('em_analise','visualizada','selecionado','rejeitado')),
  created_at TIMESTAMPTZ DEFAULT now(),
  viewed_at TIMESTAMPTZ,
  status_updated_at TIMESTAMPTZ,
  UNIQUE (job_id, candidate_id)
);

CREATE INDEX idx_apps_candidate ON applications(candidate_id, created_at DESC);
CREATE INDEX idx_apps_job_status ON applications(job_id, status);

-- ============ SAVED JOBS ============
CREATE TABLE saved_jobs (
  candidate_id UUID REFERENCES candidates(user_id) ON DELETE CASCADE,
  job_id UUID REFERENCES jobs(id) ON DELETE CASCADE,
  saved_at TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (candidate_id, job_id)
);

-- ============ CREDIT TRANSACTIONS ============
CREATE TABLE credit_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID REFERENCES companies(user_id),
  type TEXT CHECK (type IN ('purchase','usage','refund','admin_adjust')),
  amount INTEGER NOT NULL,                     -- positivo p/ compra, negativo p/ uso
  balance_after INTEGER NOT NULL,
  reference TEXT,                              -- job_id ou mp_payment_id
  mp_payment_id TEXT,                          -- ID do Mercado Pago
  mp_status TEXT,                              -- 'approved','pending','rejected'
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============ JOB ALERTS (alertas por email) ============
CREATE TABLE job_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  candidate_id UUID REFERENCES candidates(user_id) ON DELETE CASCADE,
  keywords TEXT[],
  cities TEXT[],
  contract_types TEXT[],
  modalities TEXT[],
  active BOOLEAN DEFAULT TRUE,
  last_sent_at TIMESTAMPTZ
);
```

---

## 2. Endpoints (REST sugerido)

### Auth
| Método | Rota | Descrição |
|---|---|---|
| POST | `/auth/signup/candidate` | Cadastro candidato. Envia email de verificação. |
| POST | `/auth/signup/company` | Cadastro empresa (com CNPJ). Envia email de verificação. |
| POST | `/auth/login` | Login (retorna JWT). Bloqueia se email não verificado. |
| GET | `/auth/verify-email?token=...` | Confirma email. |
| POST | `/auth/forgot` | Solicita reset. |
| POST | `/auth/reset` | Define nova senha. |
| POST | `/auth/logout` | Invalida token. |

### Candidatos
| Método | Rota | Descrição |
|---|---|---|
| GET | `/me` | Perfil do candidato logado |
| PATCH | `/me` | Atualiza dados |
| POST | `/me/resume` | Upload de currículo PDF |
| DELETE | `/me` | Soft-delete (LGPD direito ao esquecimento) |
| GET | `/me/export` | Exporta dados em JSON (LGPD portabilidade) |

### Vagas (público + autenticado)
| Método | Rota | Descrição |
|---|---|---|
| GET | `/jobs` | Lista vagas ativas. Query: `q`, `city`, `neighborhood`, `modality`, `contract`, `category`, `page`, `limit` |
| GET | `/jobs/:id` | Detalhe (incrementa `views_count`) |
| POST | `/jobs/:id/apply` | Candidatar-se (auth). Cria application, dispara email à empresa. |
| POST | `/jobs/:id/save` | Salvar |
| DELETE | `/jobs/:id/save` | Remover salvo |
| GET | `/me/applications` | Minhas candidaturas |
| GET | `/me/saved` | Minhas salvas |

### Empresa
| Método | Rota | Descrição |
|---|---|---|
| GET | `/company/me` | Dados da empresa |
| PATCH | `/company/me` | Atualiza |
| GET | `/company/jobs` | Vagas da empresa (todas, qualquer status) |
| POST | `/company/jobs` | Cria vaga — **consome 1 crédito** (transação atômica). Falha 402 se saldo=0. |
| PATCH | `/company/jobs/:id` | Edita (não consome crédito) |
| POST | `/company/jobs/:id/pause` | Pausa |
| POST | `/company/jobs/:id/fill` | Marca preenchida → dispara email a TODOS os candidatos não-aprovados |
| GET | `/company/jobs/:id/applications` | Candidatos por vaga |
| PATCH | `/company/applications/:id` | Muda status (em_analise → visualizada → selecionado/rejeitado) |
| GET | `/company/credits/history` | Extrato de créditos |

### Pagamentos (Mercado Pago)
| Método | Rota | Descrição |
|---|---|---|
| POST | `/payments/credits/checkout` | Body: `{pack: 5\|10\|30}`. Cria preferência MP, retorna URL para Checkout Pro. |
| POST | `/webhooks/mercadopago` | Webhook MP. Valida assinatura, processa pagamento, credita conta. |

---

## 3. Integração Mercado Pago

### Setup
1. Criar conta em [mercadopago.com.br/developers](https://www.mercadopago.com.br/developers)
2. Criar aplicação → pegar `ACCESS_TOKEN` (sandbox e produção)
3. Configurar `WEBHOOK_URL` para o endpoint `/webhooks/mercadopago`

### Pacotes (preços iniciais — confirmar com o cliente)
```js
const PACKS = {
  5:  { credits: 5,  price_brl: 59.00,  name: 'Pacote 5 créditos' },
  10: { credits: 10, price_brl: 99.00,  name: 'Pacote 10 créditos' },
  30: { credits: 30, price_brl: 249.00, name: 'Pacote 30 créditos' },
};
```

### Criar preferência (Checkout Pro)
```js
import { MercadoPagoConfig, Preference } from 'mercadopago';

const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN });
const pref = await new Preference(client).create({
  body: {
    items: [{
      id: `pack-${pack}`,
      title: PACKS[pack].name,
      quantity: 1,
      unit_price: PACKS[pack].price_brl,
      currency_id: 'BRL',
    }],
    payer: { email: company.email },
    metadata: { company_id: company.id, pack: pack },
    notification_url: `${BASE_URL}/webhooks/mercadopago`,
    external_reference: `credit-purchase-${uuid()}`,
    back_urls: {
      success: `${APP_URL}/painel/creditos?status=ok`,
      failure: `${APP_URL}/painel/creditos?status=fail`,
      pending: `${APP_URL}/painel/creditos?status=pending`,
    },
    auto_return: 'approved',
  },
});
return pref.init_point;  // URL para redirecionar o usuário
```

### Processar webhook
```js
// POST /webhooks/mercadopago
async function handleWebhook(req, res) {
  // 1. Validar assinatura (header x-signature)
  if (!validateMPSignature(req)) return res.status(401).end();

  const { type, data } = req.body;
  if (type !== 'payment') return res.status(200).end();

  // 2. Buscar pagamento na API do MP (NUNCA confiar só no body)
  const payment = await mpClient.payment.get({ id: data.id });

  if (payment.status === 'approved') {
    const { company_id, pack } = payment.metadata;
    const credits = PACKS[pack].credits;

    // 3. Transação atômica: idempotência via mp_payment_id UNIQUE
    await db.transaction(async (tx) => {
      const exists = await tx.creditTransactions.findUnique({ where: { mp_payment_id: String(payment.id) } });
      if (exists) return;                              // já processado

      await tx.companies.update({
        where: { user_id: company_id },
        data: { credits_balance: { increment: credits } },
      });

      const company = await tx.companies.findUnique({ where: { user_id: company_id } });
      await tx.creditTransactions.create({
        data: {
          company_id,
          type: 'purchase',
          amount: credits,
          balance_after: company.credits_balance,
          mp_payment_id: String(payment.id),
          mp_status: 'approved',
        },
      });

      // 4. Email de confirmação
      await sendEmail({
        to: company.email,
        template: 'credits-purchased',
        data: { credits, balance: company.credits_balance },
      });
    });
  }

  return res.status(200).end();
}
```

### Consumir crédito ao publicar vaga
```js
// POST /company/jobs (handler)
await db.transaction(async (tx) => {
  const company = await tx.companies.findUnique({
    where: { user_id: req.user.id },
    select: { credits_balance: true },
  });
  if (company.credits_balance < 1) throw new HttpError(402, 'Saldo insuficiente');

  await tx.companies.update({
    where: { user_id: req.user.id },
    data: { credits_balance: { decrement: 1 } },
  });

  const job = await tx.jobs.create({
    data: { ...req.body, company_id: req.user.id, expires_at: addDays(new Date(), 30) },
  });

  await tx.creditTransactions.create({
    data: {
      company_id: req.user.id,
      type: 'usage',
      amount: -1,
      balance_after: company.credits_balance - 1,
      reference: job.id,
    },
  });
  return job;
});
```

---

## 4. Emails transacionais

| Evento | Para | Template |
|---|---|---|
| Cadastro | Usuário | `verify-email` — link com token |
| Reset senha | Usuário | `reset-password` |
| Nova candidatura | Empresa | `new-application` — dados básicos + link p/ painel |
| Mudança de status | Candidato | `application-status-changed` |
| Vaga preenchida | Todos candidatos não-aprovados | `job-filled` — agradecimento |
| Crédito comprado | Empresa | `credits-purchased` |
| Vaga expirando | Empresa | `job-expiring` — 3 dias antes |
| Alerta de nova vaga | Candidato | `job-alert` — diário, com vagas compatíveis |

**Tom dos emails:** ver `DESIGN_RULES.md` (Content Fundamentals). PT-BR, direto, "você", sem juridiquês. Header com logo, footer com link de descadastro de alertas (LGPD).

---

## 5. LGPD — checklist obrigatório

- [ ] Termos de Uso + Política de Privacidade escritos por advogado
- [ ] Consentimento explícito no cadastro (checkbox separado, não pré-marcado)
- [ ] Consentimento separado para compartilhamento de dados com empresas
- [ ] Endpoint `GET /me/export` (portabilidade)
- [ ] Endpoint `DELETE /me` com soft-delete + anonimização após 30 dias
- [ ] DPO designado e email de contato (`privacidade@vagasguaruja.com.br`)
- [ ] Cookies: banner + opt-in para não-essenciais
- [ ] Log de consentimentos (auditoria)
- [ ] Política de retenção: candidaturas → 24 meses; vagas → 12 meses pós-fechamento

---

## 6. Variáveis de ambiente

```env
# Database
DATABASE_URL=postgres://...

# Auth
JWT_SECRET=...
JWT_EXPIRES_IN=7d

# Email (Resend)
RESEND_API_KEY=...
EMAIL_FROM="Vagas Guarujá <noreply@vagasguaruja.com.br>"

# Mercado Pago
MP_ACCESS_TOKEN=...           # sandbox: TEST-...
MP_WEBHOOK_SECRET=...

# Storage (Supabase)
SUPABASE_URL=...
SUPABASE_SERVICE_KEY=...

# Misc
BASE_URL=https://api.vagasguaruja.com.br
APP_URL=https://vagasguaruja.com.br
```

---

## 7. Roadmap sugerido (MVP em ~8 semanas)

| Semana | Foco |
|---|---|
| 1 | Setup monorepo, DB schema, auth (signup + verify email) |
| 2 | CRUD vagas + listagem pública. Landing page real |
| 3 | Painel empresa: dashboard, nova vaga, lista de vagas |
| 4 | Candidato: feed, detalhe, candidatar (sem app nativo ainda — PWA) |
| 5 | Kanban candidatos + emails transacionais |
| 6 | Mercado Pago: pacotes, checkout, webhook, consumo de créditos |
| 7 | LGPD: termos, central de privacidade, export/delete |
| 8 | QA, polimento visual, deploy produção |
| 9+ | App nativo (React Native), alertas por email, perfis premium |

---

## 8. Como dar handoff ao Claude Code

1. Baixe este pacote
2. Crie um repositório novo (`git init vagasguaruja`)
3. Copie o pacote inteiro para a pasta `docs/design_handoff/` do repo
4. Abra o Claude Code na raiz do repo
5. Diga ao Claude: *"Leia `docs/design_handoff/README.md` e `docs/design_handoff/BACKEND_SPEC.md`. Vamos começar pela semana 1 do roadmap: setup do monorepo com Next.js + Fastify + PostgreSQL e implementar auth com confirmação por email."*
6. Vá iterando semana a semana
