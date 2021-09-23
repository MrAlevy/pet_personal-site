import { createContext, Dispatch, ReactNode, useReducer } from 'react'
import { TEXT } from '../Scene2d/config'

export type ActionType = {
  type: Actions
  payload?: any
}

export enum Actions {
  TOGGLE_LAPTOP_OPENED,
  SET_BLINKING,
  TOGGLE_SKELETON_MODE,
  CHANGE_SCENE_2D_TEXT,
}

const initialState = {
  isLaptopOpened: false,
  isBlinking: false,
  isSkeletonMode: false,
  scene2dText: TEXT,
}

const reducer = (
  state: typeof initialState,
  action: ActionType
): typeof initialState => {
  switch (action.type) {
    case Actions.TOGGLE_LAPTOP_OPENED:
      return { ...state, isLaptopOpened: !state.isLaptopOpened }
    case Actions.SET_BLINKING:
      return { ...state, isBlinking: action.payload }
    case Actions.TOGGLE_SKELETON_MODE:
      return { ...state, isSkeletonMode: !state.isSkeletonMode }
    case Actions.CHANGE_SCENE_2D_TEXT:
      return { ...state, scene2dText: action.payload }
    default:
      throw new Error(`Unknown action: ${action.type}`)
  }
}

export const Context = createContext<typeof initialState>(initialState)

export const DispatchContext = createContext<Dispatch<ActionType> | undefined>(
  undefined
)

export const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <DispatchContext.Provider value={dispatch}>
      <Context.Provider value={state}>{children}</Context.Provider>
    </DispatchContext.Provider>
  )
}
