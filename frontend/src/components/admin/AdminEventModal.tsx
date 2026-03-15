import { useState, useEffect } from "react"

const API_BASE = import.meta.env.VITE_API_URL

interface EventData{
id?:number
eventName:string
eventDescription:string
venue:string
eventDateTime?:string
}

interface Props{
isOpen:boolean
onClose:()=>void
onSuccess:()=>void
event?:EventData
}

export default function AdminEventModal({
isOpen,
onClose,
onSuccess,
event
}:Props){

const [eventName,setEventName] = useState("")
const [eventDescription,setEventDescription] = useState("")
const [venue,setVenue] = useState("")
const [date,setDate] = useState("")
const [time,setTime] = useState("")

useEffect(()=>{

if(event){

setEventName(event.eventName)
setEventDescription(event.eventDescription)
setVenue(event.venue)

if(event.eventDateTime){

const d = new Date(event.eventDateTime)

setDate(d.toISOString().split("T")[0])
setTime(d.toTimeString().slice(0,5))

}

}

},[event])

async function handleSubmit(){

const eventDateTime = `${date}T${time}`

const payload = {
eventName,
eventDescription,
venue,
eventDateTime
}

if(event?.id){

await fetch(`${API_BASE}/api/admin/events/${event.id}`,{
method:"PUT",
credentials:"include",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify(payload)
})

}else{

await fetch(`${API_BASE}/api/admin/events`,{
method:"POST",
credentials:"include",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify(payload)
})

}

onSuccess()
onClose()

}

if(!isOpen) return null

return(

<div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

<div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 space-y-4">

<h2 className="text-xl font-semibold">
{event ? "Edit Event" : "Add Event"}
</h2>

<input
className="w-full border p-2 rounded"
placeholder="Event Name"
value={eventName}
onChange={(e)=>setEventName(e.target.value)}
/>

<textarea
className="w-full border p-2 rounded"
placeholder="Description"
value={eventDescription}
onChange={(e)=>setEventDescription(e.target.value)}
/>

<input
className="w-full border p-2 rounded"
placeholder="Venue"
value={venue}
onChange={(e)=>setVenue(e.target.value)}
/>

<div className="flex gap-3">

<input
type="date"
className="border p-2 rounded w-1/2"
value={date}
onChange={(e)=>setDate(e.target.value)}
/>

<input
type="time"
className="border p-2 rounded w-1/2"
value={time}
onChange={(e)=>setTime(e.target.value)}
/>

</div>

<div className="flex justify-end gap-3 pt-2">

<button
onClick={onClose}
className="px-4 py-2 border rounded"
>
Cancel
</button>

<button
onClick={handleSubmit}
className="px-4 py-2 bg-black text-white rounded"
>
Save
</button>

</div>

</div>

</div>

)

}