import AdminLayout from "./AdminLayout"
import { Card } from "@/components/ui/card"
import { useEffect, useState } from "react"

export default function AdminDashboard(){

    useEffect(()=>{
document.title = "Community Directory | CUJ Telugu Community"
},[])
return(

<AdminLayout>

<Card className="p-8">

<h1 className="text-2xl font-bold mb-4">
Admin Dashboard
</h1>

<p>
Manage users, events, gallery and community content.
</p>

</Card>

</AdminLayout>

)

}