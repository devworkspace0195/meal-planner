import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './templates/MainLayout/index.jsx';
import SearchPage from './pages/SearchPage.jsx';
import RecipeDetailPage from './pages/RecipeDetailPage.jsx';
import SavedPage from './pages/SavedPage.jsx';
import PlannerPage from './pages/PlannerPage.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Navigate to="/search" replace />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/recipe/:id" element={<RecipeDetailPage />} />
          <Route path="/saved" element={<SavedPage />} />
          <Route path="/planner" element={<PlannerPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
