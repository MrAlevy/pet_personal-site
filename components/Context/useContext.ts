import { useContext } from 'react'
import { ActionType, Context, DispatchContext } from './Context'

export default function useContextCustomHook() {
  const dispatch = useContext(DispatchContext)
  return {
    context: useContext(Context),
    dispatch: (action: ActionType) => dispatch && dispatch(action),
  }
}
