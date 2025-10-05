import PageContainer from "@/components/layout/PageContainer";
import BlockRenderer from "@/components/blocks/BlockRenderer";
import { getPageBlocks } from "@/lib/contentStore";
import { getDefaults } from "@/lib/defaultBlocks";

export default function Gallery() {
  const blocks = getPageBlocks("gallery", getDefaults("gallery"));
  return (
    <PageContainer>
      <BlockRenderer blocks={blocks} />
    </PageContainer>
  );
}
