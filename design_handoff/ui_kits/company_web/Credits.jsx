const Credits = ({ onBuy, balance, history }) => {
  return (
    <div className="page">
      <div className="page-head">
        <div>
          <h1>Créditos</h1>
          <div className="sub">1 crédito = 1 vaga publicada por 30 dias.</div>
        </div>
      </div>

      <div style={{background:'linear-gradient(135deg, var(--vg-green-700), var(--vg-green-500))',color:'white',borderRadius:16,padding:28,display:'flex',alignItems:'center',justifyContent:'space-between',boxShadow:'var(--vg-shadow-brand)'}}>
        <div>
          <div style={{fontSize:13,fontWeight:600,letterSpacing:'0.06em',textTransform:'uppercase',opacity:0.8}}>Saldo atual</div>
          <div style={{fontFamily:'var(--vg-font-display)',fontSize:64,fontWeight:700,letterSpacing:'-0.02em',lineHeight:1.05,marginTop:6}}>{balance}<span style={{fontSize:20,opacity:0.7,marginLeft:8,fontWeight:500}}>créditos</span></div>
          <div style={{opacity:0.85,fontSize:14,marginTop:6}}>Próxima cobrança: nenhuma · você só paga o que usa.</div>
        </div>
        <button className="btn" style={{background:'white',color:'var(--vg-green-700)',padding:'14px 24px',fontSize:16}} onClick={onBuy}>
          <Icon name="plus" size={18} /> Comprar créditos
        </button>
      </div>

      <h3 style={{fontFamily:'var(--vg-font-display)',fontSize:22,fontWeight:700,marginTop:36,marginBottom:4}}>Pacotes</h3>
      <div className="sub" style={{marginBottom:6,color:'var(--vg-fg-3)',fontSize:14}}>Pague uma vez, use quando quiser. Sem mensalidades.</div>

      <div className="credit-grid">
        <div className="credit-pack">
          <div className="credits">5<small>créditos</small></div>
          <div className="price">R$ 59,00</div>
          <div className="per">R$ 11,80 por vaga</div>
          <button className="btn btn-secondary" onClick={onBuy}>Selecionar</button>
        </div>
        <div className="credit-pack popular">
          <span className="popular-tag">MAIS POPULAR</span>
          <div className="credits">10<small>créditos</small></div>
          <div className="price">R$ 99,00</div>
          <div className="per">R$ 9,90 por vaga · economia de 16%</div>
          <button className="btn btn-primary" onClick={onBuy}>Selecionar</button>
        </div>
        <div className="credit-pack">
          <div className="credits">30<small>créditos</small></div>
          <div className="price">R$ 249,00</div>
          <div className="per">R$ 8,30 por vaga · economia de 30%</div>
          <button className="btn btn-secondary" onClick={onBuy}>Selecionar</button>
        </div>
      </div>

      <h3 style={{fontFamily:'var(--vg-font-display)',fontSize:22,fontWeight:700,marginTop:36,marginBottom:14}}>Histórico</h3>
      <div className="panel">
        <div className="panel-body">
          {history.map((h, i) => (
            <div key={i} className="job-row" style={{gridTemplateColumns:'24px 1fr 120px 100px'}}>
              <div style={{width:32,height:32,borderRadius:8,background: h.type==='compra' ? 'var(--vg-green-50)' : 'var(--vg-ink-100)', color: h.type==='compra' ? 'var(--vg-green-700)' : 'var(--vg-fg-2)', display:'flex',alignItems:'center',justifyContent:'center'}}>
                <Icon name={h.type==='compra' ? 'plus' : 'briefcase'} size={14} />
              </div>
              <div>
                <div className="t">{h.label}</div>
                <div className="meta">{h.date}</div>
              </div>
              <div className="meta" style={{fontFamily:'var(--vg-font-mono)',fontSize:12}}>{h.id}</div>
              <div className="num" style={{color: h.type==='compra' ? 'var(--vg-green-700)' : 'var(--vg-fg-2)', textAlign:'right'}}>{h.type==='compra' ? '+' : '−'}{h.qty}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

window.Credits = Credits;
