import HeroBlock, { HeroProps } from "./HeroBlock";
import TextBlock, { TextProps } from "./TextBlock";
import FeatureGridBlock, { FeatureGridProps } from "./FeatureGridBlock";
import CTASectionBlock, { CTAProps } from "./CTASectionBlock";
import TestimonialBlock, { TestimonialProps } from "./TestimonialBlock";
import PricingTableBlock, { PricingTableProps } from "./PricingTableBlock";
import FAQBlock, { FAQProps } from "./FAQBlock";
import StatsBlock, { StatsProps } from "./StatsBlock";
import MarqueeBlock, { MarqueeProps } from "./MarqueeBlock";
import { Block } from "@/lib/contentStore";

export default function BlockRenderer({ blocks }: { blocks: Block[] }) {
  return (
    <div className="grid gap-6">
      {blocks.map((b) => {
        switch (b.type) {
          case "hero":
            return <HeroBlock key={b.id} {...(b.props as HeroProps)} />;
          case "text":
            return <TextBlock key={b.id} {...(b.props as TextProps)} />;
          case "features":
            return <FeatureGridBlock key={b.id} {...(b.props as FeatureGridProps)} />;
          case "cta":
            return <CTASectionBlock key={b.id} {...(b.props as CTAProps)} />;
          case "testimonial":
            return <TestimonialBlock key={b.id} {...(b.props as TestimonialProps)} />;
          case "pricing":
            return <PricingTableBlock key={b.id} {...(b.props as PricingTableProps)} />;
          case "faq":
            return <FAQBlock key={b.id} {...(b.props as FAQProps)} />;
          case "stats":
            return <StatsBlock key={b.id} {...(b.props as StatsProps)} />;
          case "marquee":
            return <MarqueeBlock key={b.id} {...(b.props as MarqueeProps)} />;
          default:
            return <div key={b.id} className="rounded-md border p-4 text-sm opacity-70">Unknown block: {b.type}</div>;
        }
      })}
    </div>
  );
}
