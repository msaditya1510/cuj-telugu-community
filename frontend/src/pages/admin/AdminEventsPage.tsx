import { useEffect, useState } from "react"
import AdminEventModal from "@/components/admin/AdminEventModal"
import { Layout } from "@/components/layout/Layout"
import AdminLayout from "./AdminLayout"

const API_BASE = import.meta.env.VITE_API_URL

interface Event {
  id:number
  eventName:string
  eventDescription:string
  eventDateTime:string
  venue:string
}

export default function AdminEventsPage(){

const [events,setEvents] = useState<Event[]>([])
const [loading,setLoading] = useState(true)

const [showModal,setShowModal] = useState(false)
const [selectedEvent,setSelectedEvent] = useState<Event | undefined>()

async function loadEvents(){

try{

const res = await fetch(`${API_BASE}/api/events`)

if(!res.ok) return

const data = await res.json()

setEvents(data)

}catch(err){

console.error(err)

}finally{

setLoading(false)

}

}

async function handleDelete(id:number){

await fetch(`${API_BASE}/api/admin/events/${id}`,{
method:"DELETE",
credentials:"include"
})

loadEvents()

}

useEffect(()=>{
loadEvents()
},[])

if(loading){
return <div className="p-10">Loading events...</div>
}

return(
    <AdminLayout>

<div className="p-10 max-w-4xl mx-auto">

<h1 className="text-2xl font-bold mb-6">
Manage Events
</h1>

<button
onClick={()=>{
setSelectedEvent(undefined)
setShowModal(true)
}}
className="mb-6 px-4 py-2 bg-black text-white rounded-md"
>
Add Event
</button>

<div className="space-y-4">

{events.map(event=>{

const date = new Date(event.eventDateTime)

return(

<div
key={event.id}
className="border rounded-xl p-5 flex justify-between items-center bg-white shadow-sm hover:shadow-md transition"
>

<div>

<h3 className="font-semibold text-lg">
{event.eventName}
</h3>

<p className="text-sm text-gray-500">
{date.toLocaleDateString()} • {date.toLocaleTimeString([],{
hour:"2-digit",
minute:"2-digit"
})}
</p>

<p className="text-sm text-gray-600">
{event.venue}
</p>

</div>

<div className="flex gap-3">

<button
onClick={()=>{
setSelectedEvent(event)
setShowModal(true)
}}
className="px-3 py-1 border rounded-md text-sm"
>
Edit
</button>

<button
onClick={()=>handleDelete(event.id)}
className="px-3 py-1 border rounded-md text-sm text-red-600"
>
Delete
</button>

</div>

</div>

)

})}

</div>

<AdminEventModal
isOpen={showModal}
onClose={()=>setShowModal(false)}
onSuccess={loadEvents}
event={selectedEvent}
/>

</div>
</AdminLayout>
)

}