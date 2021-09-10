export interface Cursor {
  x?: number
  y?: number
}

export interface Blink {
  _isActive: boolean
  isActive: boolean
  timer: number
  blinkX: number
  blinkY: number
}

export enum Effects {
  CONNECTIONS = 'connections',
  BLINK = 'blink',
}

export type EffectsActivity = Record<Effects, boolean>
