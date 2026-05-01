import { Outlet } from 'react-router-dom';
import { Navbar } from '../../components/Navbar/index.jsx';
import './MainLayout.css';

export function MainLayout() {
  return (
    <div className="layout">
      <Navbar />
      <main className="layout__content">
        <Outlet />
      </main>
    </div>
  );
}
