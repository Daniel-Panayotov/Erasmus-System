import { WritableSignal } from '@angular/core';
import { moveItemInArray } from '@angular/cdk/drag-drop';

export function insertInArraySignalAt<T>(signal: WritableSignal<T[]>, item: T, index: number) {
  const list = signal();
  //We will be adding an element, thats why I accound for it with + 1
  if (index > list.length) throw Error();

  list.push(item);
  moveItemInArray(list, list.length - 1, index);
  signal.set([...list]);
}

export function removeFromArraySignalAt<T>(signal: WritableSignal<T[]>, index: number): T {
  const list = signal();
  if (index > list.length - 1) throw Error();

  const item = list.splice(index, 1)[0];
  signal.set([...list]);
  return item;
}

export function moveBetweenSignalArrays<T>(
  src: WritableSignal<T[]>,
  target: WritableSignal<T[]>,
  srcIndex: number,
  targetIndex: number,
) {
  const item = removeFromArraySignalAt(src, srcIndex);
  insertInArraySignalAt(target, item, targetIndex);
}
