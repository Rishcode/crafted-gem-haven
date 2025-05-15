
import Hero from "@/components/Hero";
import FeaturedProducts from "@/components/FeaturedProducts";
import Categories from "@/components/Categories";
import { Separator } from "@/components/ui/separator";

const Index = () => {
  return (
    <main>
      <Hero />
      <Separator />
      <FeaturedProducts />
      <Categories />
    </main>
  );
};

export default Index;
