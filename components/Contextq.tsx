import { createContext, ReactChildren, useContext, useState } from 'react'

//@ts-ignore
export const Context = createContext()

export function AppWrapper({ children }: { children: ReactChildren }) {
  // let sharedState = {
  //   isLaptopOpened: false,
  //   toggleIsLaptopOpened: () => {},
  // }
  const [isLoading, setIsLoading] = useState(false)

  return (
    <Context.Provider
      value={{
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export default AppWrapper

// export function useAppContext() {
//   return useContext(AppContext)
// }
