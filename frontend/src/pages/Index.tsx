import { Layout } from '@/components/layout/Layout';
import { HeroSection } from '@/components/home/HeroSection';
import { GallerySection } from '@/components/home/GallerySection';
import { EventsSection } from '@/components/home/EventsSection';
import { StatsSection } from '@/components/home/StatsSection';
import { useEffect } from 'react';

const Index = () => {
  useEffect(()=>{
document.title="CUJ Telugu Community | Central University of Jharkhand"
},[])
return ( 
<Layout>
  <HeroSection />
{/* <div className="h-24 bg-gradient-to-b from-transparent to-[#faf7f2]" /> */}
        <StatsSection />
<div className="h-24 bg-gradient-to-b from-white to-[#faf7f2]" />
    <EventsSection />
    <GallerySection />
    {/* <NewsSection /> */}

</Layout>

);
};

export default Index;
