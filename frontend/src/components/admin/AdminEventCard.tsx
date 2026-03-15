import { Calendar, Clock, MapPin } from "lucide-react"

type Event = {
  id: number
  eventName: string
  eventDescription: string
  date: string
  time: string
  venue: string
}

type Props = {
  event: Event
  onEdit: () => void
  onDelete: () => void
}



export default function AdminEventCard({ event, onEdit, onDelete }: Props) {

  return (
    <div className="bg-white border rounded-xl shadow-sm p-5">

      <h3 className="font-semibold text-[#1b2b40] mb-2">
        {event.eventName}
      </h3>

      <p className="text-sm text-gray-600 line-clamp-2 mb-4">
        {event.eventDescription}
      </p>

      <div className="text-xs text-gray-600 space-y-1 mb-4">

        <div className="flex items-center gap-2">
          <Calendar size={14}/> {event.date}
        </div>

        <div className="flex items-center gap-2">
          <Clock size={14}/> {event.time}
        </div>

        <div className="flex items-center gap-2">
          <MapPin size={14}/> {event.venue}
        </div>

      </div>

      <div className="flex gap-3">

        <button
          onClick={onEdit}
          className="text-sm bg-blue-500 text-white px-3 py-1 rounded"
        >
          Edit
        </button>

        <button
          onClick={onDelete}
          className="text-sm bg-red-500 text-white px-3 py-1 rounded"
        >
          Delete
        </button>

      </div>

    </div>
  )
}