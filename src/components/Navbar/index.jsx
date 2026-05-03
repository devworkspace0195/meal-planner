import { NavLink } from 'react-router-dom';
import t from '../../locales/en.js';
import './Navbar.css';

export function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar__inner">
        <span className="navbar__brand">{t.nav.brand}</span>
        <ul className="navbar__links">
          <li><NavLink to="/search">{t.nav.search}</NavLink></li>
          <li><NavLink to="/ingredients">{t.nav.ingredients}</NavLink></li>
          <li><NavLink to="/saved">{t.nav.saved}</NavLink></li>
          <li><NavLink to="/planner">{t.nav.planner}</NavLink></li>
        </ul>
      </div>
    </nav>
  );
}
