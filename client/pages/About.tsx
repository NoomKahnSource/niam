import PageContainer from "@/components/layout/PageContainer";
import BlockRenderer from "@/components/blocks/BlockRenderer";
import { getPageBlocks } from "@/lib/contentStore";
import { getDefaults } from "@/lib/defaultBlocks";

export default function About() {
  const blocks = getPageBlocks("about", getDefaults("about"));
  return (
    <PageContainer>
      <BlockRenderer blocks={blocks} />
    </PageContainer>
  );
}
