import { useEffect, useState } from "react";
import { Users, GraduationCap, CalendarDays, UserCheck } from "lucide-react";
import { API_BASE_URL } from "@/config/api";

interface Stats {
  totalStudents: number;
  totalProfessors: number;
  totalAlumni: number;
  totalEvents: number;
}

export const StatsSection = () => {

  const [stats, setStats] = useState<Stats>({
    totalStudents: 0,
    totalProfessors: 0,
    totalAlumni: 0,
    totalEvents: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {

    try {

      const res = await fetch(`${API_BASE_URL}/public/stats`);

      if (!res.ok) throw new Error("Failed to fetch stats");

      const data = await res.json();

      setStats(data);

    } catch (err) {
      console.error("Stats fetch failed", err);
    }
  };

  const cards = [
    {
      icon: Users,
      value: stats.totalStudents,
      label: "Students"
    },
    {
      icon: UserCheck,
      value: stats.totalProfessors,
      label: "Professors"
    },
    {
      icon: GraduationCap,
      value: stats.totalAlumni,
      label: "Alumni"
    },
    {
      icon: CalendarDays,
      value: stats.totalEvents,
      label: "Events"
    }
  ];

  return (
    <section className="relative -mt-20 pt-16 pb-24 bg-white overflow-hidden">

      {/* background glow */}
      <div className="absolute inset-0 flex justify-center pointer-events-none">
        <div className="w-[800px] h-[400px] bg-orange-200/20 blur-[120px] rounded-full"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6">

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">

          {cards.map((card, index) => {

            const Icon = card.icon;

            return (
              <div
                key={index}
                className="group bg-gradient-to-b from-[#faf7f2] to-[#f6f0e6] rounded-2xl p-8 text-center border border-[#f1e8da] shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >

                <div className="flex justify-center mb-4">

                  <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-orange-100 text-orange-600">

                    <Icon size={22} />

                  </div>

                </div>

                <div className="text-4xl font-bold text-orange-600 mb-2">

                  {card.value}+

                </div>

                <p className="text-sm text-muted-foreground">

                  {card.label}

                </p>

              </div>
            );
          })}

        </div>

      </div>

    </section>
  );
};