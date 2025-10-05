import PageContainer from "@/components/layout/PageContainer";
import SEO from "@/components/seo/SEO";

export default function ToolLayout({ title, description, keywords, canonicalPath, children }: { title: string; description: string; keywords?: string[]; canonicalPath: string; children: React.ReactNode; }) {
  return (
    <PageContainer>
      <SEO title={`${title} – Niam Tools`} description={description} keywords={keywords} canonicalPath={canonicalPath} />
      <header className="mx-auto mb-6 max-w-4xl text-center">
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-300">{description}</p>
      </header>
      <div className="mx-auto grid max-w-5xl gap-4">
        {children}
      </div>
    </PageContainer>
  );
}
