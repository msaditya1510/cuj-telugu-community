import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface Props{
formData:any
handleFieldChange:(field:string,value:string)=>void
}

export default function StepProfessor({formData,handleFieldChange}:Props){

return(

<div className="space-y-6">

<div>
<Label className="text-sm font-semibold">Designation <span className="text-red-500">*</span></Label>
<select id="designation"
value={formData.designation}
onChange={(e)=>handleFieldChange("designation",e.target.value)} className="w-full border rounded-md p-2"
>
<option value="">Select Designation</option>

<option>Assistant Professor</option>
<option>Associate Professor</option>
<option>Professor</option>
<option>Visiting Professor</option>
<option>Adjunct Professor</option>
<option>Research Professor</option>

</select>
</div>

<div>
<Label className="text-sm font-semibold">Qualifications <span className="text-red-500">*</span></Label>
<Input id="qualifications"
value={formData.qualifications}
onChange={(e)=>handleFieldChange("qualifications",e.target.value)}
/>
</div>

<div>
<Label className="text-sm font-semibold">Specialization <span className="text-red-500">*</span></Label>
<Input id="specialization"
value={formData.specialization}
onChange={(e)=>handleFieldChange("specialization",e.target.value)}
/>
</div>

<div>
<Label className="text-sm font-semibold">Experience <span className="text-red-500">*</span></Label>
<Input id="experience"
value={formData.experience}
onChange={(e)=>handleFieldChange("experience",e.target.value)}
/>
</div>

<div>
<Label className="text-sm font-semibold">Research Interests</Label>
<Textarea id="researchInterests"
value={formData.researchInterests}
onChange={(e)=>handleFieldChange("researchInterests",e.target.value)}
/>
</div>

</div>

)

}