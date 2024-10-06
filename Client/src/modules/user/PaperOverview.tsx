import { useEffect, useState } from "react";
import { api } from "../../MyAPI";
import ProductCard from "../views/ProductCard";
import { Paper } from "../../Api";

export default function PaperOverview(): JSX.Element {
  const [papers, setPapers] = useState<Paper[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPapers() {
      try {
        const response = await api.api.paperGetPapersList();
        const data = response.data;
        setPapers(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchPapers();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Papers List</h1>
      {loading && (
        <div className="flex justify-center items-center h-screen">
          <div className="text-center">
            <div
              className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-pink-500"
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      )}
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {papers.map((paper) => (
          <ProductCard key={paper.id} paper={paper} />
        ))}
      </div>
    </div>
  );
}
