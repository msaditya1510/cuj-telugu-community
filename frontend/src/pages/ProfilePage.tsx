import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Layout } from "@/components/layout/Layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

import {
ArrowLeft,
Mail,
Phone,
Linkedin,
Instagram,
Globe
} from "lucide-react"

const API_BASE = import.meta.env.VITE_API_URL

export default function ProfilePage(){
    

const { id } = useParams()
const navigate = useNavigate()

const [profile,setProfile] = useState<any>(null)
useEffect(()=>{
if(profile){
document.title = `${profile.name} | CUJ Telugu Community`
}
},[profile])
async function fetchProfile(){

const res = await fetch(`${API_BASE}/api/contact-cards/profile/${id}`,{
credentials:"include"
})

const data = await res.json()

setProfile(data)

}

useEffect(()=>{
fetchProfile()
},[])

if(!profile){

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
className="p-3 rounded-full bg-gray-100 hover:bg-orange-500 hover:text-white transition"
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

const address = [profile.address?.city, profile.address?.district, profile.address?.state]
.filter(Boolean)
.join(", ")

return(

<Layout>

<div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-200">

<div className="max-w-5xl mx-auto p-6 space-y-6">

{/* BACK BUTTON */}

<Button
variant="outline"
className="flex items-center gap-2"
onClick={()=>navigate(-1)}
>

<ArrowLeft size={16}/>
Back

</Button>


{/* PROFILE HEADER */}

<Card className="p-6">

<div className="flex flex-col md:flex-row items-center md:items-start gap-6">

<img
src={profile.photoUrl || "/default-avatar.png"}
className="w-28 h-28 rounded-full object-cover border shadow"
/>

<div className="space-y-1 text-center md:text-left">

<h1 className="text-2xl font-bold">
{profile.name}
</h1>

{profile.preferredName && (
<p className="text-sm text-muted-foreground">
Preferred name: {profile.preferredName}
</p>
)}

{profile.userType && (
<p className="text-sm font-medium">
{profile.userType}
</p>
)}

{profile.department && (
<p className="text-sm text-muted-foreground">
Department: {profile.department}
</p>
)}

{address && (
<p className="text-sm text-muted-foreground">
{address}
</p>
)}

</div>

</div>

</Card>


{/* CONTACT */}

{(profile.email || profile.phone) && (

<Card className="p-6 space-y-4">

<h2 className="text-lg font-semibold border-b pb-2">
Contact
</h2>

{profile.email && (
<div className="flex items-center gap-3 text-sm">
<Mail size={16} className="text-orange-500"/>
<span>{profile.email}</span>
</div>
)}

{profile.phone && (
<div className="flex items-center gap-3 text-sm">
<Phone size={16} className="text-orange-500"/>
<span>{profile.phone}</span>
</div>
)}

</Card>

)}


{/* SOCIAL LINKS */}

{(profile.socialLinks?.linkedin || profile.socialLinks?.instagram || profile.socialLinks?.website) && (

<Card className="p-6">

<h2 className="text-lg font-semibold border-b pb-2 mb-4">
Social Links
</h2>

<div className="flex gap-4">

{profile.socialLinks?.linkedin && (
<SocialIcon link={profile.socialLinks.linkedin}>
<Linkedin size={18}/>
</SocialIcon>
)}

{profile.socialLinks?.instagram && (
<SocialIcon link={profile.socialLinks.instagram}>
<Instagram size={18}/>
</SocialIcon>
)}

{profile.socialLinks?.website && (
<SocialIcon link={profile.socialLinks.website}>
<Globe size={18}/>
</SocialIcon>
)}

</div>

</Card>

)}


{/* BIO */}

{profile.bio && (

<Card className="p-6">

<h2 className="text-lg font-semibold border-b pb-2 mb-3">
Bio
</h2>

<p className="text-sm leading-relaxed text-muted-foreground">
{profile.bio}
</p>

</Card>

)}


{/* STUDENT INFO */}

{profile.userType === "STUDENT" && (

<Card className="p-6 space-y-2">

<h2 className="text-lg font-semibold border-b pb-2">
Student Details
</h2>

{profile.rollNo && <p>Roll No: {profile.rollNo}</p>}

{profile.course && <p>Course: {profile.course}</p>}

{profile.currentYear && <p>Current Year: {profile.currentYear}</p>}

{profile.skills && <p>Skills: {profile.skills}</p>}

{profile.studentAchievements && (
<p>Achievements: {profile.studentAchievements}</p>
)}

</Card>

)}


{/* PROFESSOR INFO */}

{profile.userType === "PROFESSOR" && (

<Card className="p-6 space-y-2">

<h2 className="text-lg font-semibold border-b pb-2">
Professor Details
</h2>

{profile.designation && <p>Designation: {profile.designation}</p>}

{profile.qualifications && (
<p>Qualifications: {profile.qualifications}</p>
)}

{profile.specialization && (
<p>Specialization: {profile.specialization}</p>
)}

{profile.experience && <p>Experience: {profile.experience}</p>}

{profile.researchInterests && (
<p>Research Interests: {profile.researchInterests}</p>
)}

</Card>

)}


{/* ALUMNI INFO */}

{profile.userType === "ALUMNI" && (

<Card className="p-6 space-y-2">

<h2 className="text-lg font-semibold border-b pb-2">
Alumni Details
</h2>

{profile.graduationYear && (
<p>Graduation Year: {profile.graduationYear}</p>
)}

{profile.currentCompany && (
<p>Current Company: {profile.currentCompany}</p>
)}

{profile.currentStatus && (
<p>Current Status: {profile.currentStatus}</p>
)}

{profile.currentLocation && (
<p>Current Location: {profile.currentLocation}</p>
)}

{profile.alumniAchievements && (
<p>Achievements: {profile.alumniAchievements}</p>
)}

</Card>

)}

</div>

</div>

</Layout>

)

}