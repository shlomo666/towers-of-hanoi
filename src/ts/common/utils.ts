import { max } from './consts';

const availableColors = 2 ** 24;
export function randColor(n: number) {
  const color = Math.floor(availableColors * (n / max))
    .toString(16)
    .padStart(6, '0');
  return `#${color}`;
}
