import React from 'react';

export default function Header({ lang, setLang, t }) {
  return (
    <header className="header">
      <div className="header-left">
        <h1>{t.dashboardTitle}</h1>
        <a href="#" className="home-link">{t.home}</a>
      </div>
      <div className="header-right">
        <button
          onClick={() => setLang('en')}
          className={lang==='en' ? 'active' : ''}
        >EN</button>
        <button
          onClick={() => setLang('fr')}
          className={lang==='fr' ? 'active' : ''}
        >FR</button>
      </div>
    </header>
  );
}
