import React from "react";
import { Helmet } from "react-helmet-async";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAppSelector } from "@/store/hooks";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";

export default function UserDashboard() {
  const [tab, setTab] = React.useState<string>("profile");
  const rootRef = React.useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const cartItems = useAppSelector((s) => s.cart.items);
  const wishlistIds = useAppSelector((s) => s.wishlist.ids);
  const books = useAppSelector((s) => s.books.items);
  const favorites = React.useMemo(() => books.filter((b) => wishlistIds.includes(b.id)), [books, wishlistIds]);
  const subtotal = cartItems.reduce((acc, i) => acc + i.quantity * i.book.price, 0);

  React.useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".dash-hero", { y: 12, opacity: 0, duration: 0.4, ease: "power2.out" });
      gsap.from(".tab-card", { y: 12, opacity: 0, duration: 0.35, ease: "power2.out", stagger: 0.05, delay: 0.05 });
    }, rootRef);
    return () => ctx.revert();
  }, [tab]);

  const handleLogout = () => {
    toast({ title: "Authentication not connected", description: "Connect Supabase to enable login/logout.", duration: 2500 });
    navigate("/");
  };

  return (
    <div ref={rootRef} className="container pt-6 md:pt-10 pb-10">
      <Helmet>
        <title>User Dashboard | Book World</title>
        <meta name="description" content="Manage your profile, cart, favorites, and orders on Book World." />
        <link rel="canonical" href="/dashboard" />
      </Helmet>

      <header className="dash-hero mb-6 flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">User Dashboard</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleLogout}>Logout</Button>
        </div>
      </header>

      <Tabs value={tab} onValueChange={setTab} className="w-full">
        <TabsList className="mb-6 flex flex-wrap gap-2">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="cart">Cart</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="grid gap-6 md:grid-cols-[320px_1fr]">
          <article className="tab-card border rounded-md p-4">
            <h2 className="font-semibold mb-3">Profile</h2>
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src="" alt="User profile avatar placeholder" />
                <AvatarFallback>BW</AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <Button size="sm" variant="secondary" onClick={() => toast({ title: "Connect Supabase", description: "Enable avatar uploads after connecting Supabase.", duration: 2500 })}>
                  Upload new photo
                </Button>
                <p className="text-sm text-muted-foreground">Profile photo uploads require backend connection.</p>
              </div>
            </div>
          </article>

          <article className="tab-card border rounded-md p-4">
            <h2 className="font-semibold mb-3">Account details</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm mb-1 block">Name</label>
                <Input placeholder="Your name" disabled />
              </div>
              <div>
                <label className="text-sm mb-1 block">Email</label>
                <Input type="email" placeholder="you@example.com" disabled />
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-3">Sign in to edit profile details once authentication is enabled.</p>
          </article>
        </TabsContent>

        <TabsContent value="cart">
          <section className="grid gap-4">
            {cartItems.length === 0 ? (
              <p className="text-muted-foreground">Your cart is empty.</p>
            ) : (
              <>
                {cartItems.map(({ book, quantity }) => (
                  <div key={book.id} className="tab-card flex items-center gap-4 border rounded-md p-4 hover-scale">
                    <img src={book.image} alt={`${book.title} book cover`} className="w-16 h-20 object-cover rounded" loading="lazy" />
                    <div className="flex-1">
                      <p className="font-medium">{book.title}</p>
                      <p className="text-sm text-muted-foreground">by {book.author}</p>
                      <p className="text-sm mt-1">${(book.price / 100).toFixed(2)} × {quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm">Line total</p>
                      <p className="font-semibold">${((book.price * quantity) / 100).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
                <div className="tab-card border rounded-md p-4 flex items-center justify-between">
                  <p className="font-medium">Subtotal</p>
                  <p className="font-semibold">${(subtotal / 100).toFixed(2)}</p>
                </div>
              </>
            )}
          </section>
        </TabsContent>

        <TabsContent value="favorites">
          <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {favorites.length === 0 ? (
              <p className="text-muted-foreground">No favorites yet. Explore books and add some to your wishlist.</p>
            ) : (
              favorites.map((b) => (
                <article key={b.id} className="tab-card border rounded-md p-4 hover-scale">
                  <div className="flex items-center gap-4">
                    <img src={b.image} alt={`${b.title} favorite book cover`} className="w-16 h-20 object-cover rounded" loading="lazy" />
                    <div>
                      <h3 className="font-medium">{b.title}</h3>
                      <p className="text-sm text-muted-foreground">{b.author}</p>
                      <p className="text-sm mt-1">${(b.price / 100).toFixed(2)}</p>
                    </div>
                  </div>
                </article>
              ))
            )}
          </section>
        </TabsContent>

        <TabsContent value="orders">
          <article className="tab-card border rounded-md p-4">
            <h2 className="font-semibold mb-2">Order history</h2>
            <p className="text-muted-foreground">Orders will appear here once you complete purchases. Connect Supabase + Stripe to enable this.</p>
          </article>
        </TabsContent>
      </Tabs>
    </div>
  );
}
