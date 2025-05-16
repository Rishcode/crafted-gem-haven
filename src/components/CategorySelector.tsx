
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CATEGORIES } from "@/utils/types";

const CategorySelector = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  // Determine if a category is currently active
  const isActive = (categoryPath: string) => {
    return currentPath === categoryPath;
  };

  return (
    <div className="w-full overflow-auto pb-2">
      <div className="flex gap-2 min-w-max">
        <Button 
          variant={isActive("/all-products") ? "default" : "outline"}
          size="sm"
          asChild
        >
          <Link to="/all-products">
            All Products
          </Link>
        </Button>
        
        {CATEGORIES.map((category) => (
          <Button
            key={category.id}
            variant={isActive(`/category/${category.name.toLowerCase()}`) ? "default" : "outline"}
            size="sm"
            asChild
          >
            <Link to={`/category/${category.name.toLowerCase()}`}>
              {category.name}
            </Link>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CategorySelector;
