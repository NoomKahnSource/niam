import PageContainer from "@/components/layout/PageContainer";
import BlockRenderer from "@/components/blocks/BlockRenderer";
import { getPageBlocks } from "@/lib/contentStore";
import { getDefaults } from "@/lib/defaultBlocks";

export default function Blog() {
  const blocks = getPageBlocks("blog", getDefaults("blog"));
  return (
    <PageContainer>
      <BlockRenderer blocks={blocks} />
    </PageContainer>
  );
}
