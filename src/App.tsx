import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ContentProvider, useContent } from '@/context/ContentContext';
import MainWebsite from './MainWebsite';
import AdminLogin from './admin/AdminLogin';
import AdminDashboard from './admin/AdminDashboard';
import Overview from './admin/Overview';
import GalleryManager from './admin/GalleryManager';
import ContentEditor from './admin/ContentEditor';
import Settings from './admin/Settings';
import Submissions from './admin/Submissions';
import './App.css';

// Protected route component for admin
const ProtectedAdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useContent();
  
  if (!isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }
  
  return <>{children}</>;
};

function App() {
  return (
    <ContentProvider>
      <BrowserRouter>
        <Routes>
          {/* Main Website - all routes */}
          <Route path="/*" element={<MainWebsite />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedAdminRoute>
                <AdminDashboard />
              </ProtectedAdminRoute>
            }
          >
            <Route index element={<Overview />} />
            <Route path="gallery" element={<GalleryManager />} />
            <Route path="content" element={<ContentEditor />} />
            <Route path="submissions" element={<Submissions />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ContentProvider>
  );
}

export default App;
