import { useEffect, useState } from "react"
import { Calendar, MapPin, Clock, X } from "lucide-react"
import { API_BASE_URL } from "@/config/api"

interface Event {
  id: number
  eventName: string
  eventDescription?: string
  eventDateTime?: string
  venue?: string
}

export const EventsSection = () => {

  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)

  useEffect(() => {
    fetchUpcomingEvents()
  }, [])

  const fetchUpcomingEvents = async () => {

    try {

      const res = await fetch(`${API_BASE_URL}/api/events/upcoming`)

      if (!res.ok) throw new Error("Failed to fetch events")

      const data = await res.json()

      setEvents(data.slice(0, 3))

    } catch (err) {

      console.error("Event fetch error", err)

    } finally {

      setLoading(false)

    }

  }

  const formatDate = (dt?: string) => {

    if (!dt) return "Date TBD"

    const d = new Date(dt)

    return d.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric"
    })
  }

  const formatTime = (dt?: string) => {

    if (!dt) return ""

    const d = new Date(dt)

    return d.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    })
  }

  if (loading) {

    return (
      <section className="py-24 text-center">
        <p className="text-muted-foreground">Loading events...</p>
      </section>
    )

  }

  if (events.length === 0) {

    return (
      <section className="py-24 text-center">
        <p className="text-muted-foreground">No upcoming events</p>
      </section>
    )

  }

  return (

    <>
      <section className="py-20 bg-[#faf7f2] relative">

        <div className="absolute inset-0 bg-gradient-to-br from-orange-50/40 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6">

          {/* Title */}

          <div className="text-center mb-14">

            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Upcoming Events
            </h2>

            <p className="text-muted-foreground">
              Stay connected with our community activities
            </p>

          </div>

          {/* Grid */}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            {events.map((event) => (

              <div
                key={event.id}
                onClick={() => setSelectedEvent(event)}
                className="
                  cursor-pointer
                  bg-white
                  rounded-2xl
                  border border-gray-100
                  p-6
                  shadow-sm
                  hover:shadow-xl
                  hover:-translate-y-2
                  transition-all
                  duration-300
                "
              >

                {event.eventDateTime && (

                  <div className="inline-flex items-center gap-2 text-xs font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full mb-4">

                    <Calendar size={14}/>

                    {formatDate(event.eventDateTime)}

                  </div>

                )}

                <h3 className="text-lg font-semibold mb-2">
                  {event.eventName}
                </h3>

                {event.venue && (

                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">

                    <MapPin size={14}/>

                    {event.venue}

                  </div>

                )}

                {event.eventDescription && (

                  <p className="text-sm text-gray-500 line-clamp-3">
                    {event.eventDescription}
                  </p>

                )}

                <div className="mt-6 flex items-center text-primary text-sm font-medium">

                  View Details

                  <span className="ml-2 transition group-hover:translate-x-1">
                    →
                  </span>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* Modal */}

      {selectedEvent && (

        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4"
          onClick={() => setSelectedEvent(null)}
        >

          <div
            className="bg-white max-w-md w-full rounded-2xl p-8 shadow-2xl relative"
            onClick={(e)=>e.stopPropagation()}
          >

            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute right-4 top-4 text-muted-foreground hover:text-black"
            >
              <X size={22}/>
            </button>

            <h3 className="text-2xl font-bold mb-6">
              {selectedEvent.eventName}
            </h3>

            <div className="space-y-3 mb-6 text-sm text-muted-foreground">

              {selectedEvent.eventDateTime && (

                <div className="flex items-center gap-2">

                  <Calendar size={16}/>

                  {formatDate(selectedEvent.eventDateTime)}

                </div>

              )}

              {selectedEvent.eventDateTime && (

                <div className="flex items-center gap-2">

                  <Clock size={16}/>

                  {formatTime(selectedEvent.eventDateTime)}

                </div>

              )}

              {selectedEvent.venue && (

                <div className="flex items-center gap-2">

                  <MapPin size={16}/>

                  {selectedEvent.venue}

                </div>

              )}

            </div>

            {selectedEvent.eventDescription && (

              <p className="text-sm leading-relaxed text-muted-foreground">

                {selectedEvent.eventDescription}

              </p>

            )}

          </div>

        </div>

      )}

    </>
  )
}