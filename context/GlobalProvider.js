import { View, Text } from 'react-native'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { getCurrentUser } from '../lib/appwrite';
import { signIn } from '../lib/appwrite';


const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext)

const GlobalProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    getCurrentUser().then((res) => {
      if (res) {
        setIsLoggedIn(true);
        setUser(res);
      }
    }).catch((error) => console.log(error))
    .finally(setIsLoading(false));
  }, [useGlobalContext])

  return (
    <GlobalContext.Provider value={{
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        isLoading,
        setIsLoading
      }}>
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalProvider;