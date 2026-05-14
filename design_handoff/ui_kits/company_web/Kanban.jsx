const KCard = ({ initials, name, school, tags, color }) => (
  <div className="kcard">
    <div className="who">
      <div className="av" style={{background: color === 'coral' ? 'var(--vg-coral-50)' : 'var(--vg-green-50)', color: color === 'coral' ? 'var(--vg-coral-700)' : 'var(--vg-green-700)'}}>{initials}</div>
      <div>
        <div className="n">{name}</div>
        <div className="a">{school}</div>
      </div>
    </div>
    <div className="tags">
      {tags.map((t, i) => <span className="tag" key={i}>{t}</span>)}
    </div>
  </div>
);

const Kanban = ({ onBack }) => {
  const cols = [
    { title: 'Novos', count: 12, cards: [
      { initials: 'JS', name: 'João Silva', school: 'Ensino médio · 24a', tags: ['Inglês intermediário', '2 anos hotel'] },
      { initials: 'MA', name: 'Marina Alves', school: 'Superior em curso · 21a', tags: ['Inglês avançado', 'Sem exp.'] },
      { initials: 'LE', name: 'Larissa E.', school: 'Técnico · 28a', tags: ['Espanhol', '4 anos turismo'] },
    ]},
    { title: 'Em análise', count: 5, cards: [
      { initials: 'RC', name: 'Rafael Costa', school: 'Superior completo · 31a', tags: ['Inglês fluente', '6 anos'], color: 'coral' },
      { initials: 'PF', name: 'Pedro Ferreira', school: 'Ensino médio · 26a', tags: ['Inglês básico'], color: 'coral' },
    ]},
    { title: 'Selecionados', count: 2, cards: [
      { initials: 'CB', name: 'Carla Bispo', school: 'Superior completo · 29a', tags: ['Inglês fluente', '5 anos hotel'] },
    ]},
    { title: 'Rejeitados', count: 8, cards: [
      { initials: 'RA', name: 'Ricardo A.', school: 'Médio · 19a', tags: ['Sem inglês'] },
      { initials: 'GS', name: 'Gabriel S.', school: 'Médio · 22a', tags: ['Sem experiência'] },
    ]},
  ];

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <button onClick={onBack} className="btn btn-ghost" style={{padding:'4px 10px',fontSize:13,marginBottom:8}}>
            <Icon name="arrowLeft" size={14} /> Vagas
          </button>
          <h1>Recepcionista Bilíngue</h1>
          <div className="sub">28 candidatos · publicada há 2 dias · R$ 2.500 · Praia da Enseada</div>
        </div>
        <div style={{display:'flex',gap:10}}>
          <button className="btn btn-secondary">Pausar</button>
          <button className="btn btn-primary"><Icon name="check" size={16} /> Marcar como preenchida</button>
        </div>
      </div>

      <div className="kanban">
        {cols.map((c, i) => (
          <div className="kcol" key={i}>
            <div className="kcol-head">
              <span className="title">{c.title}</span>
              <span className="count">{c.count}</span>
            </div>
            {c.cards.map((card, j) => <KCard key={j} {...card} />)}
          </div>
        ))}
      </div>
    </div>
  );
};

window.Kanban = Kanban;
