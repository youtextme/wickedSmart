import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { AppProvider } from './context/AppContext';
import { FeedbackPage } from './pages/FeedbackPage';
import { KidHome } from './pages/KidHome';
import { MissionPage } from './pages/MissionPage';
import { ParentPage } from './pages/ParentPage';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<KidHome />} />
            <Route path="/mission/:missionId" element={<MissionPage />} />
            <Route path="/feedback" element={<FeedbackPage />} />
            <Route path="/parent" element={<ParentPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AppProvider>
  );
}
