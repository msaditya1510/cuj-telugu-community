import { useEffect,useState } from "react"
import { Layout } from "@/components/layout/Layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

import StepPersonal from "@/components/signup/StepPersonal"
import StepStudent from "@/components/signup/StepStudent"
import StepAlumni from "@/components/signup/StepAlumni"
import StepProfessor from "@/components/signup/StepProfessor"

type Step = 1 | 2 | 3

const API_BASE = import.meta.env.VITE_API_URL

export default function SignUpPage(){
    useEffect(()=>{
document.title="Sign Up Page | CUJ Telugu Community"
},[])

const [step,setStep] = useState<Step>(1)
const [loading,setLoading] = useState(false)
const [photo,setPhoto] = useState<File | null>(null)

const [formData,setFormData] = useState({

name:"",
preferredName:"",
userName:"",
password:"",
email:"",
phone:"",
department:"",

state:"",
district:"",
city:"",
pincode:"",

role:"",

rollNo:"",
course:"",
currentYear:"",
skills:"",
studentAchievements:"",

graduationYear:"",
currentStatus:"",
currentCompany:"",
currentLocation:"",
alumniAchievements:"",

designation:"",
qualifications:"",
specialization:"",
experience:"",
researchInterests:""

})

const [fieldErrors,setFieldErrors] = useState<Record<string,string>>({})

function handleFieldChange(field:string,value:string){

if(field==="phone") value=value.replace(/\D/g,"").slice(0,10)
if(field==="pincode") value=value.replace(/\D/g,"").slice(0,6)
if(field==="rollNo") value=value.replace(/\D/g,"")
if(field==="currentYear") value=value.replace(/\D/g,"").slice(0,1)
if(field==="graduationYear") value=value.replace(/\D/g,"").slice(0,4)

setFormData(prev=>({...prev,[field]:value}))
setFieldErrors(prev=>({...prev,[field]:""}))

}

function scrollToField(field:string){

setTimeout(()=>{

const el=document.getElementById(field)

if(el){
el.scrollIntoView({behavior:"smooth",block:"center"})
el.focus()
}

},100)

}

function validateStep1(){

const errors:any={}

if(!formData.name.trim()) errors.name="Full name required"
if(!formData.preferredName.trim()) errors.preferredName="Preferred name required"
if(!formData.userName.trim()) errors.userName="Username required"
if(!formData.password.trim()) errors.password="Password required"
if(!formData.email.trim()) errors.email="Email required"
if(!formData.phone) errors.phone="Phone required"
if(!formData.department) errors.department="Department required"
if(!formData.state) errors.state="State required"
if(!formData.district) errors.district="District required"
if(!formData.city.trim()) errors.city="City required"
if(!formData.pincode) errors.pincode="Pincode required"

setFieldErrors(errors)

const first=Object.keys(errors)[0]

if(first){
toast.error(errors[first])
scrollToField(first)
return false
}

return true

}

function validateStep2(){

const errors:any={}

if(!formData.role) errors.role="Select role"

if(formData.role==="STUDENT"){
if(!formData.rollNo) errors.rollNo="Roll number required"
if(!formData.course.trim()) errors.course="Course required"
if(!formData.currentYear) errors.currentYear="Current year required"
if(!formData.skills.trim()) errors.skills="Skills required"
}

if(formData.role==="ALUMNI"){
if(!formData.graduationYear) errors.graduationYear="Graduation year required"
}

if(formData.role==="PROFESSOR"){
if(!formData.designation.trim()) errors.designation="Designation required"
if(!formData.qualifications.trim()) errors.qualifications="Qualifications required"
if(!formData.specialization.trim()) errors.specialization="Specialization required"
if(!formData.experience.trim()) errors.experience="Experience required"

}

setFieldErrors(errors)

const first=Object.keys(errors)[0]

if(first){
toast.error(errors[first])
scrollToField(first)
return false
}

return true

}

async function submitRegistration(){

try{

setLoading(true)

const payload={

userName:formData.userName,
password:formData.password,
name:formData.name,
email:formData.email,
phone:formData.phone,
preferredName:formData.preferredName,
department:formData.department,

userType:formData.role,

address:{
state:formData.state,
district:formData.district,
city:formData.city,
pincode:formData.pincode
},

rollNo:formData.rollNo,
course:formData.course,
currentYear:formData.currentYear,
skills:formData.skills,
studentAchievements:formData.studentAchievements,

graduationYear:formData.graduationYear,
currentStatus:formData.currentStatus,
currentCompany:formData.currentCompany,
currentLocation:formData.currentLocation,
alumniAchievements:formData.alumniAchievements,

designation:formData.designation,
qualifications:formData.qualifications,
specialization:formData.specialization,
experience:formData.experience,
researchInterests:formData.researchInterests

}

const form=new FormData()

form.append("userData",JSON.stringify(payload))

if(photo){
form.append("file",photo)
}

const res = await fetch(`${API_BASE}/auth/register`,{
method:"POST",
body:form
})

if(!res.ok) throw new Error()

toast.success("Registration submitted")
setStep(3)

}catch(err){

toast.error("Registration failed")

}finally{

setLoading(false)

}

}

function handleNext(){

if(step===1){
if(!validateStep1()) return
setStep(2)
return
}

if(step===2){
if(!validateStep2()) return
submitRegistration()
}

}

function handleBack(){
if(step===2) setStep(1)
}

const progress = step === 1 ? 33 : step === 2 ? 66 : 100
return(

<Layout>

<div className="min-h-screen flex justify-center items-center p-6">

<Card className="w-full max-w-2xl p-10 space-y-8 bg-white shadow-xl border rounded-2xl">

{/* Stripe style progress */}

<div className="flex justify-between text-sm">

<div className={step>=1 ? "font-bold" : ""}>Personal</div>
<div className={step>=2 ? "font-bold" : ""}>Academic</div>
<div className={step===3 ? "font-bold" : ""}>Done</div>

</div>
<div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">

<div
className="h-full bg-primary transition-all duration-500"
style={{ width: `${progress}%` }}
/>

</div>

<h1 className="text-3xl font-bold">
Create Account
</h1>

{step===1 && (
<StepPersonal
formData={formData}
fieldErrors={fieldErrors}
handleFieldChange={handleFieldChange}
setPhoto={setPhoto}
/>
)}

{step===2 && (

<div className="space-y-6">

<label>
Role <span className="text-red-500">*</span>
</label>

<select
id="role"
value={formData.role}
onChange={(e)=>handleFieldChange("role",e.target.value)}
className="border rounded p-2 w-full"
>

<option value="">Select role</option>
<option value="STUDENT">Student</option>
<option value="ALUMNI">Alumni</option>
<option value="PROFESSOR">Professor</option>

</select>

{formData.role==="STUDENT" &&
<StepStudent formData={formData} handleFieldChange={handleFieldChange}/>
}

{formData.role==="ALUMNI" &&
<StepAlumni formData={formData} handleFieldChange={handleFieldChange}/>
}

{formData.role==="PROFESSOR" &&
<StepProfessor formData={formData} handleFieldChange={handleFieldChange}/>
}

</div>

)}

{step===3 && (

<div className="text-center space-y-4">

<h2 className="text-2xl font-semibold">
Registration Successful
</h2>

<p>
Your registration has been submitted for admin approval.
</p>

</div>

)}

<div className="flex gap-4">

{step===2 &&
<Button variant="outline" onClick={handleBack} className="w-full">
Back
</Button>
}

{step<3 &&
<Button onClick={handleNext} disabled={loading} className="w-full">
{loading ? "Submitting..." : step===2 ? "Submit" : "Next"}
</Button>
}

</div>

</Card>

</div>

</Layout>

)

}