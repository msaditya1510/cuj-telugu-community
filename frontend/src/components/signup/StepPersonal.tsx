import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const API_BASE = import.meta.env.VITE_API_URL

const districts:any = {

"Andhra Pradesh":[
"Alluri Sitharama Raju","Anakapalli","Ananthapuramu","Annamayya","Bapatla",
"Chittoor","Dr. B.R. Ambedkar Konaseema","East Godavari","Eluru","Guntur",
"Kakinada","Krishna","Kurnool","Nandyal","NTR","Palnadu","Parvathipuram Manyam",
"Prakasam","Sri Potti Sriramulu Nellore","Sri Sathya Sai","Srikakulam",
"Tirupati","Visakhapatnam","Vizianagaram","West Godavari","YSR Kadapa"
],

"Telangana":[
"Adilabad","Bhadradri Kothagudem","Hanumakonda","Hyderabad","Jagtial",
"Jangaon","Jayashankar Bhupalpally","Jogulamba Gadwal","Kamareddy",
"Karimnagar","Khammam","Kumuram Bheem Asifabad","Mahabubabad",
"Mahabubnagar","Mancherial","Medak","Medchal–Malkajgiri","Mulugu",
"Nagarkurnool","Nalgonda","Narayanpet","Nirmal","Nizamabad","Peddapalli",
"Rajanna Sircilla","Rangareddy","Sangareddy","Siddipet","Suryapet",
"Vikarabad","Wanaparthy","Warangal","Yadadri Bhuvanagiri"
]

}

interface Props{
formData:any
fieldErrors:Record<string,string>
handleFieldChange:(field:string,value:string)=>void
setPhoto:(file:File)=>void
}

export default function StepPersonal({
formData,
fieldErrors,
handleFieldChange,
setPhoto
}:Props){

const [checking,setChecking]=useState(false)
const [usernameAvailable,setUsernameAvailable]=useState<boolean | null>(null)

useEffect(()=>{

if(!formData.userName){
setUsernameAvailable(null)
return
}

const timer = setTimeout(async()=>{

try{

setChecking(true)

const res = await fetch(
`${API_BASE}/auth/check-username?username=${formData.userName}`
)

const data = await res.json()

if(!res.ok){

setUsernameAvailable(false)

handleFieldChange("userName",formData.userName)

return

}

if(data.available){
setUsernameAvailable(true)
}else{
setUsernameAvailable(false)
}

}catch{

setUsernameAvailable(false)

}finally{

setChecking(false)

}

},400)

return ()=>clearTimeout(timer)

},[formData.userName])


return(

<div className="space-y-6">

<div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">

<p className="font-semibold mb-2">Registration Guidelines</p>

<ul className="list-disc ml-5 space-y-1">

<li>Username must contain only letters, numbers or underscores.</li>
<li>Password must be at least 6 characters long.</li>
<li>Phone number must be a valid 10-digit Indian mobile number.</li>
<li>Preferred name is the name displayed in the community.</li>

</ul>

</div>

<div>
<Label>Full Name *</Label>
<Input
id="name"
placeholder="Example: Ravi Kumar"
value={formData.name}
onChange={(e)=>handleFieldChange("name",e.target.value)}
className={fieldErrors.name ? "border-red-500" : ""}
/>
</div>

<div>
<Label>Preferred Name *</Label>
<Input
id="preferredName"
placeholder="Example: Ravi"
value={formData.preferredName}
onChange={(e)=>handleFieldChange("preferredName",e.target.value)}
className={fieldErrors.preferredName ? "border-red-500" : ""}
/>
</div>

<div>

<Label>Username *</Label>

<Input
id="userName"
placeholder="Example: ravi_kumar23"
value={formData.userName}
onChange={(e)=>handleFieldChange("userName",e.target.value)}
className={fieldErrors.userName ? "border-red-500" : ""}
/>

{checking && <p className="text-sm text-gray-500">Checking availability...</p>}

{usernameAvailable===true &&

<p className="text-sm text-green-600">✓ Username available</p>
}

{usernameAvailable===false &&

<p className="text-sm text-red-500">✗ Username already taken</p>
}

</div>

<div>

<Label>Password *</Label>

<Input
id="password"
type="password"
placeholder="Minimum 6 characters"
value={formData.password}
onChange={(e)=>handleFieldChange("password",e.target.value)}
className={fieldErrors.password ? "border-red-500" : ""}
/>

</div>

<div>

<Label>Email *</Label>

<Input
id="email"
type="email"
placeholder="[example@email.com](mailto:example@email.com)"
value={formData.email}
onChange={(e)=>handleFieldChange("email",e.target.value)}
className={fieldErrors.email ? "border-red-500" : ""}
/>

</div>

<div>

<Label>Phone *</Label>

<Input
id="phone"
placeholder="10 digit mobile number"
value={formData.phone}
onChange={(e)=>handleFieldChange("phone",e.target.value)}
className={fieldErrors.phone ? "border-red-500" : ""}
/>

</div>

<div>

<Label>Department *</Label>

<select
id="department"
value={formData.department}
onChange={(e)=>handleFieldChange("department",e.target.value)}
className="w-full border rounded-md p-2"

>

 <option value="">Select Department</option>
<option value="Anthropology and Tribal Studies">Anthropology and Tribal Studies</option>
<option value="Business Administration">Business Administration</option>
<option value="Civil Engineering">Civil Engineering</option>
<option value="Computer Science and Engineering">Computer Science and Engineering</option>
<option value="Commerce and Financial Studies">Commerce and Financial Studies</option>
<option value="Chemistry">Chemistry</option>
<option value="Environmental Science">Environmental Science</option>
<option value="Economics & Development Studies">Economics & Development Studies</option>
<option value="Electrical Engineering">Electrical Engineering</option>
<option value="Education">Education</option>
<option value="English Studies">English Studies</option>
<option value="Far East Languages">Far East Languages</option>
<option value="Geoinformatics">Geoinformatics</option>
<option value="Geography">Geography</option>
<option value="Geology">Geology</option>
<option value="Happiness and Holistic Well-Being">Happiness and Holistic Well-Being</option>
<option value="Hindi">Hindi</option>
<option value="International Relations">International Relations</option>
<option value="Life Sciences">Life Sciences</option>
<option value="Mass Communication">Mass Communication</option>
<option value="Mathematics">Mathematics</option>
<option value="Metallurgical and Materials Engineering">Metallurgical and Materials Engineering</option>
<option value="Political Science & Public Administration">Political Science & Public Administration</option>
<option value="Physics">Physics</option>
<option value="Performing Arts">Performing Arts</option>
<option value="Statistics">Statistics</option>

</select>

</div>

<div>

<Label>State <span className="text-red-500">*</span></Label>

<select
id="state"
value={formData.state}
onChange={(e)=>handleFieldChange("state",e.target.value)}
className="w-full border rounded-md p-2"

>

<option value="">Select State</option>
<option value="Andhra Pradesh">Andhra Pradesh</option>
<option value="Telangana">Telangana</option>

</select>

</div>

<div>

<Label>District <span className="text-red-500">*</span></Label>

<select
id="district"
value={formData.district}
onChange={(e)=>handleFieldChange("district",e.target.value)}
className="w-full border rounded-md p-2"
disabled={!formData.state}

>

<option value="">Select District</option>

{formData.state &&
districts[formData.state]?.map((d:string)=>(

<option key={d} value={d}>{d}</option>
))}

</select>

</div>

<div>

<Label>City / Village <span className="text-red-500">*</span></Label>

<Input
id="city"
placeholder="Example: Hyderabad"
value={formData.city}
onChange={(e)=>handleFieldChange("city",e.target.value)}
/>

</div>

<div>

<Label>Pincode <span className="text-red-500">*</span></Label>

<Input
id="pincode"
placeholder="6 digit pincode"
value={formData.pincode}
onChange={(e)=>handleFieldChange("pincode",e.target.value)}
/>

</div>

<div>

<Label>Profile Photo</Label>

<Input
type="file"
accept="image/png,image/jpeg"
onChange={(e)=>{

const file=e.target.files?.[0]

if(!file) return

if(file.size>5*1024*1024){
alert("Photo must be under 5MB")
return
}

setPhoto(file)

}}
/>

<p className="text-xs text-muted-foreground mt-1">
JPEG or PNG • max 5MB
</p>

</div>

</div>

)

}
