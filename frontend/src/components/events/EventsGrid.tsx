import EventCard from "./EventCard"
import { Event } from "@/types/event"

type Props = {
  events: Event[]
  onSelectEvent: (event: Event) => void
}

export default function EventsGrid({ events, onSelectEvent }: Props) {

  return (

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

      {events.map((event) => (

        <EventCard
          key={event.id}
          event={event}
          onClick={() => onSelectEvent(event)}
        />

      ))}

    </div>

  )
}