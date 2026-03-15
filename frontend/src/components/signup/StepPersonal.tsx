import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const API_BASE = import.meta.env.VITE_API_URL

const districts:any = {

"Andhra Pradesh": [
"Alluri Sitharama Raju",
"Anakapalli",
"Ananthapuramu",
"Annamayya",
"Bapatla",
"Chittoor",
"Dr. B.R. Ambedkar Konaseema",
"East Godavari",
"Eluru",
"Guntur",
"Kakinada",
"Krishna",
"Kurnool",
"Nandyal",
"NTR",
"Palnadu",
"Parvathipuram Manyam",
"Prakasam",
"Sri Potti Sriramulu Nellore",
"Sri Sathya Sai",
"Srikakulam",
"Tirupati",
"Visakhapatnam",
"Vizianagaram",
"West Godavari",
"YSR Kadapa"
],

"Telangana": [
  "Adilabad",
  "Bhadradri Kothagudem",
  "Hanumakonda",
  "Hyderabad",
  "Jagtial",
  "Jangaon",
  "Jayashankar Bhupalpally",
  "Jogulamba Gadwal",
  "Kamareddy",
  "Karimnagar",
  "Khammam",
  "Kumuram Bheem Asifabad",
  "Mahabubabad",
  "Mahabubnagar",
  "Mancherial",
  "Medak",
  "Medchal–Malkajgiri",
  "Mulugu",
  "Nagarkurnool",
  "Nalgonda",
  "Narayanpet",
  "Nirmal",
  "Nizamabad",
  "Peddapalli",
  "Rajanna Sircilla",
  "Rangareddy",
  "Sangareddy",
  "Siddipet",
  "Suryapet",
  "Vikarabad",
  "Wanaparthy",
  "Warangal",
  "Yadadri Bhuvanagiri"
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

const [checking,setChecking] = useState(false)
const [usernameAvailable,setUsernameAvailable] = useState<boolean | null>(null)

useEffect(()=>{

if(!formData.userName || formData.userName.length < 3){
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

setUsernameAvailable(data.available)

}catch{

setUsernameAvailable(null)

}finally{

setChecking(false)

}

},500)

return ()=>clearTimeout(timer)

},[formData.userName])

return(

<div className="space-y-6">

{/* Full Name */}

<div>
<Label className="text-sm font-semibold">
Full Name <span className="text-red-500">*</span>
</Label>

<Input
id="name"
placeholder="Enter your full name"
value={formData.name}
onChange={(e)=>handleFieldChange("name",e.target.value)}
className={fieldErrors.name ? "border-red-500" : ""}
// className={`transition-all duration-200 focus:ring-2 focus:ring-orange-400 ${fieldErrors.name ? "border-red-500" : ""}`}
/>

{fieldErrors.name &&
<p className="text-sm text-red-500">{fieldErrors.name}</p>
}

</div>


{/* Preferred Name */}

<div>
<Label className="text-sm font-semibold">
Preferred Name <span className="text-red-500">*</span>
</Label>

<Input
id="preferredName"
placeholder="How people should call you"
value={formData.preferredName}
onChange={(e)=>handleFieldChange("preferredName",e.target.value)}
className={fieldErrors.preferredName ? "border-red-500" : ""}
/>

{fieldErrors.preferredName &&
<p className="text-sm text-red-500">{fieldErrors.preferredName}</p>
}

</div>


{/* Username */}

<div>
<Label className="text-sm font-semibold">
Username <span className="text-red-500">*</span>
</Label>

<Input
id="userName"
placeholder="Choose a unique username"
value={formData.userName}
onChange={(e)=>handleFieldChange("userName",e.target.value)}
className={fieldErrors.userName ? "border-red-500" : ""}
/>

{checking &&
<p className="text-sm text-gray-500">
Checking username availability...
</p>
}

{usernameAvailable === true &&
<p className="text-sm text-green-600">
✓ Username available
</p>
}

{usernameAvailable === false &&
<p className="text-sm text-red-500">
✗ Username already taken
</p>
}

{fieldErrors.userName &&
<p className="text-sm text-red-500">{fieldErrors.userName}</p>
}

</div>


{/* Password */}

<div>
<Label className="text-sm font-semibold">
Password <span className="text-red-500">*</span>
</Label>

<Input
id="password"
type="password"
placeholder="Enter a secure password"
value={formData.password}
onChange={(e)=>handleFieldChange("password",e.target.value)}
className={fieldErrors.password ? "border-red-500" : ""}
/>

{fieldErrors.password &&
<p className="text-sm text-red-500">{fieldErrors.password}</p>
}

</div>


{/* Email */}

<div>
<Label className="text-sm font-semibold">
Email <span className="text-red-500">*</span>
</Label>

<Input
id="email"
type="email"
placeholder="your@email.com"
value={formData.email}
onChange={(e)=>handleFieldChange("email",e.target.value)}
className={fieldErrors.email ? "border-red-500" : ""}
/>

{fieldErrors.email &&
<p className="text-sm text-red-500">{fieldErrors.email}</p>
}

</div>


{/* Phone */}

<div>
<Label className="text-sm font-semibold">
Phone Number <span className="text-red-500">*</span>
</Label>

<Input 
id="phone"
placeholder="10 digit mobile number"
value={formData.phone}
onChange={(e)=>handleFieldChange("phone",e.target.value)}
className={fieldErrors.phone ? "border-red-500" : ""}
// className={`transition-all duration-200 focus:ring-2 focus:ring-orange-400 ${fieldErrors.name ? "border-red-500" : ""}`}
/>

{fieldErrors.phone &&
<p className="text-sm text-red-500">{fieldErrors.phone}</p>
}

</div>
{/* Department */}

<div>
<Label className="text-sm font-semibold">
Department <span className="text-red-500">*</span>
</Label>

<select
id="department"
value={formData.department}
onChange={(e)=>handleFieldChange("department",e.target.value)}
className={`w-full border rounded-md p-2 ${fieldErrors.department ? "border-red-500" : ""}`}
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

{fieldErrors.department &&
<p className="text-sm text-red-500">{fieldErrors.department}</p>
}

</div>


{/* State */}

<div>
<Label className="text-sm font-semibold">
State <span className="text-red-500">*</span>
</Label>

<select
id="state"
value={formData.state}
onChange={(e)=>handleFieldChange("state",e.target.value)}
className={`w-full border rounded-md p-2 ${fieldErrors.state ? "border-red-500" : ""}`}
>
<option value="">Select State</option>
<option value="Andhra Pradesh">Andhra Pradesh</option>
<option value="Telangana">Telangana</option>
</select>

{fieldErrors.state &&
<p className="text-sm text-red-500">{fieldErrors.state}</p>
}

</div>


{/* District */}

<div>
<Label className="text-sm font-semibold">
District <span className="text-red-500">*</span>
</Label>

<select
id="district"
value={formData.district}
onChange={(e)=>handleFieldChange("district",e.target.value)}
className={`w-full border rounded-md p-2 ${fieldErrors.district ? "border-red-500" : ""}`}
disabled={!formData.state}
>

<option value="">Select District</option>

{formData.state &&
districts[formData.state]?.map((d:string)=>(
<option key={d} value={d}>
{d}
</option>
))}

</select>

{fieldErrors.district &&
<p className="text-sm text-red-500">{fieldErrors.district}</p>
}

</div>


{/* City / Village */}

<div>
<Label className="text-sm font-semibold">
City / Village <span className="text-red-500">*</span>
</Label>

<Input
id="city"
placeholder="Enter city or village"
value={formData.city}
onChange={(e)=>handleFieldChange("city",e.target.value)}
className={fieldErrors.city ? "border-red-500" : ""}
/>

{fieldErrors.city &&
<p className="text-sm text-red-500">{fieldErrors.city}</p>
}

</div>


{/* Pincode */}

<div>
<Label className="text-sm font-semibold">
Pincode <span className="text-red-500">*</span>
</Label>

<Input
id="pincode"
placeholder="6 digit pincode"
value={formData.pincode}
onChange={(e)=>handleFieldChange("pincode",e.target.value)}
className={fieldErrors.pincode ? "border-red-500" : ""}
/>

{fieldErrors.pincode &&
<p className="text-sm text-red-500">{fieldErrors.pincode}</p>
}

</div>

{/* Profile Photo */}

<div>

<Label className="text-sm font-semibold">
Profile Photo
</Label>

<Input className={`transition-all duration-200 focus:ring-2 focus:ring-orange-400 ${fieldErrors.name ? "border-red-500" : ""}`}
type="file"
accept="image/png,image/jpeg"
onChange={(e)=>{

const file = e.target.files?.[0]

if(!file) return

if(file.size > 5 * 1024 * 1024){
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