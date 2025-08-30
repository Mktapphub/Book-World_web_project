import { Helmet } from "react-helmet-async";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function Contact() {
  return (
    <div className="container pt-6 md:pt-10 pb-10">
      <Helmet>
        <title>Contact | Book World</title>
        <meta name="description" content="Contact Book World for support and inquiries." />
        <link rel="canonical" href="/contact" />
      </Helmet>
      <h1 className="text-3xl font-bold font-display mb-4">Contact Us</h1>
      <div className="max-w-xl space-y-4">
        <Input placeholder="Your email" aria-label="Your email" />
        <Textarea placeholder="Your message" aria-label="Your message" />
        <Button className="btn-hero w-full">Send</Button>
      </div>
    </div>
  );
}
