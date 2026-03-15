import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface Props{
formData:any
handleFieldChange:(field:string,value:string)=>void
}

export default function StepAlumni({formData,handleFieldChange}:Props){

return(

<div className="space-y-6">

<div>
<Label className="text-sm font-semibold">Graduation Year <span className="text-red-500">*</span></Label>
<Input id="graduationYear"
type="number"
value={formData.graduationYear}
onChange={(e)=>handleFieldChange("graduationYear",e.target.value)}
/>
</div>

<div>
<Label className="text-sm font-semibold">Current Status <span className="text-red-500">*</span></Label>
<Input id="currentStatus"
value={formData.currentStatus}
onChange={(e)=>handleFieldChange("currentStatus",e.target.value)}
/>
</div>

<div>
<Label className="text-sm font-semibold">Current Company <span className="text-red-500">*</span></Label>
<Input id="currentCompany"
value={formData.currentCompany}
onChange={(e)=>handleFieldChange("currentCompany",e.target.value)}
/>
</div>

<div>
<Label className="text-sm font-semibold">Current Location <span className="text-red-500">*</span></Label>
<Input id="currentLocation"
value={formData.currentLocation}
onChange={(e)=>handleFieldChange("currentLocation",e.target.value)}
/>
</div>

<div>
<Label className="text-sm font-semibold">Achievements <span className="text-red-500">*</span></Label>
<Textarea id="alumniAchievements"
value={formData.alumniAchievements}
onChange={(e)=>handleFieldChange("alumniAchievements",e.target.value)}
/>
</div>

</div>

)

}