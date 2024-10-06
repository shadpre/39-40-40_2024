import { Paper } from "../../Api";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  paper: Paper;
}

export default function ProductCard({ paper }: ProductCardProps): JSX.Element {
  const navigate = useNavigate();

  function onClick() {
    console.log("Product clicked");
    console.log(paper);
    // Navigate to the paper detail page
    navigate(`/paper/${paper.id}`);
  }

  return (
    <div className="container mx-auto p-4" onClick={onClick}>
      <div className="card w-full bg-base-100 shadow-xl card-bordered border-black">
        <div className="card-body">
          <h2 className="card-title">{paper.name || "Unnamed Paper"}</h2>
          <p>SKU: {paper.id}</p>
          <p>Pris: {paper.price?.toFixed(2)}</p>
          <p>Lager: {paper.stock}</p>
          {paper.paperProperties && paper.paperProperties.length > 0 && (
            <div>
              <h3 className="text-lg font-bold">Properties:</h3>
              <ul className="list-disc list-inside">
                {paper.paperProperties.map((prop) => (
                  <li key={prop.propertyId}>{prop.property?.propertyName}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
