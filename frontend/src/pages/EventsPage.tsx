import { useEffect, useState } from "react"
import { Event } from "@/types/event"
import EventsTabs from "@/components/events/EventsTabs"
import EventsGrid from "@/components/events/EventsGrid"
import { Layout } from "@/components/layout/Layout"

export default function EventsPage() {

  useEffect(()=>{
document.title="Events | CUJ Telugu Community"
},[])
  const API_BASE = import.meta.env.VITE_API_URL

  const [events, setEvents] = useState<Event[]>([])
  const [activeTab, setActiveTab] = useState("UPCOMING")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchEvents()
  }, [activeTab])

  const fetchEvents = async () => {

    try {

      setLoading(true)

      const endpoint =
        activeTab === "UPCOMING"
          ? "/api/events/upcoming"
          : "/api/events/past"

      const res = await fetch(
        `${API_BASE}${endpoint}`,
        { credentials: "include" }
      )

      if (!res.ok) {
        throw new Error("Failed to fetch events")
      }

      const data = await res.json()

      setEvents(data)

    } catch (error) {

      console.error("Failed to load events", error)

    } finally {

      setLoading(false)

    }
  }

  return (
    <Layout>

      <div className="mb-24">

        {/* HERO */}

        <section className="w-full bg-gradient-to-b from-[#f3dfb4] via-[#f6e8cb] to-white py-16">

          <div className="max-w-6xl mx-auto text-center px-6">

            <h1 className="text-4xl md:text-5xl font-bold text-[#1b2b40]">
              Community Events
            </h1>

            <div className="w-16 h-1 bg-orange-500 mx-auto mt-4 rounded"></div>

            <p className="text-lg text-gray-700 mt-6 max-w-xl mx-auto">
              Discover cultural celebrations, meetups, and gatherings organized
              by the Telugu community at CUJ.
            </p>

          </div>

        </section>

        {/* TABS */}

        <div className="flex justify-center mt-6">
          <EventsTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </div>

        {/* EVENTS GRID */}

        <div className="max-w-6xl mx-auto px-6 py-12">

          {loading && (
            <div className="text-center py-20 text-gray-500">
              Loading events...
            </div>
          )}

          {!loading && events.length === 0 && (
            <div className="text-center py-20">

              <h3 className="text-xl font-semibold text-gray-700">
                No events available
              </h3>

              <p className="text-gray-500 mt-2">
                Please check again later.
              </p>

            </div>
          )}

          {!loading && events.length > 0 && (

            <EventsGrid
              events={events}
              onSelectEvent={() => {}}
            />

          )}

        </div>

      </div>

    </Layout>
  )
}