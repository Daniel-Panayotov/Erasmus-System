import { Signal, WritableSignal } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

interface BaseButton<T> {
  label: string;
  disabled?: (row: Signal<T | null>) => boolean;
}

interface UrlButton<T> extends BaseButton<T> {
  url: (row: T | null) => string[];
  handler?: never;
}

interface HandlerButton<T> extends BaseButton<T> {
  handler: (row: WritableSignal<T | null>) => void;
  url?: never;
}

export type Button<T> = UrlButton<T> | HandlerButton<T>;

export type DropTarget = 'base' | 'select';

export interface DropEvent<T> {
  drop: CdkDragDrop<T[]>;
  src: DropTarget;
  target: DropTarget;
}
