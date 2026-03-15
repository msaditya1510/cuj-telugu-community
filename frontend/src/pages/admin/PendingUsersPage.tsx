import { useEffect, useState } from "react"
import AdminLayout from "./AdminLayout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

const API_BASE = import.meta.env.VITE_API_URL

export default function PendingUsersPage(){

const [users,setUsers] = useState<any[]>([])
const [loading,setLoading] = useState(true)

async function fetchUsers(){

try{

const res = await fetch(`${API_BASE}/api/admin/users/pending?page=0&size=10`,{
credentials:"include"
})

const data = await res.json()

setUsers(data.content)

}catch{

toast.error("Failed to fetch users")

}finally{

setLoading(false)

}

}

useEffect(()=>{
fetchUsers()
},[])

async function approveUser(id:number){

try{

await fetch(`${API_BASE}/api/admin/users/${id}/approve`,{
method:"PATCH",
credentials:"include"
})

toast.success("User approved")

setUsers(users.filter(u => u.id !== id))

}catch{

toast.error("Approval failed")

}

}

async function rejectUser(id:number){

try{

await fetch(`${API_BASE}/api/admin/users/${id}/reject`,{
method:"PATCH",
credentials:"include"
})

toast.success("User rejected")

setUsers(users.filter(u => u.id !== id))

}catch{

toast.error("Rejection failed")

}

}

return(

<AdminLayout>

<div className="p-6 flex justify-center">

<Card className="w-full max-w-5xl p-6">

<h1 className="text-2xl font-bold mb-6">
Pending User Approvals
</h1>

{loading ? (

<p>Loading users...</p>

):(

<table className="w-full border">

<thead className="bg-gray-100">

<tr>
<th className="p-3 text-left">Name</th>
<th className="p-3 text-left">Username</th>
<th className="p-3 text-left">Role</th>
<th className="p-3 text-left">Department</th>
<th className="p-3 text-left">Actions</th>
</tr>

</thead>

<tbody>

{users.map(user => (

<tr key={user.id} className="border-t">

<td className="p-3">{user.name}</td>
<td className="p-3">{user.userName}</td>
<td className="p-3">{user.userType}</td>
<td className="p-3">{user.department}</td>

<td className="p-3 flex gap-2">

<Button
onClick={()=>approveUser(user.id)}
className="bg-green-600 hover:bg-green-700"
>
Approve
</Button>

<Button
variant="destructive"
onClick={()=>rejectUser(user.id)}
>
Reject
</Button>

</td>

</tr>

))}

</tbody>

</table>

)}

</Card>

</div>

</AdminLayout>

)

}