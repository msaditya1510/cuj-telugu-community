import { Calendar, Clock, MapPin } from "lucide-react"
import { Event } from "@/types/event"

type Props = {
  event: Event
  onClick: () => void
}

export default function EventCard({ event, onClick }: Props) {
    const d = new Date(event.eventDateTime)

const date = d.toLocaleDateString("en-US",{
month:"short",
day:"numeric",
year:"numeric"
})

const time = d.toLocaleTimeString("en-US",{
hour:"numeric",
minute:"2-digit",
hour12:true
})

  return (
    <div
      onClick={onClick}
      className="
        cursor-pointer
        bg-white
        rounded-xl
        border
        shadow-sm
        hover:shadow-lg
        transition
        p-4
      "
    >

      {/* TITLE */}

      <h3 className="text-base font-semibold text-[#1b2b40] mb-1">
        {event.eventName}
      </h3>

      {/* DESCRIPTION */}

      <p className="text-sm text-gray-600 line-clamp-1 mb-3">
        {event.eventDescription}
      </p>

      {/* META */}

      <div className="flex flex-wrap gap-4 text-xs text-gray-600">

        <div className="flex items-center gap-1">
          <Calendar size={14}/>
          {date}
        </div>

        <div className="flex items-center gap-1">
          <Clock size={14}/>
          {time}
        </div>

        <div className="flex items-center gap-1">
          <MapPin size={14}/>
          {event.venue}
        </div>

      </div>

    </div>
  )
}