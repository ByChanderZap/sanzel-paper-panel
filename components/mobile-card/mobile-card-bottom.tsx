export default function MobileCardBottom({
  leftTextHeader,
  leftTextContent,
  middleTextHeader,
  middleTextContent,
  rightTextHeader,
  rightTextContent,
}: {
  leftTextHeader?: string;
  leftTextContent?: string;
  middleTextHeader?: string;
  middleTextContent?: string;
  rightTextHeader?: string;
  rightTextContent?: string;
}) {
  return (
    <div className="grid grid-cols-3 gap-4 text-sm">
      <div>
        <div className="text-custom-gray">{leftTextHeader}</div>
        <div className="text-white font-medium">{leftTextContent}</div>
      </div>
      <div>
        <div className="text-custom-gray">{middleTextHeader}</div>
        <div className="text-white font-medium">{middleTextContent}</div>
      </div>
      <div>
        <div className="text-custom-gray">{rightTextHeader}</div>
        <div className="text-white font-medium">{rightTextContent}</div>
      </div>
    </div>
  );
}
