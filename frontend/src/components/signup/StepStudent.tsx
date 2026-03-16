import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface Props {
formData: any
handleFieldChange: (field: string, value: string) => void
}

export default function StepStudent({ formData, handleFieldChange }: Props) {

return ( <div className="space-y-6">

  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
    <p className="font-semibold mb-2">Student Details</p>

    <ul className="list-disc ml-5 space-y-1">
      <li>Roll number must be <b>11 digits</b> and start with <b>2</b>.</li>
      <li>Current year must be between <b>1 and 5</b>.</li>
      <li>Skills help others discover you in the community.</li>
    </ul>
  </div>

  <div>
    <Label className="text-sm font-semibold">
      Roll Number <span className="text-red-500">*</span>
    </Label>

    <Input
      id="rollNo"
      value={formData.rollNo}
      onChange={(e) => handleFieldChange("rollNo", e.target.value)}
      placeholder="Example: 20231234567"
    />
  </div>

  <div>
    <Label className="text-sm font-semibold">
      Course <span className="text-red-500">*</span>
    </Label>

    <Input
      id="course"
      value={formData.course}
      onChange={(e) => handleFieldChange("course", e.target.value)}
      placeholder="Example: B.Tech Computer Science"
    />
  </div>

  <div>
    <Label className="text-sm font-semibold">
      Current Year <span className="text-red-500">*</span>
    </Label>

    <Input
      id="currentYear"
      type="number"
      min="1"
      max="5"
      value={formData.currentYear}
      onChange={(e) => handleFieldChange("currentYear", e.target.value)}
    />
  </div>

  <div>
    <Label className="text-sm font-semibold">
      Skills <span className="text-red-500">*</span>
    </Label>

    <Textarea
      id="skills"
      value={formData.skills}
      onChange={(e) => handleFieldChange("skills", e.target.value)}
      placeholder="Example: Java, Spring Boot, Machine Learning"
    />
  </div>

  <div>
    <Label className="text-sm font-semibold">
      Achievements
    </Label>

    <Textarea
      id="studentAchievements"
      value={formData.studentAchievements}
      onChange={(e) => handleFieldChange("studentAchievements", e.target.value)}
      placeholder="Hackathons, awards, major projects"
    />
  </div>

</div>

)

}
