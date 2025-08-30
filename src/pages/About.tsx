import { Helmet } from "react-helmet-async";

export default function About() {
  return (
    <div className="container pt-6 md:pt-10 pb-10">
      <Helmet>
        <title>About | Book World</title>
        <meta name="description" content="Learn about Book World's mission to bring stories to everyone." />
        <link rel="canonical" href="/about" />
      </Helmet>
      <h1 className="text-3xl font-bold font-display mb-4">About Book World</h1>
      <p className="text-muted-foreground max-w-2xl">We believe books can change lives. Book World curates a thoughtful selection and a delightful shopping experience for readers everywhere.</p>
    </div>
  );
}
