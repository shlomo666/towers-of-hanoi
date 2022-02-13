import { toggleHanging } from './store';

export async function moveTower(from: number, to: number, n: number) {
  if (n === 1) {
    await step(from, to);
  } else {
    const other = 6 - from - to;
    await moveTower(from, other, n - 1);
    await step(from, to);
    await moveTower(other, to, n - 1);
  }
}

async function step(from: number, to: number) {
  await action(from);
  await action(to);
}

function action(n: number) {
  return new Promise<void>((resolve) =>
    setTimeout(() => {
      toggleHanging(n - 1);
      resolve();
    }, 200)
  );
}
