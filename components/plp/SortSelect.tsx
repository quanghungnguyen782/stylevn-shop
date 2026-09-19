export function SortSelect<T extends string>({
  value,
  onChange,
  options,
}: {
  value: T;
  onChange: (value: T) => void;
  options: Record<T, string>;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as T)}
      className="border border-line bg-canvas px-3 py-2 text-sm outline-none focus:border-ink"
      aria-label="Sắp xếp"
    >
      {Object.entries(options).map(([key, label]) => (
        <option key={key} value={key}>
          {label as string}
        </option>
      ))}
    </select>
  );
}
