import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from './components/ProtectedRoute';
import { Navigation } from './components/Navigation';
import { useAuth } from './hooks/useAuth';

// Pages
import Index from "./pages/Index";
import Clients from "./pages/Clients";
import Tickets from "./pages/Tickets";
import Reports from "./pages/Reports";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Unauthorized from "./pages/Unauthorized";

const queryClient = new QueryClient();

const App = () => {
  const { isAuthenticated } = useAuth();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          {isAuthenticated && (
            <header className="bg-white shadow">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Navigation />
              </div>
            </header>
          )}
          
          <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/unauthorized" element={<Unauthorized />} />
              
              <Route path="/" element={
                <ProtectedRoute requiredPermission="view_reports">
                  <Index />
                </ProtectedRoute>
              } />
              
              <Route path="/clientes" element={
                <ProtectedRoute requiredPermission="view_clients">
                  <Clients />
                </ProtectedRoute>
              } />
              
              <Route path="/chamados" element={
                <ProtectedRoute requiredPermission="manage_tickets">
                  <Tickets />
                </ProtectedRoute>
              } />
              
              <Route path="/relatorios" element={
                <ProtectedRoute requiredPermission="view_reports">
                  <Reports />
                </ProtectedRoute>
              } />
              
              <Route path="/usuarios" element={
                <ProtectedRoute requiredPermission="manage_users">
                  <Users />
                </ProtectedRoute>
              } />
              
              <Route path="/configuracoes" element={
                <ProtectedRoute requiredPermission="manage_settings">
                  <Settings />
                </ProtectedRoute>
              } />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
