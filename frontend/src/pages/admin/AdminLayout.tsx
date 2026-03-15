import { ReactNode } from "react"
import { Layout } from "@/components/layout/Layout"
import AdminSidebar from "@/components/admin/AdminSidebar"

interface Props{
children:ReactNode
}

export default function AdminLayout({children}:Props){

return(

<Layout>

<div className="flex min-h-screen">

<AdminSidebar/>

<div className="flex-1 p-8">

{children}

</div>

</div>

</Layout>

)

}