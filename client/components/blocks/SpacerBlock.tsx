export type SpacerProps = { height?: number };
export default function SpacerBlock({ height = 24 }: SpacerProps) {
  return <div style={{ height }} />;
}
