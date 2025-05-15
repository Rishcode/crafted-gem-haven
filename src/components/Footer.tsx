
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-jewelry-50 pt-12 pb-6">
      <div className="container mx-auto px-4">
        {/* Newsletter */}
        <div className="bg-white rounded-lg p-6 shadow-sm mb-12">
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div>
              <h3 className="text-2xl font-serif font-semibold mb-2">
                Join our newsletter
              </h3>
              <p className="text-muted-foreground">
                Sign up to receive updates on new arrivals, special offers and artisan stories.
              </p>
            </div>
            <div>
              <form className="flex flex-col sm:flex-row gap-2">
                <Input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1"
                />
                <Button type="submit">Subscribe</Button>
              </form>
            </div>
          </div>
        </div>
        
        {/* Main Footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="font-serif text-lg font-medium mb-4">ArtisanGems</h4>
            <p className="text-muted-foreground text-sm mb-4">
              Connecting talented artisans with those who appreciate handcrafted jewelry and materials.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-primary">
                <span className="sr-only">Facebook</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              <a href="#" className="text-gray-600 hover:text-primary">
                <span className="sr-only">Instagram</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                </svg>
              </a>
              <a href="#" className="text-gray-600 hover:text-primary">
                <span className="sr-only">Pinterest</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm1 10c-1.66 0-3 1.34-3 3 0 1.31-1.16 2-2 2-.92 0-1.61-.6-1.67-1.27 0-.33.03-.66.07-1.01.07-.31.14-.61.26-.86.12-.24.35-.46.66-.46.48 0 .81.26.84.85 0 .17-.13.55-.13.55s-.32 1.19-.38 1.42c-.12.37-.11.57-.11.7 0 .17.05.35.15.51.11.15.28.27.48.32.45.1.92-.02 1.31-.41.42-.41.62-1.07.62-1.78 0-1.88-1.23-3.63-3.77-3.63-2.61 0-4.06 1.94-4.06 4.13 0 .73.14 1.4.43 1.96.05.1.08.21.07.33-.1.5-.32 1.58-.32 1.58-.05.21-.15.27-.34.16-1.26-.52-2.06-2.16-2.06-3.51 0-2.84 2.34-5.44 6.58-5.44 3.47 0 5.82 2.44 5.82 5.12 0 3.37-2.13 5.7-5.09 5.7-.99 0-1.93-.53-2.26-1.14 0 0-.49 1.91-.61 2.38-.22.87-.67 1.74-1.09 2.44.82.26 1.69.39 2.59.39 4.97 0 9-4.03 9-9s-4.03-9-9-9z" />
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-serif text-lg font-medium mb-4">Shop</h4>
            <ul className="space-y-2">
              <li><Link to="/category/necklaces" className="text-muted-foreground hover:text-primary">Necklaces</Link></li>
              <li><Link to="/category/earrings" className="text-muted-foreground hover:text-primary">Earrings</Link></li>
              <li><Link to="/category/bracelets" className="text-muted-foreground hover:text-primary">Bracelets</Link></li>
              <li><Link to="/category/rings" className="text-muted-foreground hover:text-primary">Rings</Link></li>
              <li><Link to="/category/materials" className="text-muted-foreground hover:text-primary">Materials</Link></li>
              <li><Link to="/all-products" className="text-muted-foreground hover:text-primary">All Products</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-serif text-lg font-medium mb-4">Information</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-muted-foreground hover:text-primary">About Us</Link></li>
              <li><Link to="/artisans" className="text-muted-foreground hover:text-primary">Our Artisans</Link></li>
              <li><Link to="/sustainability" className="text-muted-foreground hover:text-primary">Sustainability</Link></li>
              <li><Link to="/faq" className="text-muted-foreground hover:text-primary">FAQs</Link></li>
              <li><Link to="/terms" className="text-muted-foreground hover:text-primary">Terms & Conditions</Link></li>
              <li><Link to="/privacy" className="text-muted-foreground hover:text-primary">Privacy Policy</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-serif text-lg font-medium mb-4">Customer Care</h4>
            <ul className="space-y-2">
              <li><Link to="/contact" className="text-muted-foreground hover:text-primary">Contact Us</Link></li>
              <li><Link to="/shipping" className="text-muted-foreground hover:text-primary">Shipping Information</Link></li>
              <li><Link to="/returns" className="text-muted-foreground hover:text-primary">Returns & Exchanges</Link></li>
              <li><Link to="/size-guide" className="text-muted-foreground hover:text-primary">Size Guide</Link></li>
              <li><Link to="/care" className="text-muted-foreground hover:text-primary">Jewelry Care</Link></li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Footer */}
        <div className="pt-6 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} ArtisanGems. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <img src="https://cdn-icons-png.flaticon.com/128/5968/5968299.png" alt="Visa" className="h-6" />
              <img src="https://cdn-icons-png.flaticon.com/128/349/349228.png" alt="MasterCard" className="h-6" />
              <img src="https://cdn-icons-png.flaticon.com/128/196/196566.png" alt="PayPal" className="h-6" />
              <img src="https://cdn-icons-png.flaticon.com/128/5968/5968144.png" alt="Apple Pay" className="h-6" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
