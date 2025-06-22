export function maskName(name: string): string {
  const length = name.length;

  if (length <= 1) return "x";
  if (length === 2) return `x${name[1]}`;
  if (length === 3) return `${name[0]}x${name[2]}`;
  if (length === 4) return `${name[0]}xx${name[3]}`;
  if (length >= 5) return `${name[0]}xxx${name[length - 1]}`;

  return name;
}
