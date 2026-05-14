// Shared icons — inline SVG, Lucide-style stroke 1.75
const Icon = ({ name, size = 18, color = 'currentColor' }) => {
  const s = { width: size, height: size, stroke: color, fill: 'none', strokeWidth: 1.75, strokeLinecap: 'round', strokeLinejoin: 'round' };
  const map = {
    home: <svg viewBox="0 0 24 24" {...s}><path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/></svg>,
    briefcase: <svg viewBox="0 0 24 24" {...s}><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>,
    users: <svg viewBox="0 0 24 24" {...s}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    coin: <svg viewBox="0 0 24 24" {...s}><circle cx="12" cy="12" r="9"/><path d="M14 9a3 3 0 0 0-6 0c0 4 6 2 6 6a3 3 0 0 1-6 0"/><path d="M12 6v12"/></svg>,
    settings: <svg viewBox="0 0 24 24" {...s}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 0 1-4 0v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 0 1 0-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3h0a1.7 1.7 0 0 0 1-1.5V3a2 2 0 0 1 4 0v.1a1.7 1.7 0 0 0 1 1.5h0a1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8v0a1.7 1.7 0 0 0 1.5 1H21a2 2 0 0 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>,
    search: <svg viewBox="0 0 24 24" {...s}><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>,
    bell: <svg viewBox="0 0 24 24" {...s}><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/></svg>,
    plus: <svg viewBox="0 0 24 24" {...s}><path d="M12 5v14M5 12h14"/></svg>,
    chevronDown: <svg viewBox="0 0 24 24" {...s}><polyline points="6 9 12 15 18 9"/></svg>,
    arrowRight: <svg viewBox="0 0 24 24" {...s}><path d="M5 12h14M12 5l7 7-7 7"/></svg>,
    arrowLeft: <svg viewBox="0 0 24 24" {...s}><path d="M19 12H5M12 19l-7-7 7-7"/></svg>,
    mapPin: <svg viewBox="0 0 24 24" {...s}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
    check: <svg viewBox="0 0 24 24" {...s}><polyline points="20 6 9 17 4 12"/></svg>,
    eye: <svg viewBox="0 0 24 24" {...s}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
    trending: <svg viewBox="0 0 24 24" {...s}><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
    clock: <svg viewBox="0 0 24 24" {...s}><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 16 14"/></svg>,
    leaf: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{width:size,height:size}}><path d="M6 6 L12 18 L18 6"/><path d="M12 18 L12 22"/></svg>,
  };
  return map[name] || null;
};

window.Icon = Icon;
