import { useState, useEffect } from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { Paper } from "../../Api";
import { api } from "../../MyAPI";

export default function SingleProductView(): JSX.Element {
  const { PaperID } = useParams<{ PaperID: string }>();
  const navigate = useNavigate();
  const [paper, setPaper] = useState<Paper>();
  const [loading, setLoading] = useState<boolean>(true);
  const [, setError] = useState<string | null>(null);
  const [statusCode, updateStatusCode] = useState<number>(0);

  useEffect(() => {
    async function fetchPaper() {
      try {
        const response = await api.api.paperDetail(Number(PaperID));
        updateStatusCode(response.status);
        const data = response.data;
        setPaper(data);
      } catch (err) {
        console.log(err);
        setError("An unknown error occurred");
      } finally {
        setLoading(false);
      }
    }
    fetchPaper();
  }, [PaperID, statusCode]);

  function handleError(httpError: number) {
    switch (httpError) {
      case 204:
        return <Navigate to="/204" />;
      case 403:
        return <Navigate to="/403" />;
      case 404:
        return <Navigate to="/404" />;
      case 500:
        return <Navigate to="/500" />;
      default:
        return <div>Unknown error occurred</div>;
    }
  }

  if (loading) {
    return (
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
    );
  }

  if (statusCode !== 200) {
    return handleError(statusCode);
  }

  return (
    <div className="container mx-auto p-4">
      <div className="bg-gray-900 text-pink-500 shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">
          Product Details for: {paper?.name}
        </h1>
        <p className="mb-2">
          <strong>Product ID:</strong> {paper?.id}
        </p>
        <p className="mb-2">
          <strong>Description:</strong> {paper?.description}
        </p>
        <p className="mb-2">
          <strong>Price:</strong> {paper?.price}
        </p>
        <p className="mb-2">
          <strong>Discontinued:</strong> {paper?.discontinued ? "Yes" : "No"}
        </p>
        <p className="mb-2">
          <strong>Stock:</strong> {paper?.stock}
        </p>
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Properties</h2>
          <ul className="list-disc list-inside">
            {paper?.paperProperties?.map((property) => (
              <li key={property.propertyId}>
                {property.property?.propertyName}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex justify-center mt-6">
          <button className="btn btn-primary" onClick={() => navigate(-1)}>
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
