import { createContext, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const API_BASE = import.meta.env.VITE_API_URL

interface AuthContextType {
  user: any
  isAuthenticated: boolean
  isAdmin: boolean
  loadUser: () => Promise<any>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: any) {


  const [user, setUser] = useState<any>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

  async function loadUser(){

    try{

      const res = await fetch(`${API_BASE}/api/users/me`,{
        credentials:"include"
      })

      if(!res.ok){
        setUser(null)
        setIsAuthenticated(false)
        setIsAdmin(false)
        return null
      }

      const data = await res.json()

      setUser({ ...data })
      setIsAuthenticated(true)

      if(data.role === "ADMIN"){
        setIsAdmin(true)
      }else{
        setIsAdmin(false)
      }

      return data

    }catch{

      setUser(null)
      setIsAuthenticated(false)
      setIsAdmin(false)

      return null

    }

  }

  async function logout(){

  try{
    await fetch(`${API_BASE}/logout`,{
      method:"POST",
      credentials:"include"
    })
  }catch{}

  setUser(null)
  setIsAuthenticated(false)
  setIsAdmin(false)

}

  useEffect(()=>{
    loadUser()
  },[])

  return(

    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      isAdmin,
      loadUser,
      logout
    }}>

      {children}

    </AuthContext.Provider>

  )

}

export function useAuth(){

  const context = useContext(AuthContext)

  if(!context){
    throw new Error("useAuth must be used inside AuthProvider")
  }

  return context

}