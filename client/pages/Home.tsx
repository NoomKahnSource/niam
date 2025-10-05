import PageContainer from "@/components/layout/PageContainer";
import BlockRenderer from "@/components/blocks/BlockRenderer";
import { getPageBlocks } from "@/lib/contentStore";
import { getDefaults } from "@/lib/defaultBlocks";

export default function Home() {
  const blocks = getPageBlocks("home", getDefaults("home"));
  return (
    <PageContainer>
      <BlockRenderer blocks={blocks} />
    </PageContainer>
  );
}
