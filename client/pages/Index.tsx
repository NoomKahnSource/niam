import { DemoResponse } from "@shared/api";
import { useEffect, useState } from "react";
import PageContainer from "@/components/layout/PageContainer";
import { Link } from "react-router-dom";

export default function Index() {
  const [exampleFromServer, setExampleFromServer] = useState("");

  useEffect(() => {
    fetchDemo();
  }, []);

  const fetchDemo = async () => {
    try {
      const response = await fetch("/api/demo");
      const data = (await response.json()) as DemoResponse;
      setExampleFromServer(data.message);
    } catch (error) {
      console.error("Error fetching hello:", error);
    }
  };

  return (
    <PageContainer>
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-3xl font-semibold">Welcome</h1>
        <p className="mt-3 text-slate-600 dark:text-slate-300">
          Explore the sections below and customize copy using the Admin editor.
        </p>
        {exampleFromServer ? (
          <p className="mx-auto mt-4 inline-block rounded-md bg-slate-100 px-3 py-1 text-sm text-slate-700 shadow-sm ring-1 ring-slate-200/70 dark:bg-slate-800 dark:text-slate-200 dark:ring-slate-700">
            {exampleFromServer}
          </p>
        ) : null}
        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {[
            { to: "/about", label: "About" },
            { to: "/services", label: "Services" },
            { to: "/gallery", label: "Gallery" },
            { to: "/blog", label: "Blog" },
            { to: "/contact", label: "Contact" },
            { to: "/admin", label: "Admin" },
          ].map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="rounded-xl border bg-white/70 p-4 text-sm shadow backdrop-blur hover:bg-white/80 dark:border-slate-800 dark:bg-slate-900/60"
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </PageContainer>
  );
}
