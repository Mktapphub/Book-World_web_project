import { NavLink } from "react-router-dom";
import { ShoppingCart, Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { useAppSelector } from "@/store/hooks";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const totalQty = useAppSelector((s) => s.cart.items.reduce((acc, i) => acc + i.quantity, 0));

  const linkCls = ({ isActive }: { isActive: boolean }) =>
    `${isActive ? "text-primary" : "text-foreground"} hover:text-primary transition-colors`;

  return (
    <>
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-background/70 border-b">
        <div className="container flex h-16 items-center justify-between">
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <NavLink to="/" className="text-xl font-bold font-display story-link">Book World</NavLink>
          </motion.div>
          
          {/* Desktop nav */}
          <nav className="hidden md:flex gap-6">
            <NavLink to="/shop" className={linkCls}>Shop</NavLink>
            <NavLink to="/about" className={linkCls}>About</NavLink>
            <NavLink to="/contact" className={linkCls}>Contact</NavLink>
            <NavLink to="/dashboard" className={linkCls}>Dashboard</NavLink>
          </nav>
          
          <div className="flex items-center gap-3">
            <NavLink to="/cart" className="relative">
              <Button variant="secondary" size="sm">
                <ShoppingCart />
                <span className="hidden sm:inline ml-1">Cart</span>
              </Button>
              {totalQty > 0 && (
                <span className="absolute -right-2 -top-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs px-1">
                  {totalQty}
                </span>
              )}
            </NavLink>
            <ThemeToggle />
            
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="fixed right-0 top-0 h-full w-64 bg-background border-l p-6 shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-8">
                <span className="text-lg font-semibold">Menu</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <X />
                </Button>
              </div>
              
              <div className="flex flex-col gap-4">
                <NavLink 
                  to="/shop" 
                  className={linkCls} 
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Shop
                </NavLink>
                <NavLink 
                  to="/about" 
                  className={linkCls}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </NavLink>
                <NavLink 
                  to="/contact" 
                  className={linkCls}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </NavLink>
                <NavLink 
                  to="/dashboard" 
                  className={linkCls}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </NavLink>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
