import { Signal, WritableSignal } from '@angular/core';

interface BaseButton<T> {
  label: string;
  disabled?: (row: Signal<T>) => boolean;
}

interface UrlButton<T> extends BaseButton<T> {
  url: (row: T) => string[];
  handler?: never;
}

interface HandlerButton<T> extends BaseButton<T> {
  handler: (row: WritableSignal<T>) => void;
  url?: never;
}

export type Button<T> = UrlButton<T> | HandlerButton<T>;
