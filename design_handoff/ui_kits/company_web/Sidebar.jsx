const Sidebar = ({ active, onNav, credits, onBuyCredits }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'home' },
    { id: 'vagas', label: 'Vagas', icon: 'briefcase', count: 12 },
    { id: 'candidatos', label: 'Candidatos', icon: 'users', count: 47 },
    { id: 'creditos', label: 'Créditos', icon: 'coin' },
  ];
  return (
    <aside className="sidebar">
      <div className="sb-brand">
        <div className="mark"><Icon name="leaf" size={20} /></div>
        <div>
          <div className="name">Vagas Guarujá</div>
          <div className="sub">Hotel Guarujá Mar</div>
        </div>
      </div>
      <div className="sb-section">Geral</div>
      {navItems.map((it) => (
        <button key={it.id} className={`sb-item ${active === it.id ? 'active' : ''}`} onClick={() => onNav(it.id)}>
          <Icon name={it.icon} size={18} />
          <span>{it.label}</span>
          {it.count != null && <span className="count">{it.count}</span>}
        </button>
      ))}
      <div className="sb-section">Conta</div>
      <button className={`sb-item ${active === 'config' ? 'active' : ''}`} onClick={() => onNav('config')}>
        <Icon name="settings" size={18} />
        <span>Configurações</span>
      </button>

      <div className="sb-credits">
        <div className="label">Seus créditos</div>
        <div className="val">{credits}<small>disponíveis</small></div>
        <button onClick={onBuyCredits}>Comprar mais</button>
      </div>
    </aside>
  );
};

window.Sidebar = Sidebar;
