import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { removeFromCart, updateQuantity } from "@/store/slices/cartSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function Cart() {
  const items = useAppSelector((s) => s.cart.items);
  const dispatch = useAppDispatch();
  const subtotal = items.reduce((acc, i) => acc + i.quantity * i.book.price, 0);

  return (
    <div className="container pt-6 md:pt-10 pb-32 md:pb-10">
      <Helmet>
        <title>Your Cart | Book World</title>
        <meta name="description" content="Review your Book World cart and proceed to checkout." />
        <link rel="canonical" href="/cart" />
      </Helmet>
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
      {items.length === 0 ? (
        <p>Cart is empty. <Link to="/shop" className="story-link">Continue shopping</Link></p>
      ) : (<>
        <div className="grid gap-8 md:grid-cols-[2fr_1fr]">
          <div className="grid gap-4">
            {items.map(({ book, quantity }) => (
              <div key={book.id} className="flex items-center gap-4 border rounded-md p-4">
                <img src={book.image} alt={`${book.title} cover`} className="w-16 h-20 object-cover rounded" />
                <div className="flex-1">
                  <p className="font-medium">{book.title}</p>
                  <p className="text-sm text-muted-foreground">by {book.author}</p>
                  <p className="text-sm mt-1">${(book.price / 100).toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    min={1}
                    value={quantity}
                    onChange={(e) => dispatch(updateQuantity({ id: book.id, quantity: Number(e.target.value) }))}
                    className="w-20"
                  />
                  <Button variant="outline" onClick={() => dispatch(removeFromCart(book.id))}>Remove</Button>
                </div>
              </div>
            ))}
          </div>
          <div className="border rounded-md p-4 h-fit">
            <h2 className="font-semibold mb-2">Order Summary</h2>
            <p className="flex justify-between"><span>Subtotal</span> <span>${(subtotal / 100).toFixed(2)}</span></p>
            <p className="flex justify-between text-sm text-muted-foreground"><span>Shipping</span> <span>Calculated at checkout</span></p>
            <Link to="/checkout">
              <Button className="hidden md:block w-full mt-4 btn-hero">Proceed to Checkout</Button>
            </Link>
          </div>
        </div>

        {/* Mobile sticky checkout bar */}
        <div className="md:hidden fixed bottom-0 inset-x-0 border-t bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-40">
          <div className="container py-3 flex items-center justify-between gap-4" style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 12px)" }}>
            <span className="text-lg font-semibold">${(subtotal / 100).toFixed(2)}</span>
            <Link to="/checkout">
              <Button size="lg" className="btn-hero micro-bounce">Checkout</Button>
            </Link>
          </div>
        </div>
        </>)}
    </div>
  );
}
