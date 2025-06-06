export function MobileCardTop({
  primaryContent,
  secondaryContent,
  pinText,
}: {
  primaryContent?: string;
  secondaryContent?: string;
  pinText?: string;
}) {
  return (
    <div className="flex justify-between items-start mb-3">
      <div className="flex-1">
        <div className="font-medium text-white text-lg">{primaryContent}</div>
        <div className="text-sm text-custom-gray mt-1">{secondaryContent}</div>
      </div>
      <span className="px-3 py-1 rounded-full text-sm font-medium bg-primary ml-2">
        {pinText}
      </span>
    </div>
  );
}
