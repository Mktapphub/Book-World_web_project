import { useMemo, useState, useEffect } from "react";
import { useAppSelector } from "@/store/hooks";
import BookCard from "@/components/BookCard";
import BookGridSkeleton from "@/components/BookGridSkeleton";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Helmet } from "react-helmet-async";

export default function Shop() {
  const books = useAppSelector((s) => s.books.items);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("popular");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(t);
  }, []);

  const filtered = useMemo(() => {
    let arr = books.filter((b) =>
      [b.title, b.author, b.category].join(" ").toLowerCase().includes(query.toLowerCase())
    );
    if (sort === "price-asc") arr = [...arr].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") arr = [...arr].sort((a, b) => b.price - a.price);
    if (sort === "rating") arr = [...arr].sort((a, b) => b.rating - a.rating);
    return arr;
  }, [books, query, sort]);

  return (
    <div className="container pt-6 md:pt-10 pb-10">
      <Helmet>
        <title>Shop Books | Book World</title>
        <meta name="description" content="Browse and shop books at Book World. Filter, search, and sort your next read." />
        <link rel="canonical" href="/shop" />
      </Helmet>
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        <Input placeholder="Search by title, author, category" value={query} onChange={(e) => setQuery(e.target.value)} />
        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger className="w-full md:w-56">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="popular">Most Popular</SelectItem>
            <SelectItem value="price-asc">Price: Low to High</SelectItem>
            <SelectItem value="price-desc">Price: High to Low</SelectItem>
            <SelectItem value="rating">Top Rated</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="reveal-on-scroll grid gap-6 mt-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {loading ? (
          <BookGridSkeleton count={8} />
        ) : (
          filtered.map((book) => (
            <BookCard key={book.id} book={book} />
          ))
        )}
      </div>
    </div>
  );
}
