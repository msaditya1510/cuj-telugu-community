import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Layout } from "@/components/layout/Layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useAuth } from "@/contexts/AuthContext"
import { toast } from "sonner"

const API_BASE = import.meta.env.VITE_API_URL

export default function EditProfilePage(){

const { user,loadUser } = useAuth()
const navigate = useNavigate()

const [form,setForm]=useState<any>({})
const [photo,setPhoto]=useState<File | null>(null)

useEffect(()=>{

if(!user) return

setForm({

name:user.name ?? "",
preferredName:user.preferredName ?? "",
email:user.email ?? "",
phone:user.phone ?? "",
department:user.department ?? "",
bio:user.bio ?? "",

state:user.address?.state ?? "",
district:user.address?.district ?? "",
city:user.address?.city ?? "",

linkedin:user.socialLinks?.linkedin ?? "",
instagram:user.socialLinks?.instagram ?? "",
website:user.socialLinks?.website ?? "",

rollNo:user.rollNo ?? "",
course:user.course ?? "",
currentYear:user.currentYear ?? "",
skills:user.skills ?? "",
studentAchievements:user.studentAchievements ?? "",

designation:user.designation ?? "",
qualifications:user.qualifications ?? "",
specialization:user.specialization ?? "",
experience:user.experience ?? "",
researchInterests:user.researchInterests ?? "",

graduationYear:user.graduationYear ?? "",
currentCompany:user.currentCompany ?? "",
currentStatus:user.currentStatus ?? "",
currentLocation:user.currentLocation ?? "",
alumniAchievements:user.alumniAchievements ?? ""

})

},[user])

function change(field:string,value:any){

setForm((prev:any)=>({
...prev,
[field]:value
}))

}

function validate(){

if(!form.name || form.name.length<2 || form.name.length>100){
toast.error("Name must be 2–100 characters")
return false
}

if(!form.preferredName || form.preferredName.length<2 || form.preferredName.length>100){
toast.error("Preferred name must be 2–100 characters")
return false
}

if(!/^[6-9]\d{9}$/.test(form.phone)){
toast.error("Enter a valid Indian phone number")
return false
}

if(!form.bio || form.bio.length<10 || form.bio.length>300){
toast.error("Bio must be between 10 and 300 characters")
return false
}

if(user.userType==="STUDENT"){

if(!/^[2][0-9]{10}$/.test(form.rollNo)){
toast.error("Roll number must be 11 digits starting with 2")
return false
}

if(form.currentYear<1 || form.currentYear>5){
toast.error("Year must be between 1 and 5")
return false
}

}

if(user.userType==="PROFESSOR"){

if(!form.designation){
toast.error("Designation required")
return false
}

if(!form.qualifications){
toast.error("Qualifications required")
return false
}

}

if(user.userType==="ALUMNI"){

if(!form.graduationYear || form.graduationYear<2000){
toast.error("Graduation year must be from 2000 onwards")
return false
}

if(!form.currentStatus){
toast.error("Current status required")
return false
}

}

return true

}

async function submit(){

if(!validate()) return

try{

const payload={

userName:user.userName,

name:form.name,
preferredName:form.preferredName,
email:form.email,
phone:form.phone,
department:form.department,
bio:form.bio,

address:{
state:form.state,
district:form.district,
city:form.city
},

socialLinks:{
linkedin:form.linkedin,
instagram:form.instagram,
website:form.website
},

rollNo:form.rollNo,
course:form.course,
currentYear:form.currentYear,
skills:form.skills,
studentAchievements:form.studentAchievements,

designation:form.designation,
qualifications:form.qualifications,
specialization:form.specialization,
experience:form.experience,
researchInterests:form.researchInterests,

graduationYear:form.graduationYear,
currentCompany:form.currentCompany,
currentStatus:form.currentStatus,
currentLocation:form.currentLocation,
alumniAchievements:form.alumniAchievements

}

const res=await fetch(`${API_BASE}/api/users/me`,{
method:"PUT",
credentials:"include",
headers:{ "Content-Type":"application/json" },
body:JSON.stringify(payload)
})

if(!res.ok) throw new Error()

if(photo){

const fd=new FormData()
fd.append("file",photo)

await fetch(`${API_BASE}/api/users/me/photo`,{
method:"PUT",
credentials:"include",
body:fd
})

}

await loadUser()

toast.success("Profile updated")

navigate("/profile")

}catch{

toast.error("Update failed")

}

}

if(!user){

return( <Layout>

<div className="p-10 text-center">Loading profile...</div>
</Layout>
)

}

return(

<Layout>

<div className="w-full max-w-4xl mx-auto px-4 md:px-6 py-6 space-y-6">

<h1 className="text-2xl md:text-3xl font-bold">
Edit Profile
</h1>

<Card className="p-6 flex flex-col md:flex-row items-center gap-6 w-full">

<img
src={user.photoUrl || "/default-avatar.png"}
className="w-20 h-20 rounded-full object-cover border"
/>

<div className="w-full">

<Label>Profile Photo</Label>

<Input
type="file"
onChange={(e)=>setPhoto(e.target.files?.[0] || null)}
/>

</div>

</Card>

<Card className="p-6 space-y-4">

<h2 className="text-xl font-semibold">
Basic Information
</h2>

<div className="grid grid-cols-1 md:grid-cols-2 gap-4">

<div>
<Label>Name</Label>
<Input maxLength={100} value={form.name} onChange={(e)=>change("name",e.target.value)}/>
</div>

<div>
<Label>Preferred Name</Label>
<Input maxLength={100} value={form.preferredName} onChange={(e)=>change("preferredName",e.target.value)}/>
</div>

<div>
<Label>Phone Number</Label>
<Input
value={form.phone}
maxLength={10}
onChange={(e)=>change("phone",e.target.value.replace(/\D/g,''))}
/>
</div>

<div>
<Label>Department</Label>
<select
value={form.department}
onChange={(e)=>change("department",e.target.value)}
className="w-full border rounded-md p-2"
>
<option value="">Select Department</option>
<option value="Computer Science and Engineering">Computer Science and Engineering</option>
<option value="Mathematics">Mathematics</option>
<option value="Physics">Physics</option>
<option value="Chemistry">Chemistry</option>
<option value="Statistics">Statistics</option>
</select>
</div>

<div className="md:col-span-2">
<Label>Bio</Label>
<Textarea maxLength={300} value={form.bio} onChange={(e)=>change("bio",e.target.value)}/>
</div>

</div>

</Card>

<div className="flex flex-col md:flex-row gap-4 pt-4">

<Button variant="outline" onClick={()=>navigate("/profile")}>
Cancel </Button>

<Button onClick={submit}>
Save Changes
</Button>

</div>

</div>

</Layout>

)

}
