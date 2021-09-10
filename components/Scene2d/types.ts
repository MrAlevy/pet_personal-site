export interface Cursor {
  x?: number
  y?: number
}

export interface Blink {
  timer: number
  isActive: boolean
  blinkX: number
  blinkY: number
}

export enum Effects {
  CONNECTIONS = 'connections',
  BLINK = 'blink',
}

export type EffectsActivity = Record<Effects, boolean>
