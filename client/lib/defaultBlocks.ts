import { Block } from "@/lib/contentStore";

export function getDefaults(page: string): Block[] {
  const map: Record<string, Block[]> = {
    home: [
      { id: "hero", type: "hero", props: { title: "Fast, free developer tools", subtitle: "Format JSON, test regex, generate UUIDs, and more — all in your browser.", primaryLabel: "Browse Tools", primaryHref: "/tools", secondaryLabel: "View Pricing", secondaryHref: "/pricing" } },
      { id: "stats", type: "stats", props: { items: [ { label: "Tools", value: "25+" }, { label: "Latency", value: "0ms" }, { label: "Privacy", value: "100% Local" } ] } },
      { id: "features", type: "features", props: { title: "Why Niam Tools?", items: ["No sign-up for free tools","Runs locally in your browser","Accessible and mobile-friendly","Dark-mode ready UI","SEO-friendly pages","Regular new tools added"] } },
      { id: "marquee", type: "marquee", props: { items: ["JSON","Regex","UUID","Contrast","Passwords","Epoch","Counter","Cases"] } },
      { id: "testimonial", type: "testimonial", props: { quote: "Exactly the quick utilities I need during development.", author: "Frontend Engineer" } },
      { id: "cta", type: "cta", props: { title: "Go Pro for premium tools", description: "Unlock text diff, JWT decoder, epoch converter, and more.", buttonLabel: "See Pricing", buttonHref: "/pricing" } },
    ],
    about: [
      { id: "hero", type: "hero", props: { title: "About Us", subtitle: "Our mission and values" } },
      { id: "text1", type: "text", props: { text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." } },
      { id: "faq", type: "faq", props: { items: [ { q: "What is this?", a: "A modern, animated site starter." }, { q: "Can I customize it?", a: "Yes, via the Admin panel blocks." } ] } },
    ],
    services: [
      { id: "hero", type: "hero", props: { title: "Services", subtitle: "What we offer" } },
      { id: "grid", type: "features", props: { title: "Core services", items: ["Design","Development","Consulting","Audits","Optimization","Training"] } },
      { id: "pricing", type: "pricing", props: { plans: [ { name: "Starter", price: "$19", features: ["1 project","Email support"], ctaLabel: "Choose", ctaHref: "/contact" }, { name: "Pro", price: "$49", features: ["Unlimited projects","Priority support"], ctaLabel: "Choose", ctaHref: "/contact" }, { name: "Enterprise", price: "Custom", features: ["SLA","Dedicated team"], ctaLabel: "Talk to us", ctaHref: "/contact" } ] } },
      { id: "cta", type: "cta", props: { title: "Need something custom?", description: "Tell us about your project.", buttonLabel: "Contact us", buttonHref: "/contact" } },
    ],
    gallery: [
      { id: "hero", type: "hero", props: { title: "Gallery", subtitle: "Snapshots of our work" } },
      { id: "marquee", type: "marquee", props: { items: ["Branding","Web","Illustration","3D","Motion","Photography"] } },
      { id: "text", type: "text", props: { text: "Quisque consequat sapien ut leo cursus rhoncus." } },
    ],
    blog: [
      { id: "hero", type: "hero", props: { title: "Blog", subtitle: "Thoughts and updates" } },
      { id: "post1", type: "text", props: { text: "Curabitur blandit tempus porttitor." } },
      { id: "post2", type: "text", props: { text: "Nullam quis risus eget urna mollis ornare vel eu leo." } },
      { id: "post3", type: "text", props: { text: "Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum." } },
      { id: "cta", type: "cta", props: { title: "Subscribe for more", description: "No spam, just the good stuff.", buttonLabel: "Contact", buttonHref: "/contact" } },
    ],
    contact: [
      { id: "hero", type: "hero", props: { title: "Contact", subtitle: "We usually reply within a day" } },
      { id: "text1", type: "text", props: { text: "123 Anywhere St, Anytown, Planet." } },
      { id: "faq", type: "faq", props: { items: [ { q: "How do I reach you?", a: "Use the contact form or email us." }, { q: "Do you take custom work?", a: "Yes, let's chat." } ] } },
      { id: "cta", type: "cta", props: { title: "Email us", description: "Reach out with your ideas.", buttonLabel: "Open Admin", buttonHref: "/admin" } },
    ],
  };
  return map[page] ?? [];
}
