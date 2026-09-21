export default function ImageFrame({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) {
  return (
    <div
      className={`${className || ""} w-full rounded-2xl border border-slate-700 bg-slate-800 p-2`}
    >
      {children}
    </div>
  );
}
