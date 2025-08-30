import { useAppSelector } from "@/store/hooks";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";
import { toast } from "@/hooks/use-toast";

export default function Checkout() {
  const items = useAppSelector((s) => s.cart.items);
  const total = items.reduce((acc, i) => acc + i.quantity * i.book.price, 0);

  return (
    <div className="container pt-6 md:pt-10 pb-32 md:pb-10">
      <Helmet>
        <title>Checkout | Book World</title>
        <meta name="description" content="Complete your purchase on Book World securely with Stripe test mode." />
        <link rel="canonical" href="/checkout" />
      </Helmet>
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      <div className="grid gap-8 md:grid-cols-[2fr_1fr]">
        <div className="border rounded-md p-4">
          <h2 className="font-semibold mb-3">Items</h2>
          <ul className="space-y-2">
            {items.map(({ book, quantity }) => (
              <li key={book.id} className="flex justify-between text-sm">
                <span>{book.title} × {quantity}</span>
                <span>${((book.price * quantity) / 100).toFixed(2)}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="border rounded-md p-4 h-fit">
          <h2 className="font-semibold mb-2">Total</h2>
          <p className="text-xl font-semibold">${(total / 100).toFixed(2)}</p>
          <Button className="hidden md:inline-flex w-full mt-4 btn-hero" onClick={() => {
            toast({ title: "Stripe setup pending", description: "We'll connect Stripe test mode via a Supabase Edge Function next." });
          }}>
            Pay with Stripe (Test)
          </Button>
        </div>
      </div>

      {/* Mobile sticky pay bar */}
      <div className="md:hidden fixed bottom-0 inset-x-0 border-t bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-40">
        <div className="container py-3 flex items-center justify-between gap-4" style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 12px)" }}>
          <span className="text-lg font-semibold">${(total / 100).toFixed(2)}</span>
          <Button size="lg" className="btn-hero micro-bounce" onClick={() => {
            toast({ title: "Stripe setup pending", description: "We'll connect Stripe test mode via a Supabase Edge Function next." });
          }}>
            Pay (Test)
          </Button>
        </div>
      </div>
    </div>
  );
}
