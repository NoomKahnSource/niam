import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import PageContainer from "@/components/layout/PageContainer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <PageContainer>
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <h1 className="mb-2 text-5xl font-bold">404</h1>
          <p className="mb-4 text-slate-600 dark:text-slate-300">Oops! Page not found</p>
          <Link to="/" className="rounded-md bg-slate-900 px-4 py-2 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200">
            Go Home
          </Link>
        </div>
      </div>
    </PageContainer>
  );
};

export default NotFound;
