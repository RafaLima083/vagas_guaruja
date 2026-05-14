const CreditsModal = ({ onClose, onConfirm }) => (
  <div className="modal-bg" onClick={onClose}>
    <div className="modal" onClick={e => e.stopPropagation()}>
      <h3>Comprar 10 créditos</h3>
      <div className="sub">Pagamento processado com segurança pelo Mercado Pago.</div>
      <div className="mp-mock">
        <div className="mp-ic">MP</div>
        <div className="info">
          <div className="n">Mercado Pago Checkout</div>
          <div className="s">Pix, boleto ou cartão · ambiente seguro</div>
        </div>
      </div>
      <div style={{padding:14,background:'var(--vg-bg)',borderRadius:12,marginBottom:18,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <div>
          <div style={{fontWeight:700,fontSize:14}}>Total a pagar</div>
          <div style={{fontSize:12,color:'var(--vg-fg-3)'}}>10 créditos · ~30 dias por vaga</div>
        </div>
        <div style={{fontFamily:'var(--vg-font-display)',fontSize:24,fontWeight:700}}>R$ 99,00</div>
      </div>
      <div style={{display:'flex',gap:10}}>
        <button className="btn btn-secondary" style={{flex:1}} onClick={onClose}>Cancelar</button>
        <button className="btn btn-primary" style={{flex:2}} onClick={onConfirm}>Ir para o pagamento</button>
      </div>
    </div>
  </div>
);

const App = () => {
  const [screen, setScreen] = React.useState('dashboard');
  const [credits, setCredits] = React.useState(12);
  const [showCreditsModal, setShowCreditsModal] = React.useState(false);
  const [history, setHistory] = React.useState([
    { type: 'uso', label: 'Vaga: Recepcionista Bilíngue', date: '12 mai 2026 · 14:32', id: 'VAGA-2847', qty: 1 },
    { type: 'uso', label: 'Vaga: Cozinheiro Internacional', date: '10 mai 2026 · 09:14', id: 'VAGA-2843', qty: 1 },
    { type: 'compra', label: 'Pacote 10 créditos · Mercado Pago', date: '05 mai 2026 · 11:02', id: 'MP-9X8K3L2', qty: 10 },
    { type: 'uso', label: 'Vaga: Camareira', date: '01 mai 2026 · 16:48', id: 'VAGA-2829', qty: 1 },
  ]);

  const goTo = (s) => setScreen(s);

  const handlePublish = () => {
    setCredits(c => c - 1);
    setHistory(h => [{ type: 'uso', label: 'Vaga: Recepcionista Bilíngue', date: 'agora', id: 'VAGA-NOVA', qty: 1 }, ...h]);
    setScreen('vagas');
  };

  const handleBuyCredits = () => {
    setShowCreditsModal(false);
    setCredits(c => c + 10);
    setHistory(h => [{ type: 'compra', label: 'Pacote 10 créditos · Mercado Pago', date: 'agora', id: 'MP-NOVA', qty: 10 }, ...h]);
    setScreen('creditos');
  };

  return (
    <div className="app">
      <Sidebar
        active={screen === 'novavaga' ? 'vagas' : screen === 'candidatos-vaga' ? 'candidatos' : screen}
        onNav={(s) => setScreen(s)}
        credits={credits}
        onBuyCredits={() => setShowCreditsModal(true)}
      />
      <main>
        <Topbar />
        {screen === 'dashboard' && <Dashboard onNewJob={() => setScreen('novavaga')} onGoToCandidates={() => setScreen('candidatos-vaga')} />}
        {screen === 'vagas' && <VagasList onOpen={() => setScreen('candidatos-vaga')} onNewJob={() => setScreen('novavaga')} />}
        {screen === 'candidatos' && <Kanban onBack={() => setScreen('vagas')} />}
        {screen === 'candidatos-vaga' && <Kanban onBack={() => setScreen('vagas')} />}
        {screen === 'novavaga' && <NewJobWizard onBack={() => setScreen('vagas')} onPublish={handlePublish} />}
        {screen === 'creditos' && <Credits onBuy={() => setShowCreditsModal(true)} balance={credits} history={history} />}
        {screen === 'config' && (
          <div className="page">
            <div className="page-head"><div><h1>Configurações</h1><div className="sub">Conta da empresa, equipe e notificações.</div></div></div>
            <div className="panel" style={{padding:24,color:'var(--vg-fg-3)',fontSize:14}}>Tela placeholder — configurações vivas em outra iteração.</div>
          </div>
        )}
      </main>
      {showCreditsModal && <CreditsModal onClose={() => setShowCreditsModal(false)} onConfirm={handleBuyCredits} />}
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
