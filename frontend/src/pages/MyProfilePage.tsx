import { useAuth } from "@/contexts/AuthContext"
import { Layout } from "@/components/layout/Layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

import {
Mail,
Phone,
Linkedin,
Instagram,
Globe,
MapPin,
Edit
} from "lucide-react"

export default function MyProfilePage(){

const { user } = useAuth()
const navigate = useNavigate()

if(!user){

return(
<Layout>
<div className="p-10 text-center">
Loading profile...
</div>
</Layout>
)

}

function SocialIcon({link,children}:{link?:string,children:any}){

if(link){

return(
<a
href={link}
target="_blank"
className="p-3 rounded-full bg-primary text-white hover:scale-110 transition"
>
{children}
</a>
)

}

return(
<div className="p-3 rounded-full bg-gray-200 text-gray-400">
{children}
</div>
)

}

return(

<Layout>

<div className="max-w-4xl mx-auto p-6 space-y-6">

<Card className="p-8">

<div className="flex flex-col md:flex-row gap-8 items-center">

<img
src={user.photoUrl || "/default-avatar.png"}
className="w-32 h-32 rounded-full object-cover border"
/>

<div className="space-y-1">

<h1 className="text-3xl font-bold">
{user.name}
</h1>

<p className="text-sm text-muted-foreground">
{user.userType}
</p>

<p className="text-sm">
{user.department || "Department not provided"}
</p>

<p className="flex items-center gap-2 text-sm text-muted-foreground">
<MapPin size={14}/>
{user.address?.city || "City"},
{user.address?.district || "District"},
{user.address?.state || "State"}
</p>

</div>

<div className="ml-auto">

<Button
onClick={()=>navigate("/profile/edit")}
className="flex items-center gap-2"
>

<Edit size={16}/>
Edit Profile

</Button>

</div>

</div>

</Card>

<Card className="p-6 space-y-3">

<h2 className="text-xl font-semibold">
Contact
</h2>

<div className="flex items-center gap-2">
<Mail size={16}/>
<span>{user.email}</span>
</div>

<div className="flex items-center gap-2">
<Phone size={16}/>
<span>{user.phone || "Not provided"}</span>
</div>

</Card>

<Card className="p-6">

<h2 className="text-xl font-semibold mb-4">
Social Links
</h2>

<div className="flex gap-4">

<SocialIcon link={user.socialLinks?.linkedin}>
<Linkedin size={18}/>
</SocialIcon>

<SocialIcon link={user.socialLinks?.instagram}>
<Instagram size={18}/>
</SocialIcon>

<SocialIcon link={user.socialLinks?.website}>
<Globe size={18}/>
</SocialIcon>

</div>

</Card>

<Card className="p-6">

<h2 className="text-xl font-semibold mb-2">
Bio
</h2>

<p>
{user.bio || "No bio available"}
</p>

</Card>

{/* STUDENT */}

{user.userType==="STUDENT" && (

<Card className="p-6 space-y-2">

<h2 className="text-xl font-semibold">
Student Details
</h2>

<p>Course: {user.course || "Not provided"}</p>

<p>Current Year: {user.currentYear || "Not provided"}</p>

<p>Skills: {user.skills || "Not provided"}</p>

</Card>

)}

{/* PROFESSOR */}

{user.userType==="PROFESSOR" && (

<Card className="p-6 space-y-2">

<h2 className="text-xl font-semibold">
Professor Details
</h2>

<p>Designation: {user.designation || "Not provided"}</p>

<p>Qualifications: {user.qualifications || "Not provided"}</p>

<p>Specialization: {user.specialization || "Not provided"}</p>

<p>Experience: {user.experience || "Not provided"}</p>

</Card>

)}

{/* ALUMNI */}

{user.userType==="ALUMNI" && (

<Card className="p-6 space-y-2">

<h2 className="text-xl font-semibold">
Alumni Details
</h2>

<p>Graduation Year: {user.graduationYear || "Not provided"}</p>

<p>Current Company: {user.currentCompany || "Not provided"}</p>

<p>Current Status: {user.currentStatus || "Not provided"}</p>

</Card>

)}

</div>

</Layout>

)

}