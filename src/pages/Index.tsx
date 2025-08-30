import { Helmet } from "react-helmet-async";
import heroImage from "@/assets/hero-books.jpg";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "@/store/hooks";
import BookCard from "@/components/BookCard";
import { motion } from "framer-motion";

const Index = () => {
  const books = useAppSelector((s) => s.books.items);
  const featured = [...books].sort((a, b) => b.rating - a.rating).slice(0, 4);

  return (
    <div>
      <Helmet>
        <title>Book World — Discover and Shop Books Online</title>
        <meta name="description" content="Book World: Buy bestsellers, new releases, and classics. Shop by genre, author, and rating." />
        <link rel="canonical" href="/" />
      </Helmet>

      <section className="relative">
        <div className="container pt-10 md:pt-14 pb-8 md:pb-14 grid gap-8 md:grid-cols-2 items-center">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-4xl md:text-5xl font-display font-bold leading-tight">
              Find your next favorite book
            </h1>
            <p className="mt-4 text-muted-foreground max-w-prose">
              Explore curated picks, timeless classics, and hidden gems. Seamless shopping with a delightful reading experience.
            </p>
            <div className="mt-6 flex gap-3">
              <NavLink to="/shop">
                <Button variant="hero" size="lg" className="micro-bounce">Shop Now</Button>
              </NavLink>
              <NavLink to="/about">
                <Button variant="outline" size="lg" className="micro-bounce">Learn More</Button>
              </NavLink>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.1 }}>
            <img data-parallax="0.25" src={heroImage} alt="Book World bookstore hero banner with elegant bookshelves" className="w-full rounded-xl shadow-glow" loading="eager" />
          </motion.div>
        </div>
      </section>

      <section className="container py-8 md:py-12">
        <h2 className="text-2xl font-semibold mb-6">Trending Picks</h2>
        <div className="reveal-on-scroll grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {featured.map((b) => (
            <BookCard key={b.id} book={b} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Index;
