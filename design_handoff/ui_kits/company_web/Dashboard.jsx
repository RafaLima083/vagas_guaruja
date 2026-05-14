const StatCard = ({ icon, label, value, delta, negative }) => (
  <div className="stat">
    <div className="h">
      <span className="l">{label}</span>
      <span className="ic"><Icon name={icon} size={16} /></span>
    </div>
    <div className="v">{value}</div>
    {delta && <div className={`delta ${negative ? 'neg' : ''}`}>{delta}</div>}
  </div>
);

const Dashboard = ({ onNewJob, onGoToCandidates }) => {
  return (
    <div className="page">
      <div className="page-head">
        <div>
          <h1>Olá, Maria 👋</h1>
          <div className="sub">Você tem 3 novas candidaturas desde ontem.</div>
        </div>
        <button className="btn btn-primary" onClick={onNewJob}>
          <Icon name="plus" size={16} /> Nova vaga
        </button>
      </div>

      <div className="stats">
        <StatCard icon="briefcase" label="Vagas ativas" value="8" delta="+2 esta semana" />
        <StatCard icon="users" label="Candidaturas" value="142" delta="+18 hoje" />
        <StatCard icon="eye" label="Visualizações" value="2,348" delta="+12% vs. semana" />
        <StatCard icon="coin" label="Créditos restantes" value="12" delta="–3 esta semana" negative />
      </div>

      <div className="two-col">
        <div className="panel">
          <div className="panel-head">
            <h3>Vagas em destaque</h3>
            <button className="btn btn-ghost" style={{padding:'6px 12px',fontSize:13}}>Ver todas <Icon name="arrowRight" size={14} /></button>
          </div>
          <div className="panel-body">
            {[
              { t: 'Recepcionista Bilíngue', meta: 'Praia da Enseada · CLT', status: 'green', label: 'Ativa', applicants: 28, days: '2d' },
              { t: 'Cozinheiro Internacional', meta: 'Centro · CLT', status: 'green', label: 'Ativa', applicants: 14, days: '4d' },
              { t: 'Camareira', meta: 'Pitangueiras · CLT', status: 'warn', label: '2 dias rest.', applicants: 9, days: '12d' },
              { t: 'Garçom · final de semana', meta: 'Astúrias · Temporário', status: 'gray', label: 'Pausada', applicants: 3, days: '5d' },
            ].map((j, i) => (
              <div className="job-row" key={i} onClick={onGoToCandidates}>
                <div>
                  <div className="t">{j.t}</div>
                  <div className="meta">{j.meta}</div>
                </div>
                <div><span className={`pill ${j.status}`}>{j.label}</span></div>
                <div className="num">{j.applicants}<small>candidatos</small></div>
                <div className="meta">há {j.days}</div>
                <div style={{textAlign:'right'}}><Icon name="arrowRight" size={16} color="var(--vg-fg-3)" /></div>
              </div>
            ))}
          </div>
        </div>

        <div className="panel">
          <div className="panel-head">
            <h3>Atividade recente</h3>
          </div>
          <div className="panel-body">
            {[
              { who: 'JS', name: 'João Silva', what: 'se candidatou a', job: 'Recepcionista Bilíngue', ts: 'há 12 min' },
              { who: 'MA', name: 'Marina Alves', what: 'se candidatou a', job: 'Cozinheiro Internacional', ts: 'há 1 h' },
              { who: 'RC', name: 'Rafael Costa', what: 'foi movido para', job: 'Em análise', ts: 'há 2 h' },
              { who: 'LE', name: 'Larissa Eduarda', what: 'visualizou', job: 'Camareira', ts: 'há 3 h' },
              { who: 'PF', name: 'Pedro Ferreira', what: 'se candidatou a', job: 'Garçom', ts: 'ontem' },
            ].map((a, i) => (
              <div className="feed-item" key={i}>
                <div className="av">{a.who}</div>
                <div style={{flex:1}}>
                  <div className="t"><b>{a.name}</b> {a.what} <b>{a.job}</b></div>
                  <div className="ts">{a.ts}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

window.Dashboard = Dashboard;
