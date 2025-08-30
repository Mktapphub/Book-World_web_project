import heroImage from "@/assets/hero-books.jpg";

export type Book = {
  id: string;
  title: string;
  author: string;
  price: number;
  rating: number; // 0-5
  image: string;
  description: string;
  category: string;
};

export const sampleBooks: Book[] = [
  {
    id: "bw-001",
    title: "The Infinite Library",
    author: "Ava Sterling",
    price: 1999,
    rating: 4.6,
    image: heroImage,
    description: "A mesmerizing journey through a library where every book opens a new universe.",
    category: "Fantasy",
  },
  {
    id: "bw-002",
    title: "Designing Tomorrow",
    author: "Liam Hart",
    price: 2499,
    rating: 4.4,
    image: heroImage,
    description: "A thoughtful exploration of how design shapes the future of everyday life.",
    category: "Non-Fiction",
  },
  {
    id: "bw-003",
    title: "Midnight Algorithms",
    author: "Zoe Kwan",
    price: 1799,
    rating: 4.2,
    image: heroImage,
    description: "A suspenseful tech thriller unraveling secrets buried in code.",
    category: "Thriller",
  },
  {
    id: "bw-004",
    title: "Echoes of Earth",
    author: "Ravi Mehta",
    price: 2299,
    rating: 4.8,
    image: heroImage,
    description: "A sweeping eco-sci-fi saga about humanity's bond with a living planet.",
    category: "Sci-Fi",
  },
  {
    id: "bw-005",
    title: "Quiet Coffee",
    author: "Mina Park",
    price: 1499,
    rating: 4.1,
    image: heroImage,
    description: "Heartwarming vignettes from a neighborhood cafe and its patrons.",
    category: "Contemporary",
  },
  {
    id: "bw-006",
    title: "Learning TypeScript",
    author: "Jason Fields",
    price: 2999,
    rating: 4.7,
    image: heroImage,
    description: "A friendly, practical guide to mastering TypeScript in modern apps.",
    category: "Programming",
  },
  {
    id: "bw-007",
    title: "Ocean Between Stars",
    author: "Nora Díaz",
    price: 1899,
    rating: 4.3,
    image: heroImage,
    description: "A lyrical odyssey of love and distance across sea and sky.",
    category: "Romance",
  },
  {
    id: "bw-008",
    title: "Micro Habits, Macro Impact",
    author: "Kenji Sato",
    price: 2099,
    rating: 4.5,
    image: heroImage,
    description: "Small daily improvements that compound into transformative change.",
    category: "Self-Help",
  },
];
