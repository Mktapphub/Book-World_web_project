export default function Footer() {
  return (
    <footer className="border-t mt-12">
      <div className="container py-8 grid gap-4 md:grid-cols-3">
        <div>
          <h4 className="font-semibold">Book World</h4>
          <p className="text-sm text-muted-foreground">Your trusted online bookstore.</p>
        </div>
        <div className="text-sm">
          <a href="/shop" className="story-link">Shop</a><br />
          <a href="/about" className="story-link">About</a><br />
          <a href="/contact" className="story-link">Contact</a>
        </div>
        <p className="text-sm text-muted-foreground md:text-right">© {new Date().getFullYear()} Book World</p>
      </div>
    </footer>
  );
}
