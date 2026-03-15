import { Link, useLocation } from "react-router-dom"

export default function AdminSidebar(){

const location = useLocation()

function isActive(path:string){
return location.pathname === path
}

return(

<div className="w-64 border-r bg-muted/20 p-6 space-y-6">

<h2 className="text-xl font-bold">
Admin Panel
</h2>

<nav className="flex flex-col gap-3">

<Link
to="/admin/pending-users"
className={`p-2 rounded ${
isActive("/admin/pending-users") ? "bg-accent" : ""
}`}
>
Pending Users
</Link>

<Link
to="/admin/approved-users"
className={`p-2 rounded ${
isActive("/admin/approved-users") ? "bg-accent" : ""
}`}
>
Approved Users
</Link>

<Link
to="/admin/events"
className={`p-2 rounded ${
isActive("/admin/events") ? "bg-accent" : ""
}`}
>
Manage Events
</Link>

<Link
to="/admin/gallery"
className={`p-2 rounded ${
isActive("/admin/gallery") ? "bg-accent" : ""
}`}
>
Gallery Upload
</Link>

</nav>

</div>

)

}