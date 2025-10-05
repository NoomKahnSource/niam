import { useEffect } from "react";

interface SEOProps {
  title: string;
  description?: string;
  keywords?: string[];
  canonicalPath?: string;
}

function ensureMeta(name: string, content: string) {
  let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function ensureLink(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export default function SEO({ title, description, keywords, canonicalPath }: SEOProps) {
  useEffect(() => {
    document.title = title;
    if (description) ensureMeta("description", description);
    if (keywords?.length) ensureMeta("keywords", keywords.join(", "));
    if (canonicalPath) ensureLink("canonical", `${window.location.origin}${canonicalPath}`);
    ensureMeta("viewport", "width=device-width, initial-scale=1");
    ensureMeta("theme-color", "#0f172a");
  }, [title, description, canonicalPath, keywords?.join(",")]);

  return null;
}
