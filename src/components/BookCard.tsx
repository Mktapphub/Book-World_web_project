import { memo } from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart } from "lucide-react";
import type { Book } from "@/data/sampleBooks";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addToCart } from "@/store/slices/cartSlice";
import { toggleWishlist } from "@/store/slices/wishlistSlice";

interface Props { book: Book }

const BookCard = memo(({ book }: Props) => {
  const dispatch = useAppDispatch();
  const wishlisted = useAppSelector((s) => s.wishlist.ids.includes(book.id));

  return (
    <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
      <Card className="p-4 h-full flex flex-col gap-3 bg-card/60 backdrop-blur-sm">
<NavLink to={`/book/${book.id}`} aria-label={`View details for ${book.title}`} className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md">
  <img src={book.image} alt={`${book.title} cover`} className="w-full aspect-[3/4] object-cover rounded-md shadow-glow hover-scale" loading="lazy" />
</NavLink>
        <div className="flex-1">
<NavLink to={`/book/${book.id}`} className="story-link">
  <h3 className="text-base font-semibold leading-tight line-clamp-2">{book.title}</h3>
</NavLink>
          <p className="text-sm text-muted-foreground">by {book.author}</p>
          <p className="mt-1 text-sm">⭐ {book.rating.toFixed(1)}</p>
        </div>
        <div className="flex items-center justify-between mt-1">
          <span className="text-lg font-semibold">${(book.price / 100).toFixed(2)}</span>
          <div className="flex gap-2">
            <Button variant="secondary" size="sm" className="micro-bounce" onClick={() => dispatch(toggleWishlist(book.id))} aria-label="Toggle wishlist">
              <Heart className={wishlisted ? "fill-current" : ""} />
            </Button>
            <Button size="sm" className="micro-bounce" onClick={() => dispatch(addToCart(book))}>
              <ShoppingCart />
              <span className="sr-only">Add to cart</span>
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
});

export default BookCard;
