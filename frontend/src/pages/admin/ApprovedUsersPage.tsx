import { useEffect, useState } from "react"
import { Layout } from "@/components/layout/Layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import AdminLayout from "./AdminLayout"

const API_BASE = import.meta.env.VITE_API_URL

interface User {
  id: number
  username: string
  name: string
  department: string
  userType: string
  email: string
}

export default function ApprovedUsersPage(){

const [users,setUsers] = useState<User[]>([])
const [loading,setLoading] = useState(true)

const [page,setPage] = useState(0)
const [totalPages,setTotalPages] = useState(0)

async function fetchUsers(){

try{

setLoading(true)

const res = await fetch(
`${API_BASE}/api/admin/users/approved?page=${page}&size=10`,
{
credentials:"include"
}
)

if(!res.ok){
throw new Error()
}

const data = await res.json()

setUsers(data.content)
setTotalPages(data.totalPages)

}catch{

toast.error("Failed to load users")

}finally{

setLoading(false)

}

}

useEffect(()=>{
fetchUsers()
},[page])

return(

  <AdminLayout>

<div className="flex justify-center p-6">

<Card className="w-full max-w-6xl p-8 space-y-6">

<h1 className="text-2xl font-bold">
Approved Users
</h1>

{loading ? (

<p>Loading users...</p>

) : (

<div className="overflow-x-auto">

<table className="w-full border rounded-lg">

<thead className="bg-muted">

<tr>

<th className="text-left p-3">Name</th>
<th className="text-left p-3">Username</th>
<th className="text-left p-3">Email</th>
<th className="text-left p-3">Type</th>
<th className="text-left p-3">Department</th>

</tr>

</thead>

<tbody>

{users.map(user => (

<tr
key={user.id}
className="border-t hover:bg-muted/40 transition"
>

<td className="p-3">{user.name}</td>
<td className="p-3">{user.username}</td>
<td className="p-3">{user.email}</td>
<td className="p-3">{user.userType}</td>
<td className="p-3">{user.department}</td>

</tr>

))}

</tbody>

</table>

</div>

)}

{/* Pagination */}

<div className="flex justify-between items-center pt-4">

<Button
variant="outline"
disabled={page === 0}
onClick={()=>setPage(page-1)}
>
Previous
</Button>

<p className="text-sm">
Page {page + 1} of {totalPages}
</p>

<Button
variant="outline"
disabled={page + 1 === totalPages}
onClick={()=>setPage(page+1)}
>
Next
</Button>

</div>

</Card>

</div>
</AdminLayout>

)

}