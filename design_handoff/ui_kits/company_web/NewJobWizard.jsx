const NewJobWizard = ({ onBack, onPublish }) => {
  const [step, setStep] = React.useState(0);
  const [modalidade, setModalidade] = React.useState('Presencial');
  const [contrato, setContrato] = React.useState('CLT');
  const [pcd, setPcd] = React.useState(false);
  const [affirmative, setAffirmative] = React.useState([]);
  const steps = ['Cargo', 'Detalhes', 'Requisitos', 'Revisar'];

  const toggle = (list, setList, v) => {
    setList(list.includes(v) ? list.filter(x => x !== v) : [...list, v]);
  };

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <button onClick={onBack} className="btn btn-ghost" style={{padding:'4px 10px',fontSize:13,marginBottom:8}}>
            <Icon name="arrowLeft" size={14} /> Voltar
          </button>
          <h1>Nova vaga</h1>
          <div className="sub">Você usará <b style={{color:'var(--vg-green-700)'}}>1 crédito</b> ao publicar. Saldo: 12 créditos.</div>
        </div>
      </div>

      <div className="wizard">
        <div className="wizard-steps">
          {steps.map((s, i) => (
            <div key={i} className={`wstep ${i < step ? 'done' : ''} ${i === step ? 'current' : ''}`}>
              <div className="n">{i < step ? <Icon name="check" size={14} /> : i + 1}</div>
              <div className="l">{s}</div>
            </div>
          ))}
        </div>

        <div className="wizard-body">
          {step === 0 && (
            <>
              <div className="field">
                <label>Cargo</label>
                <input className="input" placeholder="Ex: Recepcionista Bilíngue" defaultValue="Recepcionista Bilíngue" />
                <div className="hint">Use um título claro e específico — aparece nas buscas.</div>
              </div>
              <div className="row2">
                <div className="field">
                  <label>Área</label>
                  <select><option>Hotelaria</option><option>Tecnologia</option><option>Vendas</option></select>
                </div>
                <div className="field">
                  <label>Tipo de contrato</label>
                  <div className="toggles">
                    {['CLT','PJ','Estágio','Temporário','Freela'].map(t => (
                      <button key={t} className={`toggle ${contrato===t?'on':''}`} onClick={() => setContrato(t)}>{t}</button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="field">
                <label>Modalidade</label>
                <div className="toggles">
                  {['Presencial','Híbrido','Remoto'].map(t => (
                    <button key={t} className={`toggle ${modalidade===t?'on':''}`} onClick={() => setModalidade(t)}>{t}</button>
                  ))}
                </div>
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <div className="row2">
                <div className="field">
                  <label>Cidade</label>
                  <input className="input" defaultValue="Guarujá" />
                </div>
                <div className="field">
                  <label>Bairro</label>
                  <input className="input" defaultValue="Praia da Enseada" />
                </div>
              </div>
              <div className="row3">
                <div className="field">
                  <label>Salário mín.</label>
                  <input className="input" defaultValue="R$ 2.500" />
                </div>
                <div className="field">
                  <label>Salário máx.</label>
                  <input className="input" defaultValue="R$ 3.000" />
                </div>
                <div className="field">
                  <label>Carga horária</label>
                  <input className="input" defaultValue="44h semanais" />
                </div>
              </div>
              <div className="field">
                <label>Benefícios</label>
                <div className="toggles">
                  {['VR','VT','Plano de saúde','Plano odontológico','Gratificação','Comissão','Refeição no local'].map(b => (
                    <button key={b} className="toggle">{b}</button>
                  ))}
                </div>
              </div>
              <div className="field">
                <label>Descrição da vaga</label>
                <textarea rows="4" placeholder="Atribuições, perfil ideal..."></textarea>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div className="row2">
                <div className="field">
                  <label>Escolaridade mín.</label>
                  <select><option>Médio completo</option><option>Médio incompleto</option><option>Superior em curso</option><option>Superior completo</option><option>Técnico</option></select>
                </div>
                <div className="field">
                  <label>Experiência mínima</label>
                  <select><option>Não exigida</option><option>6 meses</option><option>1 ano</option><option>2 anos</option><option>3+ anos</option></select>
                </div>
              </div>
              <div className="field">
                <label>Idiomas</label>
                <div className="toggles">
                  {['Inglês básico','Inglês intermediário','Inglês avançado','Espanhol','Francês'].map(b => (
                    <button key={b} className="toggle">{b}</button>
                  ))}
                </div>
              </div>
              <div className="field">
                <label>Vaga afirmativa (opcional)</label>
                <div className="toggles">
                  {['PCD','Mulheres','LGBTQIA+','Pessoas 50+','Pretos e Pardos'].map(b => (
                    <button key={b} className={`toggle ${affirmative.includes(b)?'on':''}`} onClick={() => toggle(affirmative, setAffirmative, b)}>{b}</button>
                  ))}
                </div>
                <div className="hint">Vagas afirmativas recebem destaque e atraem candidatos qualificados.</div>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <div style={{background:'var(--vg-green-50)',border:'1px solid #BCEAD2',borderRadius:12,padding:18,marginBottom:18}}>
                <div style={{fontWeight:700,fontSize:18,fontFamily:'var(--vg-font-display)',marginBottom:4}}>Recepcionista Bilíngue</div>
                <div style={{fontSize:13,color:'var(--vg-fg-2)',marginBottom:12}}>Praia da Enseada · CLT · {modalidade} · R$ 2.500 – R$ 3.000</div>
                <div style={{display:'flex',flexWrap:'wrap',gap:6}}>
                  <span style={{fontSize:11,fontWeight:600,padding:'3px 9px',borderRadius:999,background:'white',color:'var(--vg-green-700)'}}>Médio completo</span>
                  <span style={{fontSize:11,fontWeight:600,padding:'3px 9px',borderRadius:999,background:'white',color:'var(--vg-green-700)'}}>Inglês intermediário</span>
                  <span style={{fontSize:11,fontWeight:600,padding:'3px 9px',borderRadius:999,background:'white',color:'var(--vg-green-700)'}}>44h semanais</span>
                </div>
              </div>
              <div style={{padding:16,background:'var(--vg-warning-bg)',border:'1px solid #F2DCA8',borderRadius:12,fontSize:13,color:'#8C6010',display:'flex',gap:10,alignItems:'flex-start'}}>
                <Icon name="coin" size={18} />
                <div>Ao publicar, <b>1 crédito</b> será consumido do seu saldo. Você ficará com <b>11 créditos</b> restantes.</div>
              </div>
            </>
          )}
        </div>

        <div className="wizard-foot">
          <button className="btn btn-secondary" onClick={() => step > 0 ? setStep(step - 1) : onBack()}>
            {step === 0 ? 'Cancelar' : 'Voltar'}
          </button>
          {step < 3 ? (
            <button className="btn btn-primary" onClick={() => setStep(step + 1)}>
              Continuar <Icon name="arrowRight" size={14} />
            </button>
          ) : (
            <button className="btn btn-primary" onClick={onPublish}>
              <Icon name="check" size={16} /> Publicar vaga
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

window.NewJobWizard = NewJobWizard;
