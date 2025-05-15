
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative pb-12">
      {/* Hero image with overlay */}
      <div className="relative h-[70vh] w-full overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1600721391776-b5cd0e0048f9?auto=format&fit=crop&w=2000&q=80')`,
          }}
        ></div>
        <div className="absolute inset-0 bg-black/30"></div>
        
        {/* Content */}
        <div className="container relative z-10 mx-auto h-full px-4 flex flex-col justify-center items-center text-center">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 animate-fade-in">
            Discover Handcrafted Treasures
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mb-8 animate-fade-in">
            Unique jewelry and materials crafted by talented artisans from around the world
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in">
            <Button 
              asChild
              size="lg" 
              className="bg-white hover:bg-white/90 text-primary hover:text-primary font-medium px-8"
            >
              <Link to="/category/necklaces">Shop Jewelry</Link>
            </Button>
            <Button 
              asChild
              variant="outline" 
              size="lg" 
              className="border-white text-white hover:bg-white/20 hover:text-white font-medium px-8"
            >
              <Link to="/category/materials">Browse Materials</Link>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Features section */}
      <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex flex-col items-center text-center p-4">
          <div className="h-14 w-14 rounded-full bg-secondary flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
              <circle cx="12" cy="12" r="10" />
              <path d="m9 12 2 2 4-4" />
            </svg>
          </div>
          <h3 className="text-xl font-serif font-semibold mb-2">Handcrafted Quality</h3>
          <p className="text-muted-foreground">Every piece is carefully made by skilled artisans with meticulous attention to detail.</p>
        </div>
        
        <div className="flex flex-col items-center text-center p-4">
          <div className="h-14 w-14 rounded-full bg-secondary flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
          </div>
          <h3 className="text-xl font-serif font-semibold mb-2">Artisan Support</h3>
          <p className="text-muted-foreground">Supporting independent artisans and sustainable crafting practices worldwide.</p>
        </div>
        
        <div className="flex flex-col items-center text-center p-4">
          <div className="h-14 w-14 rounded-full bg-secondary flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
              <path d="M17 12a5 5 0 0 0-5-5c-2.76 0-5 2.24-5 5s2.24 5 5 5a5 5 0 0 0 5-5" />
              <path d="M20 5v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h12a2 2 0 0 1 2 2" />
              <path d="M14 3.5v18" />
            </svg>
          </div>
          <h3 className="text-xl font-serif font-semibold mb-2">Unique Designs</h3>
          <p className="text-muted-foreground">One-of-a-kind pieces that you won't find in mainstream stores.</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
