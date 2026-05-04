import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProjectPage from './components/ProjectPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project/:slug" element={<ProjectPage />} />
      </Routes>
    </BrowserRouter>
  );
}
