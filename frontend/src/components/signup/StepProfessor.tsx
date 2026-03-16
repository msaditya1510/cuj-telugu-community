import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface Props {
formData: any
handleFieldChange: (field: string, value: string) => void
}

export default function StepProfessor({ formData, handleFieldChange }: Props) {

return ( <div className="space-y-6">

  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
    <p className="font-semibold mb-2">Professor Details</p>

    <ul className="list-disc ml-5 space-y-1">
      <li>Select your academic designation.</li>
      <li>Qualifications may include PhD, MTech, MSc etc.</li>
      <li>Specialization should describe your research area.</li>
    </ul>
  </div>

  <div>
    <Label className="text-sm font-semibold">
      Designation <span className="text-red-500">*</span>
    </Label>

    <select
      id="designation"
      value={formData.designation}
      onChange={(e) => handleFieldChange("designation", e.target.value)}
      className="w-full border rounded-md p-2"
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
    <Label className="text-sm font-semibold">
      Qualifications <span className="text-red-500">*</span>
    </Label>

    <Input
      id="qualifications"
      placeholder="Example: PhD in Computer Science"
      value={formData.qualifications}
      onChange={(e) => handleFieldChange("qualifications", e.target.value)}
    />
  </div>

  <div>
    <Label className="text-sm font-semibold">
      Specialization <span className="text-red-500">*</span>
    </Label>

    <Input
      id="specialization"
      placeholder="Example: Artificial Intelligence"
      value={formData.specialization}
      onChange={(e) => handleFieldChange("specialization", e.target.value)}
    />
  </div>

  <div>
    <Label className="text-sm font-semibold">
      Experience <span className="text-red-500">*</span>
    </Label>

    <Input
      id="experience"
      placeholder="Example: 12 years"
      value={formData.experience}
      onChange={(e) => handleFieldChange("experience", e.target.value)}
    />
  </div>

  <div>
    <Label className="text-sm font-semibold">
      Research Interests
    </Label>

    <Textarea
      id="researchInterests"
      value={formData.researchInterests}
      onChange={(e) => handleFieldChange("researchInterests", e.target.value)}
      placeholder="AI, ML, Distributed Systems"
    />
  </div>

</div>


)

}
