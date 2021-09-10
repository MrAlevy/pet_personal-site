import { useContext } from 'react'
import { Context, DispatchContext, Actions } from './Context'

export default function useContextCustomHook() {
  const dispatch = useContext(DispatchContext)
  return {
    context: useContext(Context),
    dispatch: (action: { type: Actions }) => dispatch && dispatch(action),
  }
}
