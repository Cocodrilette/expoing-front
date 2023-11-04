export function HeadingText({
  primaryText,
  secondaryText,
  primaryContinuation,
}: {
  primaryText: string;
  secondaryText: string;
  primaryContinuation?: string;
}) {
  return (
    <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
      {primaryText}{" "}
      <span className="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600">
        {secondaryText ?? ""}
      </span>
      {primaryContinuation ?? ""}
    </h1>
  );
}
