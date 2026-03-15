import { useEffect,useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Image, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const galleryImages = [
  { id: 1, src: '/gallery/cuj-admin-building.png', title: 'Administrative Building', category: 'Campus', year: '2026' },
  { id: 2, src: '/gallery/cuj-science-building.jpeg', title: 'Science Building', category: 'Campus', year: '2026' },
  { id: 3, src: '/gallery/cuj-green-building.jpeg', title: 'Arts Building', category: 'Campus', year: '2026' },
  { id: 4, src: '/gallery/cuj-mba-building.jpeg', title: 'MBA Building', category: 'Campus', year: '2026' },
  { id: 5, src: '/gallery/cuj-library-1.png', title: 'University Library', category: 'Facilities', year: '2026' },
  { id: 6, src: '/gallery/cuj-classroom.png', title: 'Science Building Class Room', category: 'Campus', year: '2026' },
  { id: 7, src: '/gallery/ugadi-celebrations-2025.jpeg', title: 'Ugadi Celebrations 2025', category: 'Events', year: '2025' },
  { id: 8, src: '/gallery/cuj-independence-day-2025.jpeg', title: 'Independence Day 2025', category: 'Meetup', year: '2025' },
  { id: 9, src: '/gallery/get-together-2025.png', title: 'Get Together 2025', category: 'Meetup', year: '2025' },

];

const categories = ['All', 'Festival', 'Event', 'Meetup', 'Competition', 'Activity', 'Welcome'];

const Gallery = () => {
  useEffect(()=>{
document.title="Gallery | CUJ Telugu Community"
},[])
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredImages = activeCategory === 'All' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory);

  const currentIndex = selectedImage ? filteredImages.findIndex(img => img.id === selectedImage.id) : -1;

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setSelectedImage(filteredImages[currentIndex - 1]);
    }
  };

  const goToNext = () => {
    if (currentIndex < filteredImages.length - 1) {
      setSelectedImage(filteredImages[currentIndex + 1]);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen py-10">
        {/* Hero Section */}
        <div className="gradient-hero py-16 mb-10">
          <div className="container mx-auto px-4 text-center">
            {/* <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-lavender/50 border border-lavender text-accent-foreground mb-6"> */}
              {/* <Image className="w-4 h-4" /> */}
              {/* <span className="text-sm font-medium">Memories</span> */}
            {/* </div> */}
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
              Photo Gallery
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Relive the beautiful moments from our celebrations, events, and gatherings
            </p>
          </div>
        </div>

        {/* Filter Tabs */}
        {/* <div className="container mx-auto px-4 mb-8">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveCategory(category)}
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>
        </div> */}

        {/* Gallery Grid */}
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredImages.map((image, index) => (
              <div
                key={image.id}
                className="group relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer shadow-soft animate-scale-in"
                style={{ animationDelay: `${index * 50}ms` }}
                onClick={() => setSelectedImage(image)}
              >
                <img
                  src={image.src}
                  alt={`${image.title}-Central University of Jharkhand`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-primary-foreground font-medium text-sm">{image.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary" className="text-xs">{image.category}</Badge>
                    <span className="text-primary-foreground/70 text-xs">{image.year}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredImages.length === 0 && (
            <div className="text-center py-20">
              <Image className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No photos in this category yet.</p>
            </div>
          )}
        </div>
      </div>

      {/* Image Modal */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-5xl p-0 overflow-hidden bg-background/95 backdrop-blur-md">
          {selectedImage && (
            <div className="relative">
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="w-full h-auto max-h-[80vh] object-contain"
              />
              
              {/* Navigation */}
              <div className="absolute inset-y-0 left-0 flex items-center">
                <Button
                  variant="ghost"
                  size="icon"
                  className="ml-2 bg-background/50 hover:bg-background/80"
                  onClick={goToPrevious}
                  disabled={currentIndex === 0}
                >
                  <ChevronLeft className="w-6 h-6" />
                </Button>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center">
                <Button
                  variant="ghost"
                  size="icon"
                  className="mr-2 bg-background/50 hover:bg-background/80"
                  onClick={goToNext}
                  disabled={currentIndex === filteredImages.length - 1}
                >
                  <ChevronRight className="w-6 h-6" />
                </Button>
              </div>

              {/* Info */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-foreground/90 to-transparent">
                <h3 className="text-primary-foreground font-heading text-xl font-semibold">
                  {selectedImage.title}
                </h3>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="secondary">{selectedImage.category}</Badge>
                  <span className="text-primary-foreground/70 text-sm">{selectedImage.year}</span>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Gallery;
