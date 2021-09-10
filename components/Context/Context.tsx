import { createContext, Dispatch, ReactNode, useReducer } from 'react'

export enum Actions {
  TOGGLE_LAPTOP_OPENED = 'toggle_laptop_opened',
}

const initialState = {
  isLaptopOpened: false,
}

export const Context = createContext<typeof initialState>(initialState)
export const DispatchContext = createContext<
  Dispatch<{ type: Actions }> | undefined
>(undefined)

const reducer = (state: typeof initialState, action: { type: Actions }) => {
  switch (action.type) {
    case Actions.TOGGLE_LAPTOP_OPENED:
      return { ...state, isLaptopOpened: !state.isLaptopOpened }
    default:
      throw new Error(`Unknown action: ${action.type}`)
  }
}

export const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <DispatchContext.Provider value={dispatch}>
      <Context.Provider value={state}>{children}</Context.Provider>
    </DispatchContext.Provider>
  )
}
