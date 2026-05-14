# UI Kit — Painel Web da Empresa

Recreação do painel administrativo de empresas em **Vagas Guarujá**. Cobre os fluxos:

1. **Dashboard** — visão geral, créditos, vagas ativas, novas candidaturas
2. **Vagas** — lista, filtros, status (ativa / preenchida / pausada / expirada)
3. **Candidatos** — kanban por vaga (Novos · Em análise · Selecionados · Rejeitados)
4. **Nova vaga** — formulário multi-step (Cargo → Detalhes → Requisitos → Revisar e publicar)
5. **Créditos** — saldo, histórico, compra (mock Mercado Pago)

Layout: sidebar 240px fixa + topbar 64px + content. Container max 1280px.

Sem Figma ou codebase original — design criado a partir das fundações em `colors_and_type.css`.

## Componentes principais
- `Sidebar` — nav primária, saldo de créditos, perfil empresa
- `Topbar` — busca, notificações, usuário
- `StatCard` — métricas no dashboard
- `JobRow` — linha de vaga com status e ações
- `CandidateCard` — card no kanban
- `Wizard` — multi-step para criar vaga
- `CreditsModal` — comprar créditos com pacotes

## Como executar
Abra `index.html`. React + Babel inline.
