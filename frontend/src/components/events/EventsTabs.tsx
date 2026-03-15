type Props = {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export default function EventsTabs({ activeTab, setActiveTab }: Props) {

  return (
    <div className="flex gap-3 bg-white/60 backdrop-blur-sm p-2 rounded-full shadow-sm">

      <button
        onClick={() => setActiveTab("UPCOMING")}
        className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300
          ${activeTab === "UPCOMING"
            ? "bg-blue-600 text-white shadow"
            : "text-gray-600 hover:bg-gray-100"
          }`}
      >
        Upcoming Events
      </button>

      <button
        onClick={() => setActiveTab("PAST")}
        className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300
          ${activeTab === "PAST"
            ? "bg-blue-600 text-white shadow"
            : "text-gray-600 hover:bg-gray-100"
          }`}
      >
        Past Events
      </button>

    </div>
  )
}