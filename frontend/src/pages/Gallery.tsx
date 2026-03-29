import { useEffect, useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

/*
  GROUPED DATA (YOU CONTROL THIS)
*/
const galleryGroups = [
  {
    id: 1,
    title: 'Campus Tour',
    cover: '/gallery/cuj-admin-building.png',
    images: [
      { id: 1, src: '/gallery/cuj-admin-building.png', title: 'Administrative Building' },
      { id: 2, src: '/gallery/cuj-science-building.jpeg', title: 'Science Building' },
      { id: 3, src: '/gallery/cuj-green-building.jpeg', title: 'Arts Building' },
      { id: 4, src: '/gallery/cuj-mba-building.jpeg', title: 'MBA Building' },
    ],
  },
  {
    id: 2,
    title: 'Ugadi Celebrations 2026',
    cover: '/gallery/Ugadi_Invitation_2026.png',
    images: [
      { id: 5, src: '/gallery/ugadi-2026-class.jpeg', title: 'Ugadi Celebrations 2026' },
      {id: 6, src: '/gallery/ugadi-2026-rh.jpeg', title: 'Ugadi Celebrations 2026' },
      { id: 7, src: '/gallery/ugadi-2026-labgroup.jpg', title: 'Ugadi Celebrations 2026' },
      { id: 8, src: '/gallery/ugadi-2026-bva.jpg', title: '3rd Year Students' },
      { id: 9, src: '/gallery/ugadi-2026-geoinfo.jpeg', title: 'Geo Informatics Students' },
       
    ],
  },
  {
    id: 3,
    title: 'Independence Day 2025',
    cover: '/gallery/cuj-independence-day-2025.jpeg',
    images: [
      { id: 10, src: '/gallery/cuj-independence-day-2025.jpeg', title: 'Independence Day' },
    ],
  },
  {
    id: 4,
    title: 'Ugadi Celebrations 2025',
    cover: '/gallery/ugadi-celebrations-2025.jpeg',
    images: [
      { id: 11, src: '/gallery/ugadi-celebrations-2025.jpeg', title: 'Ugadi Celebrations 2025' },
    ],
  },
  {
    id: 5,
    title: 'Get Together 2025',
    cover: '/gallery/get-together-2025.png',
    images: [
      { id: 12, src: '/gallery/get-together-2025.png', title: 'Get Together 2025' },
    ],
  },
  
];

const Gallery = () => {
  useEffect(() => {
    document.title = "Gallery | CUJ Telugu Community";
  }, []);

  const [activeGroup, setActiveGroup] = useState<typeof galleryGroups[0] | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  /*
    SLIDESHOW LOGIC (FASTER NOW)
  */
  useEffect(() => {
    if (!activeGroup || isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev < activeGroup.images.length - 1 ? prev + 1 : 0
      );
    }, 2000);

    return () => clearInterval(interval);
  }, [activeGroup, isPaused]);

  const goNext = () => {
    if (!activeGroup) return;
    setCurrentIndex((prev) =>
      prev < activeGroup.images.length - 1 ? prev + 1 : 0
    );
  };

  const goPrev = () => {
    if (!activeGroup) return;
    setCurrentIndex((prev) =>
      prev > 0 ? prev - 1 : activeGroup.images.length - 1
    );
  };

  return (
    <Layout>
      <div className="min-h-screen py-10">

        {/* HERO */}
        <div className="gradient-hero py-16 mb-10 text-center">
          <h1 className="text-4xl font-bold mb-4">Photo Gallery</h1>
          <p className="text-muted-foreground">
             Relive the beautiful moments from our celebrations, events, and gatherings
          </p>
        </div>

        {/* GRID */}
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

            {galleryGroups.map((group, index) => (
              <div
                key={group.id}
                className="group relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer shadow-soft animate-scale-in"
                style={{ animationDelay: `${index * 50}ms` }}
                onClick={() => {
                  setActiveGroup(group);
                  setCurrentIndex(0);
                }}
              >
                <img
                  src={group.cover}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* TEXT (restored style) */}
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-primary-foreground font-medium text-sm">
                    {group.title}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-primary-foreground/70 text-xs">
                      {group.images.length} photos
                    </span>
                  </div>
                </div>
              </div>
            ))}

          </div>
        </div>
      </div>

      {/* MODAL */}
     <Dialog open={!!activeGroup} onOpenChange={() => setActiveGroup(null)}>
  <DialogContent className="max-w-5xl p-0 overflow-hidden bg-background/95 backdrop-blur-md">

    {activeGroup && (
      <div className="relative">

        {/* SLIDER */}
        <div
          className="w-full overflow-hidden flex justify-center"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          <div
            className="flex transition-transform duration-1000 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {activeGroup.images.map((img) => (
              <div
                key={img.id}
                className="w-full flex-shrink-0 flex items-center justify-center h-full"
              >
                <img
                  src={img.src}
                  className="max-h-full max-w-full object-contain "
                />
              </div>
            ))}
          </div>
        </div>

        {/* PREV */}
        <div className="absolute inset-y-0 left-0 flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="ml-2 bg-background/50 hover:bg-background/80"
            onClick={goPrev}
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
        </div>

        {/* NEXT */}
        <div className="absolute inset-y-0 right-0 flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="mr-2 bg-background/50 hover:bg-background/80"
            onClick={goNext}
          >
            <ChevronRight className="w-6 h-6" />
          </Button>
        </div>

        {/* INFO */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-foreground/90 to-transparent">
          <h3 className="text-primary-foreground text-xl font-semibold">
            {activeGroup.images[currentIndex].title}
          </h3>
        </div>

      </div>
    )}

  </DialogContent>
</Dialog>
    </Layout>
  );
};

export default Gallery;