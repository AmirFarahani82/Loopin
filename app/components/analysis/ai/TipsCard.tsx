type TipsCardPropt = {
  type: "highlight" | "warning";
  content: string;
};
export function TipsCard({ type, content }: TipsCardPropt) {
  const highlightStyle =
    " shadow-highlight border-emerald-500/40 bg-emerald-500/10 text-emerald-400 ";
  const warningStyle =
    " shadow-warning  border-amber-500/40 bg-amber-500/10 text-amber-400 ";

  if (content.length === 0) return null;
  return (
    <div
      className={`mt-4 rounded-md border p-4 text-center text-sm ${type === "highlight" ? highlightStyle : warningStyle} `}
    >
      <p>{content}</p>
    </div>
  );
}
