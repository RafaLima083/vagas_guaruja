const VagasList = ({ onOpen, onNewJob }) => {
  const [filter, setFilter] = React.useState('Todas');
  const filters = ['Todas', 'Ativas', 'Pausadas', 'Preenchidas', 'Expiradas'];
  const jobs = [
    { t: 'Recepcionista Bilíngue', meta: 'Praia da Enseada · CLT · Presencial', status: 'green', label: 'Ativa', applicants: 28, days: '2d', salary: 'R$ 2.500' },
    { t: 'Cozinheiro Internacional', meta: 'Centro · CLT · Presencial', status: 'green', label: 'Ativa', applicants: 14, days: '4d', salary: 'R$ 3.200' },
    { t: 'Camareira', meta: 'Pitangueiras · CLT · Presencial', status: 'warn', label: '2 dias rest.', applicants: 9, days: '12d', salary: 'R$ 1.800' },
    { t: 'Garçom · final de semana', meta: 'Astúrias · Temporário · Presencial', status: 'gray', label: 'Pausada', applicants: 3, days: '5d', salary: 'R$ 90/dia' },
    { t: 'Auxiliar de Manutenção', meta: 'Vicente de Carvalho · CLT', status: 'green', label: 'Ativa', applicants: 11, days: '6d', salary: 'R$ 2.100' },
    { t: 'Salva-vidas (alta temporada)', meta: 'Praia da Enseada · Temporário', status: 'green', label: 'Ativa', applicants: 22, days: '1d', salary: 'R$ 2.800' },
    { t: 'Recepcionista de Spa', meta: 'Praia da Enseada · CLT', status: 'gray', label: 'Preenchida', applicants: 18, days: '21d', salary: 'R$ 2.300' },
    { t: 'Atendente de Pizzaria', meta: 'Pae Cará · CLT', status: 'gray', label: 'Expirada', applicants: 7, days: '32d', salary: 'R$ 1.600' },
  ];

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <h1>Suas vagas</h1>
          <div className="sub">8 ativas · 2 pausadas · 2 finalizadas</div>
        </div>
        <button className="btn btn-primary" onClick={onNewJob}>
          <Icon name="plus" size={16} /> Nova vaga
        </button>
      </div>

      <div style={{display:'flex',gap:8,marginBottom:18,flexWrap:'wrap'}}>
        {filters.map(f => (
          <button key={f} className={`toggle ${filter === f ? 'on' : ''}`} onClick={() => setFilter(f)}>
            {f}
          </button>
        ))}
      </div>

      <div className="panel">
        <div className="panel-body">
          {jobs.map((j, i) => (
            <div className="job-row" key={i} onClick={onOpen}>
              <div>
                <div className="t">{j.t}</div>
                <div className="meta">{j.meta}</div>
              </div>
              <div><span className={`pill ${j.status}`}>{j.label}</span></div>
              <div className="num">{j.applicants}<small>candidatos</small></div>
              <div className="meta" style={{fontWeight:600,color:'var(--vg-green-700)'}}>{j.salary}</div>
              <div style={{textAlign:'right'}}><Icon name="arrowRight" size={16} color="var(--vg-fg-3)" /></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

window.VagasList = VagasList;
