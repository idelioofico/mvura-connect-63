
import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

type LayoutProps = {
  title: string;
  description?: string;
  children?: React.ReactNode;
};

const Layout = ({ title, description, children }: LayoutProps) => {
  const [mounted, setMounted] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Early return with a simple loading state
  if (!mounted) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-mvura-500 border-r-transparent align-[-0.125em]"></div>
          <p className="mt-2 text-sm text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {!isMobile && <Sidebar />}
      <main className="flex-1 flex flex-col overflow-hidden">
        <Header title={title} description={description} />
        <div className={cn(
          "flex-1 overflow-auto",
          "scrollbar-thin scrollbar-thumb-gray-300",
          "animate-fade-in"
        )}>
          <div className="container py-6 mx-auto">
            {children || <Outlet />}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;
