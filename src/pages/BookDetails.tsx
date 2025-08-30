import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addToCart } from "@/store/slices/cartSlice";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";

export default function BookDetails() {
  const { id } = useParams();
  const book = useAppSelector((s) => s.books.items.find((b) => b.id === id));
  const dispatch = useAppDispatch();

  if (!book) return <div className="container py-10">Book not found.</div>;

  return (
    <>
      <div className="container pt-6 md:pt-10 pb-32 md:pb-10 grid gap-6 md:grid-cols-2">
        <Helmet>
          <title>{book.title} | Book World</title>
          <meta name="description" content={`Buy ${book.title} by ${book.author}. ${book.description}`} />
          <link rel="canonical" href={`/book/${book.id}`} />
        </Helmet>
        <img src={book.image} alt={`${book.title} cover`} className="w-full rounded-md shadow-glow aspect-[3/4] object-cover" loading="lazy" />
        <div>
          <h1 className="text-3xl font-bold font-display mb-2">{book.title}</h1>
          <p className="text-muted-foreground mb-4">by {book.author}</p>
          <p className="mb-4">⭐ {book.rating.toFixed(1)} • {book.category}</p>
          <p className="mb-6 text-lg">{book.description}</p>
          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-4">
            <span className="text-2xl font-semibold">${(book.price / 100).toFixed(2)}</span>
            <Button className="btn-hero micro-bounce" onClick={() => dispatch(addToCart(book))}>Add to Cart</Button>
          </div>
        </div>
      </div>

      {/* Mobile sticky action bar */}
      <div className="md:hidden fixed bottom-0 inset-x-0 border-t bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-40">
        <div className="container py-3 flex items-center justify-between gap-4" style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 12px)" }}>
          <span className="text-lg font-semibold">${(book.price / 100).toFixed(2)}</span>
          <Button size="lg" className="btn-hero micro-bounce" onClick={() => dispatch(addToCart(book))}>
            Add to Cart
          </Button>
        </div>
      </div>
    </>
  );
}
