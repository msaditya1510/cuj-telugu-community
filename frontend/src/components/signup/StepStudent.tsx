import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface Props{
formData:any
handleFieldChange:(field:string,value:string)=>void
}

export default function StepStudent({formData,handleFieldChange}:Props){

return(

<div className="space-y-6">

<div>
<Label className="text-sm font-semibold">Roll Number <span className="text-red-500">*</span></Label>
<Input id="rollNo"
value={formData.rollNo}
onChange={(e)=>handleFieldChange("rollNo",e.target.value)}
placeholder="CUJ roll number"
/>
</div>

<div>
<Label className="text-sm font-semibold">Course <span className="text-red-500">*</span></Label>
<Input id="course"
value={formData.course}
onChange={(e)=>handleFieldChange("course",e.target.value)}
placeholder="Example: B.Tech CSE"
/>
</div>

<div>
<Label className="text-sm font-semibold">Current Year <span className="text-red-500">*</span></Label>
<Input id="currentYear"
type="number"
min="1"
max="5"
value={formData.currentYear}
onChange={(e)=>handleFieldChange("currentYear",e.target.value)}
/>
</div>

<div>
<Label className="text-sm font-semibold">Skills <span className="text-red-500">*</span></Label>
<Textarea id="skills"
value={formData.skills}
onChange={(e)=>handleFieldChange("skills",e.target.value)}
placeholder="Java, React, ML"
/>
</div>

<div>
<Label className="text-sm font-semibold">Achievements <span className="text-red-500">*</span></Label>
<Textarea id="studentAchievements"
value={formData.studentAchievements}
onChange={(e)=>handleFieldChange("studentAchievements",e.target.value)}
/>
</div>

</div>

)

}