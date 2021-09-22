import { createContext, Dispatch, ReactNode, useReducer } from 'react'

export type ActionType = {
  type: Actions
  payload?: any
}

export enum Actions {
  TOGGLE_LAPTOP_OPENED,
  SET_BLINKING,
  TOGGLE_SKELETON_MODE,
}

const initialState = {
  isLaptopOpened: false,
  isBlinking: false,
  isSkeletonMode: false,
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
