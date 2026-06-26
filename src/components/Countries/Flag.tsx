type Props = {
  code: string;
  size?: number;
  className?: string;
};

/**
 * ISO-2 country flag via flagcdn, with a graceful globe fallback when the code
 * is missing. Decorative — hidden from assistive tech.
 */
export default function Flag({ code, size = 32, className }: Props) {
  const height = Math.round((size * 3) / 4);
  if (!code || code.length !== 2) {
    return (
      <span aria-hidden className="grid place-items-center" style={{ width: size, height }}>
        🌍
      </span>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`https://flagcdn.com/${code.toLowerCase()}.svg`}
      alt=""
      aria-hidden
      width={size}
      height={height}
      className={`shrink-0 rounded-[4px] object-cover ring-1 ring-gold/30 ${className ?? ""}`}
      style={{ width: size, height }}
    />
  );
}
