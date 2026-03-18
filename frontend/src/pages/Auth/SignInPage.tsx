import { useEffect,useState } from "react"
import { useLocation,useNavigate } from "react-router-dom"
import { Layout } from "@/components/layout/Layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { useAuth } from "@/contexts/AuthContext"

const API_BASE = import.meta.env.VITE_API_URL

export default function SignInPage(){

    useEffect(()=>{
document.title = "Sign In Page | CUJ Telugu Community"
},[])
const navigate = useNavigate()
const location = useLocation();

const { loadUser,user } = useAuth()

const [username,setUsername] = useState("")
const [password,setPassword] = useState("")
const [loading,setLoading] = useState(false)

const fromLocation = location.state?.from;

const from =
  fromLocation
    ? fromLocation.pathname + (fromLocation.search || "")
    : null;

async function handleLogin(){

try{

setLoading(true)

const form = new URLSearchParams()

form.append("username",username)
form.append("password",password)

const res = await fetch(`${API_BASE}/login`,{
method:"POST",
body:form,
credentials:"include"
})

if(!res.ok){
throw new Error()
}

const loggedUser = await loadUser()

toast.success("Login successful")

if (from) {
  navigate(from, { replace: true });
} else if (loggedUser?.role === "ADMIN") {
  navigate("/admin", { replace: true });
} else {
  navigate("/", { replace: true });
}

}catch{

toast.error("Invalid username or password")

}finally{

setLoading(false)

}

}

return(

<Layout showFooter={false}>

<div className="min-h-screen flex items-center justify-center p-6">

<Card className="w-full max-w-md p-8 space-y-6 shadow-lg rounded-xl">

<h1 className="text-2xl font-bold text-center">
Sign In
</h1>

<div className="space-y-4">

<div>
<Label>Username</Label>
<Input
placeholder="Enter your username"
value={username}
onChange={(e)=>setUsername(e.target.value)}
/>
</div>

<div>
<Label>Password</Label>
<Input
type="password"
placeholder="Enter your password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
/>
</div>

<Button
className="w-full"
onClick={handleLogin}
disabled={loading}
>

{loading ? "Signing in..." : "Sign In"}

</Button>

</div>

</Card>

</div>

</Layout>

)

}