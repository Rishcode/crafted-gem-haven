
import { Link } from "react-router-dom";
import { CATEGORIES } from "@/utils/types";

const Categories = () => {
  return (
    <section className="bg-secondary/50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-serif font-semibold mb-2">Shop By Category</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Browse our curated collection of handcrafted jewelry and artisan materials
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((category) => (
            <Link to={`/category/${category.name.toLowerCase()}`} key={category.id}>
              <div className="group relative overflow-hidden rounded-lg h-60 card-shadow">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url(${category.imageUrl})` }}
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300" />
                
                <div className="relative h-full flex flex-col items-center justify-center text-center p-6">
                  <h3 className="text-xl md:text-2xl font-serif font-medium text-white mb-2">
                    {category.name}
                  </h3>
                  <p className="text-white/80 text-sm max-w-xs">
                    {category.description}
                  </p>
                  <div className="mt-4 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium hover:bg-white/30 transition-colors">
                    Shop Now
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
