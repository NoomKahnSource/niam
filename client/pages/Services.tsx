import PageContainer from "@/components/layout/PageContainer";
import BlockRenderer from "@/components/blocks/BlockRenderer";
import { getPageBlocks } from "@/lib/contentStore";
import { getDefaults } from "@/lib/defaultBlocks";

export default function Services() {
  const blocks = getPageBlocks("services", getDefaults("services"));
  return (
    <PageContainer>
      <BlockRenderer blocks={blocks} />
    </PageContainer>
  );
}
