import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface Props {
formData: any
handleFieldChange: (field: string, value: string) => void
}

export default function StepAlumni({ formData, handleFieldChange }: Props) {

return ( <div className="space-y-6">

  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
    <p className="font-semibold mb-2">Alumni Details</p>

    <ul className="list-disc ml-5 space-y-1">
      <li>Graduation year must be <b>2000 or later</b>.</li>
      <li>Current status example: Software Engineer, Researcher.</li>
      <li>Achievements are optional but recommended.</li>
    </ul>
  </div>

  <div>
    <Label className="text-sm font-semibold">
      Graduation Year <span className="text-red-500">*</span>
    </Label>

    <Input
      id="graduationYear"
      type="number"
      placeholder="Example: 2022"
      value={formData.graduationYear}
      onChange={(e) => handleFieldChange("graduationYear", e.target.value)}
    />
  </div>

  <div>
    <Label className="text-sm font-semibold">
      Current Status <span className="text-red-500">*</span>
    </Label>

    <Input
      id="currentStatus"
      placeholder="Example: Software Engineer"
      value={formData.currentStatus}
      onChange={(e) => handleFieldChange("currentStatus", e.target.value)}
    />
  </div>

  <div>
    <Label className="text-sm font-semibold">
      Current Company
    </Label>

    <Input
      id="currentCompany"
      placeholder="Example: Google"
      value={formData.currentCompany}
      onChange={(e) => handleFieldChange("currentCompany", e.target.value)}
    />
  </div>

  <div>
    <Label className="text-sm font-semibold">
      Current Location
    </Label>

    <Input
      id="currentLocation"
      placeholder="Example: Hyderabad"
      value={formData.currentLocation}
      onChange={(e) => handleFieldChange("currentLocation", e.target.value)}
    />
  </div>

  <div>
    <Label className="text-sm font-semibold">
      Achievements
    </Label>

    <Textarea
      id="alumniAchievements"
      value={formData.alumniAchievements}
      onChange={(e) => handleFieldChange("alumniAchievements", e.target.value)}
      placeholder="Awards, leadership roles, major contributions"
    />
  </div>

</div>


)

}
