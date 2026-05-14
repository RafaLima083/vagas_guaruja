const Topbar = ({ title }) => (
  <header className="topbar">
    <div className="tb-search">
      <Icon name="search" size={16} />
      <input placeholder="Buscar vagas, candidatos, empresas..." />
    </div>
    <div className="tb-actions">
      <button className="tb-iconbtn"><Icon name="bell" size={18} /><span className="dot"></span></button>
      <div className="tb-user">
        <div className="av">MR</div>
        <div className="name">Maria Ribeiro</div>
        <Icon name="chevronDown" size={14} color="var(--vg-fg-3)" />
      </div>
    </div>
  </header>
);

window.Topbar = Topbar;
