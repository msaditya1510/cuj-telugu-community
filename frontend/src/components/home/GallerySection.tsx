import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Plus, Trash2, Upload } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface GalleryImage {
  id: number;
  src: string;
  title: string;
  category: string;
  createdAt?: string;
}

const sampleImages: GalleryImage[] = [
  {
    id: 1,
    src: "gallery/ugadi-celebrations-2025.jpeg?w=1200&h=800&fit=crop",
    title: "Ugadi Celebrations 2025",
    category: "Festival",
  },
  {
    id: 2,
    src: "gallery/cuj-independence-day-2025.jpeg?w=1200&h=800&fit=crop",
    title: "Independence Day 2025",
    category: "Meetup",
  },
  {
    id: 3,
    src: "gallery/get-together-2025.png?w=1200&h=800&fit=crop",
    title: "Get Together 2025",
    category: "Meetup",
  },
  // 
];

export const GallerySection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const { toast } = useToast();

  const [images, setImages] = useState<GalleryImage[]>(sampleImages);
  const [current, setCurrent] = useState(1);
  const [transition, setTransition] = useState(true);
  const [showUpload, setShowUpload] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [newImage, setNewImage] = useState({
    title: "",
    category: "",
    imageUrl: "",
  });

  const [isAdmin, setIsAdmin] = useState(false);

  const extendedImages = [
    images[images.length - 1],
    ...images,
    images[0],
  ];

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser") || "{}");
    setIsAdmin(["CHAIRMAN", "ADMIN"].includes(user.role));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTransition(true);
      setCurrent((prev) => prev + 1);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (current === 0) {
      setTimeout(() => {
        setTransition(false);
        setCurrent(images.length);
      }, 800);
    }

    if (current === images.length + 1) {
      setTimeout(() => {
        setTransition(false);
        setCurrent(1);
      }, 800);
    }
  }, [current, images.length]);

  const prev = () => {
    setTransition(true);
    setCurrent((prev) => prev - 1);
  };

  const next = () => {
    setTransition(true);
    setCurrent((prev) => prev + 1);
  };

  const uploadImage = async () => {
    if (!newImage.title || !newImage.category || !newImage.imageUrl) {
      toast({
        title: "Error",
        description: "Fill all fields",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);

    await new Promise((r) => setTimeout(r, 1000));

    const newId = Math.max(...images.map((i) => i.id)) + 1;

    setImages((prev) => [
      ...prev,
      {
        id: newId,
        src: newImage.imageUrl,
        title: newImage.title,
        category: newImage.category,
      },
    ]);

    setUploading(false);
    setShowUpload(false);

    setNewImage({
      title: "",
      category: "",
      imageUrl: "",
    });

    toast({
      title: "Success",
      description: "Image added",
    });
  };

  const deleteImage = (id: number) => {
    setImages((prev) => prev.filter((img) => img.id !== id));

    toast({
      title: "Deleted",
      description: "Image removed",
    });
  };

  return (
    <section
  ref={ref}
  className={`py-24 bg-gradient-to-b from-[#faf7f2] to-white transition-all duration-500 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-14">

          {/* <div className="inline-flex px-4 py-2 rounded-full bg-orange-100 text-orange-600 text-sm font-medium mb-4">
            📸 Community Memories
          </div> */}

          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Our Gallery
          </h2>

          <p className="text-muted-foreground max-w-xl mx-auto">
            Relive our celebrations and events
          </p>

          {isAdmin && (
            <Dialog open={showUpload} onOpenChange={setShowUpload}>
              <DialogTrigger asChild>
                <Button className="mt-6">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Image
                </Button>
              </DialogTrigger>

              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Gallery Image</DialogTitle>
                </DialogHeader>

                <div className="space-y-4">

                  <div>
                    <Label>Title</Label>
                    <Input
                      value={newImage.title}
                      onChange={(e) =>
                        setNewImage((p) => ({ ...p, title: e.target.value }))
                      }
                    />
                  </div>

                  <div>
                    <Label>Category</Label>

                    <Select
                      onValueChange={(v) =>
                        setNewImage((p) => ({ ...p, category: v }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectItem value="Festival">Festival</SelectItem>
                        <SelectItem value="Event">Event</SelectItem>
                        <SelectItem value="Meetup">Meetup</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Image URL</Label>
                    <Input
                      value={newImage.imageUrl}
                      onChange={(e) =>
                        setNewImage((p) => ({ ...p, imageUrl: e.target.value }))
                      }
                    />
                  </div>

                  <Button onClick={uploadImage} disabled={uploading}>
                    <Upload className="w-4 h-4 mr-2" />
                    {uploading ? "Uploading..." : "Add Image"}
                  </Button>

                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>

        {/* Carousel */}

        <div className="relative max-w-6xl mx-auto overflow-hidden rounded-xl shadow-xl h-[450px]">

          <div
            className="flex h-full"
            style={{
              transform: `translateX(-${current * 100}%)`,
              transition: transition ? "transform 800ms ease" : "none",
            }}
          >
            {extendedImages.map((img, i) => (
              <div key={`${img.id}-${i}`} className="w-full flex-shrink-0 relative group">

                <img
  src={img.src}
  alt={img.title}
  className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105 group-hover:brightness-110"
/>

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                <div className="absolute bottom-8 left-8 text-white max-w-sm">

  <h3 className="text-2xl font-semibold leading-tight mb-1">
    {img.title}
  </h3>

  <p className="text-sm text-white/80 tracking-wide">
    {img.category}
  </p>

</div>

                {isAdmin && (
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => deleteImage(img.id)}
                    className="absolute top-4 right-4 opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}

              </div>
            ))}
          </div>

         <button
  onClick={prev}
  className="absolute left-6 top-1/2 -translate-y-1/2 bg-black/30 backdrop-blur-md p-3 rounded-full text-white hover:scale-110 transition"
>
            <ChevronLeft size={32} />
          </button>

          <button
  onClick={next}
  className="absolute right-6 top-1/2 -translate-y-1/2 bg-black/30 backdrop-blur-md p-3 rounded-full text-white hover:scale-110 transition"
>
            <ChevronRight size={32} />
          </button>

        </div>
      </div>
    </section>
  );
};