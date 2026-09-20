export default function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`${className || ""} mx-auto w-full max-w-[1250px] px-4 md:px-6 lg:px-10`}
    >
      {children}
    </div>
  );
}
