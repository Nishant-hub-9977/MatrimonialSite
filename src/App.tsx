import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { UserProvider } from './contexts/UserContext';
import ErrorBoundary from './components/common/ErrorBoundary';
import PrivateRoute from './components/auth/PrivateRoute';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';

// Lazy load routes for better performance
const Login = React.lazy(() => import('./pages/Login'));
const Register = React.lazy(() => import('./pages/Register'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Profiles = React.lazy(() => import('./pages/Profiles'));
const ProfileDetail = React.lazy(() => import('./pages/ProfileDetail'));
const Settings = React.lazy(() => import('./pages/Settings'));
const NotFound = React.lazy(() => import('./pages/NotFound'));

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <Router>
            <div className="flex flex-col min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
              <Navbar />
              <main className="flex-grow">
                <Suspense
                  fallback={
                    <div className="flex justify-center items-center h-screen">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
                    </div>
                  }
                >
                  <Routes>
                    {/* Public routes */}
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/profiles" element={<Profiles />} />
                    <Route path="/profile/:id" element={<ProfileDetail />} />

                    {/* Protected routes */}
                    <Route element={<PrivateRoute />}>
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/settings" element={<Settings />} />
                    </Route>

                    {/* Catch-all route */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </main>
              <Footer />
            </div>
            <Toaster position="top-center" />
          </Router>
        </UserProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;