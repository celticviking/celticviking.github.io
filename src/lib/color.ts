// Mix two hex colours: t = 0 gives a, t = 1 gives b.
export function mixHex(a: string, b: string, t: number): string {
  const rgb = (h: string) => [1, 3, 5].map((i) => parseInt(h.replace('#', '').padStart(6, '0').slice(i - 1, i + 1), 16));
  const [x, y] = [rgb(a), rgb(b)];
  return '#' + x.map((v, i) => Math.round(v * (1 - t) + y[i] * t).toString(16).padStart(2, '0')).join('').toUpperCase();
}
