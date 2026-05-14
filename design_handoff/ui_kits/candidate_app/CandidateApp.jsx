// ═══════════════════════════════════════════════════════════════
// Vagas Guarujá — Candidate App (single-file React prototype)
// ═══════════════════════════════════════════════════════════════

const PhIcon = ({ name, size = 22, color = 'currentColor', filled = false }) => {
  const s = { width: size, height: size, stroke: color, fill: filled ? color : 'none', strokeWidth: 1.75, strokeLinecap: 'round', strokeLinejoin: 'round' };
  const m = {
    search: <svg viewBox="0 0 24 24" {...s}><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>,
    heart: <svg viewBox="0 0 24 24" {...s}><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z"/></svg>,
    file: <svg viewBox="0 0 24 24" {...s}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>,
    user: <svg viewBox="0 0 24 24" {...s}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
    chev: <svg viewBox="0 0 24 24" {...s}><polyline points="15 18 9 12 15 6"/></svg>,
    chevR: <svg viewBox="0 0 24 24" {...s}><polyline points="9 18 15 12 9 6"/></svg>,
    pin: <svg viewBox="0 0 24 24" {...s}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
    clock: <svg viewBox="0 0 24 24" {...s}><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 16 14"/></svg>,
    check: <svg viewBox="0 0 24 24" {...s}><polyline points="20 6 9 17 4 12"/></svg>,
    eye: <svg viewBox="0 0 24 24" {...s}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
    x: <svg viewBox="0 0 24 24" {...s}><path d="M18 6L6 18M6 6l12 12"/></svg>,
    leaf: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{width:size,height:size}}><path d="M6 6 L12 18 L18 6"/><path d="M12 18 L12 22"/></svg>,
  };
  return m[name] || null;
};

const JOBS = [
  { id: 'j1', logo: 'GM', title: 'Recepcionista Bilíngue', company: 'Hotel Guarujá Mar', location: 'Praia da Enseada', modality: 'Presencial', contract: 'CLT', posted: 'há 2 dias', salary: 'R$ 2.500', highlight: true, tags: ['CLT', 'Inglês', 'Médio'] },
  { id: 'j2', logo: 'SD', title: 'Vendedor de Loja · Calçados', company: 'Calçados Solmar', location: 'Centro', modality: 'Presencial', contract: 'CLT', posted: 'hoje', salary: 'R$ 1.800 + comissão', highlight: false, tags: ['CLT', 'Sem exp.'] },
  { id: 'j3', logo: 'PE', title: 'Desenvolvedor Front-end', company: 'Praia Estúdio', location: 'Remoto', modality: 'Remoto', contract: 'PJ', posted: 'ontem', salary: 'R$ 7.000', highlight: false, tags: ['PJ', 'React'] },
  { id: 'j4', logo: 'CG', title: 'Cozinheiro Internacional', company: 'Casa Grande Hotel', location: 'Pitangueiras', modality: 'Presencial', contract: 'CLT', posted: 'há 3 dias', salary: 'R$ 3.200', highlight: false, tags: ['CLT', 'Hotelaria'] },
  { id: 'j5', logo: 'SL', title: 'Salva-vidas Temporada', company: 'Clube Náutico', location: 'Praia da Enseada', modality: 'Presencial', contract: 'Temporário', posted: 'há 1 dia', salary: 'R$ 2.800', highlight: true, tags: ['Temporário'] },
];

const APPS_INIT = [
  { logo: 'CG', title: 'Cozinheiro Internacional', company: 'Casa Grande Hotel', date: 'há 2 dias', cls: 'stat-eye', icon: 'eye', label: 'Visualizada pela empresa' },
  { logo: 'PE', title: 'Desenvolvedor Front-end', company: 'Praia Estúdio', date: 'há 5 dias', cls: 'stat-success', icon: 'check', label: 'Selecionado para entrevista' },
  { logo: 'SD', title: 'Vendedor de Loja', company: 'Calçados Solmar', date: 'há 1 semana', cls: 'stat-danger', icon: 'x', label: 'Vaga preenchida' },
];

const TopSpace = () => <div className="topspace" />;

const MJob = ({ job, onOpen, saved, onSave }) => (
  <div className="mjob" onClick={onOpen}>
    <div className="h">
      <div className="logo">{job.logo}</div>
      <div style={{flex:1,minWidth:0}}>
        <div className="title">{job.title}</div>
        <div className="company">{job.company}</div>
      </div>
      <button className={`heart ${saved ? 'on' : ''}`} onClick={(e) => { e.stopPropagation(); onSave(); }}>
        <PhIcon name="heart" size={20} filled={saved} />
      </button>
    </div>
    <div className="meta">
      <PhIcon name="pin" size={11} color="var(--vg-fg-3)" />
      <span>{job.location}</span>
      <span className="dot"></span>
      <span>{job.modality}</span>
      <span className="dot"></span>
      <span>{job.posted}</span>
    </div>
    <div className="tags">
      {job.highlight && <span className="tag coral">DESTAQUE</span>}
      {job.tags.map((t, i) => <span className="tag" key={i}>{t}</span>)}
    </div>
    <div className="salary">{job.salary}</div>
  </div>
);

const BottomTabBar = ({ active, onTab }) => {
  const tabs = [
    { id: 'feed', label: 'Buscar', icon: 'search' },
    { id: 'saved', label: 'Salvas', icon: 'heart' },
    { id: 'apps', label: 'Inscrições', icon: 'file' },
    { id: 'profile', label: 'Perfil', icon: 'user' },
  ];
  return (
    <div className="tabbar">
      {tabs.map(t => (
        <button key={t.id} className={`tab ${active === t.id ? 'on' : ''}`} onClick={() => onTab(t.id)}>
          <PhIcon name={t.icon} size={22} filled={active === t.id} />
          <span>{t.label}</span>
        </button>
      ))}
    </div>
  );
};

// ─── Screens ───
const Welcome = ({ onContinue }) => (
  <div className="vg-phone">
    <TopSpace />
    <div className="welcome">
      <div className="mark"><PhIcon name="leaf" size={28} color="white" /></div>
      <h1>Encontre sua próxima <em>vaga.</em></h1>
      <p>Empresas do Guarujá publicam vagas todos os dias. Você se candidata com um toque.</p>
      <div className="btns">
        <button className="primary" onClick={onContinue}>Criar conta</button>
        <button className="secondary" onClick={onContinue}>Já tenho conta</button>
      </div>
    </div>
  </div>
);

const Feed = ({ jobs, onOpen, saved, onSave }) => {
  const [filter, setFilter] = React.useState('Todas');
  const filters = ['Todas', 'Hotelaria', 'Vendas', 'Tecnologia', 'Remoto', 'CLT'];
  return (
    <div className="vg-phone">
      <TopSpace />
      <div className="ph-header">
        <h1>Olá, João 👋</h1>
        <div className="sub">68 novas vagas em Guarujá esta semana</div>
        <div className="ph-search">
          <PhIcon name="search" size={16} color="var(--vg-fg-3)" />
          <input placeholder="Cargo, área, empresa..." />
        </div>
      </div>
      <div className="ph-chips">
        {filters.map(f => (
          <button key={f} className={`ph-chip ${filter===f?'on':''}`} onClick={() => setFilter(f)}>{f}</button>
        ))}
      </div>
      <div className="scroll">
        {jobs.map((j, i) => <MJob key={i} job={j} onOpen={() => onOpen(j)} saved={!!saved[j.id]} onSave={() => onSave(j.id)} />)}
      </div>
    </div>
  );
};

const Detail = ({ job, onBack, onApply }) => (
  <div className="vg-phone">
    <TopSpace />
    <button className="ph-back" onClick={onBack}>
      <PhIcon name="chev" size={18} color="var(--vg-fg-1)" />
    </button>
    <div className="scroll">
      <div className="ph-detail-hero">
        <div className="badges">
          {job.highlight && <span className="badge coral">DESTAQUE</span>}
          <span className="badge green">{job.contract}</span>
        </div>
        <h2>{job.title}</h2>
        <div className="crow">
          <div className="logo">{job.logo}</div>
          <div>
            <div className="n">{job.company}</div>
            <div className="l">{job.location}</div>
          </div>
        </div>
        <div className="info">
          <div><div className="lbl">Salário</div><div className="val green">{job.salary}</div></div>
          <div><div className="lbl">Modalidade</div><div className="val">{job.modality}</div></div>
          <div><div className="lbl">Escolaridade</div><div className="val">Médio completo</div></div>
          <div><div className="lbl">Carga horária</div><div className="val">44h semanais</div></div>
        </div>
      </div>
      <div className="sect">
        <h3>Sobre a vaga</h3>
        <p>Buscamos recepcionista para o turno da manhã, com atendimento ao hóspede internacional. Local na Praia da Enseada.</p>
      </div>
      <div className="sect">
        <h3>Requisitos</h3>
        <ul>
          <li>Ensino médio completo</li>
          <li>Inglês intermediário (obrigatório)</li>
          <li>Experiência em hotelaria (desejável)</li>
        </ul>
      </div>
      <div className="sect">
        <h3>Benefícios</h3>
        <ul>
          <li>Vale-refeição e vale-transporte</li>
          <li>Plano de saúde após 3 meses</li>
          <li>Gratificação por desempenho</li>
        </ul>
      </div>
      <div style={{height: 120}}></div>
    </div>
    <div className="ph-cta-bar">
      <button onClick={onApply}>Candidatar-se</button>
    </div>
  </div>
);

const ApplyForm = ({ job, onBack, onSubmit }) => {
  const [accept, setAccept] = React.useState(false);
  const [acceptShare, setAcceptShare] = React.useState(false);
  const can = accept && acceptShare;
  return (
    <div className="vg-phone">
      <TopSpace />
      <button className="ph-back" onClick={onBack}><PhIcon name="chev" size={18} color="var(--vg-fg-1)" /></button>
      <div className="scroll">
        <div className="ph-form">
          <h2>Finalizar candidatura</h2>
          <div className="sub">Confirme seus dados antes de enviar para {job.company}.</div>
          <div className="ph-field"><label>Nome completo</label><input defaultValue="João Pedro Silva" /></div>
          <div className="ph-field"><label>Email</label><input defaultValue="joao.silva@email.com" /></div>
          <div className="ph-field"><label>Telefone</label><input defaultValue="(13) 99876-5432" /></div>
          <div className="ph-field"><label>Mensagem (opcional)</label><textarea rows="3" placeholder="Conte por que você é um bom match..."></textarea></div>
          <div className="lgpd-box">
            <b>Como usamos seus dados</b>
            Ao se candidatar, compartilhamos seu nome, email, telefone e currículo com {job.company}. Você pode retirar a candidatura e solicitar exclusão a qualquer momento.
          </div>
          <div className="consent" onClick={() => setAccept(!accept)}>
            <div className={`cbox ${accept ? 'on' : ''}`}></div>
            <label>Aceito os <a>Termos de uso</a> e a <a>Política de Privacidade</a> (LGPD).</label>
          </div>
          <div className="consent" onClick={() => setAcceptShare(!acceptShare)}>
            <div className={`cbox ${acceptShare ? 'on' : ''}`}></div>
            <label>Autorizo o compartilhamento dos meus dados com {job.company} para análise desta vaga.</label>
          </div>
        </div>
        <div style={{height: 100}}></div>
      </div>
      <div className="ph-cta-bar">
        <button onClick={can ? onSubmit : undefined} style={{opacity: can ? 1 : 0.45}} disabled={!can}>Enviar candidatura</button>
      </div>
    </div>
  );
};

const Success = ({ job, onDone }) => (
  <div className="vg-phone">
    <TopSpace />
    <div style={{padding:'40px 28px 40px',height:'100%',display:'flex',flexDirection:'column',textAlign:'center',alignItems:'center',boxSizing:'border-box'}}>
      <div style={{width:88,height:88,borderRadius:'50%',background:'var(--vg-green-50)',display:'flex',alignItems:'center',justifyContent:'center',marginBottom:20,marginTop:30}}>
        <PhIcon name="check" size={44} color="var(--vg-green-600)" />
      </div>
      <h1 style={{fontFamily:'var(--vg-font-display)',fontSize:26,fontWeight:700,letterSpacing:'-0.02em',margin:'0 0 10px'}}>Candidatura enviada</h1>
      <p style={{fontSize:14,color:'var(--vg-fg-2)',lineHeight:1.5,margin:'0 12px'}}>{job.company} recebeu sua candidatura para <b>{job.title}</b>. Avisaremos por email a cada atualização.</p>
      <div style={{marginTop:'auto',width:'100%',display:'flex',flexDirection:'column',gap:10}}>
        <button onClick={onDone} style={{padding:14,background:'var(--vg-green-500)',color:'white',border:0,borderRadius:14,fontWeight:700,fontSize:15}}>Ver minhas candidaturas</button>
        <button onClick={onDone} style={{padding:14,background:'white',color:'var(--vg-fg-1)',border:'1px solid var(--vg-border-strong)',borderRadius:14,fontWeight:600,fontSize:14}}>Continuar buscando</button>
      </div>
    </div>
  </div>
);

const Applications = ({ apps }) => (
  <div className="vg-phone">
    <TopSpace />
    <div className="ph-header">
      <h1>Suas candidaturas</h1>
      <div className="sub">{apps.length} ativas · avisos por email</div>
    </div>
    <div className="scroll">
      {apps.map((a, i) => (
        <div className="app-card" key={i}>
          <div className="row">
            <div className="logo">{a.logo}</div>
            <div style={{flex:1}}>
              <div className="t">{a.title}</div>
              <div className="c">{a.company} · {a.date}</div>
            </div>
          </div>
          <div className={`stat ${a.cls}`}>
            <PhIcon name={a.icon} size={14} />
            <span>{a.label}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const Saved = ({ jobs, saved, onOpen, onSave }) => {
  const list = jobs.filter(j => saved[j.id]);
  return (
    <div className="vg-phone">
      <TopSpace />
      <div className="ph-header">
        <h1>Vagas salvas</h1>
        <div className="sub">{list.length} salvas</div>
      </div>
      <div className="scroll">
        {list.length === 0 ? (
          <div style={{padding:'40px 32px',textAlign:'center',color:'var(--vg-fg-3)',fontSize:14}}>Toque no coração para salvar uma vaga.</div>
        ) : list.map(j => <MJob key={j.id} job={j} onOpen={() => onOpen(j)} saved={true} onSave={() => onSave(j.id)} />)}
      </div>
    </div>
  );
};

const Profile = () => (
  <div className="vg-phone">
    <TopSpace />
    <div className="ph-header">
      <h1>Seu perfil</h1>
      <div className="sub">Mantenha seus dados atualizados</div>
    </div>
    <div className="scroll" style={{padding:'10px 20px'}}>
      <div style={{background:'white',border:'1px solid var(--vg-border)',borderRadius:14,padding:18,boxShadow:'var(--vg-shadow-sm)',display:'flex',alignItems:'center',gap:14}}>
        <div style={{width:54,height:54,borderRadius:'50%',background:'var(--vg-coral-50)',color:'var(--vg-coral-700)',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:700,fontFamily:'var(--vg-font-display)',fontSize:18}}>JS</div>
        <div>
          <div style={{fontWeight:700,fontSize:16}}>João Pedro Silva</div>
          <div style={{fontSize:13,color:'var(--vg-fg-3)'}}>24 anos · Vicente de Carvalho</div>
        </div>
      </div>
      <div style={{marginTop:14,background:'white',border:'1px solid var(--vg-border)',borderRadius:14,boxShadow:'var(--vg-shadow-sm)'}}>
        {['Dados pessoais','Endereço','Escolaridade','Experiência','Idiomas','Currículo (PDF)','Notificações','Privacidade & LGPD'].map((l,i,a) => (
          <div key={i} style={{padding:'14px 16px',borderBottom:i<a.length-1?'1px solid var(--vg-border)':'none',display:'flex',alignItems:'center',justifyContent:'space-between',fontSize:14,fontWeight:500}}>
            <span>{l}</span><PhIcon name="chevR" size={16} color="var(--vg-fg-4)" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

const PhoneApp = () => {
  const [screen, setScreen] = React.useState('welcome');
  const [openJob, setOpenJob] = React.useState(null);
  const [tab, setTab] = React.useState('feed');
  const [saved, setSaved] = React.useState({ j2: true });
  const [apps, setApps] = React.useState(APPS_INIT);

  const toggleSave = (id) => setSaved(s => ({ ...s, [id]: !s[id] }));
  const goToDetail = (j) => { setOpenJob(j); setScreen('detail'); };
  const submit = () => {
    const j = openJob;
    setApps(a => [{ logo: j.logo, title: j.title, company: j.company, date: 'enviada agora', cls: 'stat-info', icon: 'clock', label: 'Em análise' }, ...a]);
    setScreen('success');
  };

  let inner = null;
  if (screen === 'welcome') inner = <Welcome onContinue={() => setScreen('app')} />;
  else if (screen === 'detail') inner = <Detail job={openJob} onBack={() => setScreen('app')} onApply={() => setScreen('apply')} />;
  else if (screen === 'apply') inner = <ApplyForm job={openJob} onBack={() => setScreen('detail')} onSubmit={submit} />;
  else if (screen === 'success') inner = <Success job={openJob} onDone={() => { setTab('apps'); setScreen('app'); }} />;
  else {
    if (tab === 'feed') inner = <Feed jobs={JOBS} onOpen={goToDetail} saved={saved} onSave={toggleSave} />;
    else if (tab === 'apps') inner = <Applications apps={apps} />;
    else if (tab === 'saved') inner = <Saved jobs={JOBS} saved={saved} onOpen={goToDetail} onSave={toggleSave} />;
    else if (tab === 'profile') inner = <Profile />;
  }

  return (
    <div style={{position:'relative', height: '100%'}}>
      {inner}
      {screen === 'app' && <BottomTabBar active={tab} onTab={setTab} />}
    </div>
  );
};

const App = () => (
  <div className="stage">
    <div className="device-wrap">
      <IOSDevice width={390} height={844}>
        <PhoneApp />
      </IOSDevice>
      <div className="device-label">Vagas Guarujá · Candidato</div>
    </div>
  </div>
);

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
