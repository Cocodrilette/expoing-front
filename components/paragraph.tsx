export function Paragraph({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={`mb-3 text-gray-500 ${className ?? ""}`}>
      {children}
    </p>
  );
}
