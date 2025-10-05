import { Link } from "react-router-dom";
import PageContainer from "@/components/layout/PageContainer";
import SEO from "@/components/seo/SEO";

const categories = [
  {
    name: "Developer Tools",
    items: [
      { to: "/tools/json-formatter", label: "JSON Formatter / Beautifier" },
      { to: "/tools/base64", label: "Base64 Encoder / Decoder" },
      { to: "/tools/regex-tester", label: "Regex Tester" },
      { to: "/tools/uuid-generator", label: "UUID Generator" },
      { to: "/tools/jwt-decoder", label: "JWT Decoder (Pro)" },
      { to: "/tools/text-diff", label: "Text Diff Checker (Pro)" },
    ],
  },
  {
    name: "Design & Color",
    items: [
      { to: "/tools/color-contrast", label: "Color Contrast Checker" },
      { to: "/tools/hex-rgb", label: "Hex ⇄ RGB Converter" },
    ],
  },
  {
    name: "Text & Content",
    items: [
      { to: "/tools/word-counter", label: "Word / Character Counter" },
      { to: "/tools/text-case", label: "Text Case Converter" },
      { to: "/tools/remove-whitespace", label: "Remove Line Breaks / Whitespace" },
      { to: "/tools/reverse-text", label: "Reverse Text" },
      { to: "/tools/lorem-ipsum", label: "Lorem Ipsum Generator" },
    ],
  },
  {
    name: "Utility",
    items: [
      { to: "/tools/password-generator", label: "Password Generator (Pro)" },
      { to: "/tools/epoch-time", label: "Epoch Time Converter (Pro)" },
    ],
  },
];

export default function Tools() {
  return (
    <PageContainer>
      <SEO title="Developer Tools – Niam Tools" description="A collection of fast, free, and useful developer tools. JSON formatter, Base64, regex tester, color contrast, and more." canonicalPath="/tools" keywords={["developer tools","json formatter","regex","base64","uuid","word counter"]} />
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight">Developer Tools</h1>
          <p className="mt-2 text-slate-600 dark:text-slate-300">Solve tasks in seconds. No sign-up for free tools.</p>
        </header>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <section key={c.name} className="rounded-2xl border bg-white/70 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
              <h2 className="mb-3 text-lg font-semibold">{c.name}</h2>
              <ul className="grid gap-2 text-sm">
                {c.items.map((it) => (
                  <li key={it.to}>
                    <Link to={it.to} className="group inline-flex items-center justify-between rounded-md border px-3 py-2 hover:bg-slate-100 dark:border-slate-800 dark:hover:bg-slate-800">
                      <span>{it.label}</span>
                      <span className="text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-200">→</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </PageContainer>
  );
}
