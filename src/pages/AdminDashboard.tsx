import { Helmet } from "react-helmet-async";

export default function AdminDashboard() {
  return (
    <div className="container py-10">
      <Helmet>
        <title>Admin Dashboard | Book World</title>
        <meta name="description" content="Manage books and view orders in the admin panel." />
        <link rel="canonical" href="/admin" />
      </Helmet>
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <p className="text-muted-foreground">Coming soon: add/edit/delete books, view orders.</p>
    </div>
  );
}
