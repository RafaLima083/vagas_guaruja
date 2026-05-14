# UI Kit — App Mobile do Candidato

App nativo (iOS frame) para o candidato em **Vagas Guarujá**. Fluxos cobertos:

1. **Onboarding** — boas-vindas + login (mock)
2. **Buscar** — feed de vagas, busca, chips de filtro
3. **Detalhes da vaga** — descrição, requisitos, empresa, CTA candidatar
4. **Candidatura + LGPD** — formulário com consentimento explícito
5. **Minhas candidaturas** — lista com status (em análise / visualizada / rejeitada / aprovada)

Frame: `IOSDevice` 402×874 (vide `ios-frame.jsx`).

## Componentes
- `BottomTabBar` — Buscar · Salvas · Inscrições · Perfil
- `JobCard` (mobile) — versão compacta do card de vaga
- `StatusBadge` — pílulas para status de candidatura
- `LGPDSheet` — bottom sheet com texto de consentimento

Abra `index.html`.
