import { useEffect, useState } from "react";
import { api } from "../../MyAPI";
import { Paper, Property } from "../../Api";
import OK_ResetBtn from "../formElements/OK_ResetBtn";

export default function CreateNewProductForm(): JSX.Element {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [description, setDescription] = useState("");
  const [PaperProperties, setPaperProperties] = useState<Property[]>([]);
  const [newProduct, setNewProduct] = useState<Paper | null>(null);
  const AllProperties: Property[] = [];

  useEffect(() => {
    async function fetchPaperProperties() {
      try {
        const response = await api.api.propertyGetAllPropertiesList();
        const data = response.data;
        AllProperties.push(...data);
      } catch (err) {
        if (err instanceof Error) {
          console.log(err.message);
        } else {
          console.log("An unknown error occurred");
        }
      }
    }

    fetchPaperProperties();
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    PostProduct();
    resetForm();
  }

  function resetForm() {
    setName("");
    setPrice(0);
    setPaperProperties([]);
    setDescription("");
    setStock(0);
  }
  async function PostProduct() {
    const newProduct: Paper = {
      name: name,
      price: price,
      id: 0,
      discontinued: false,
      stock: stock,
      description: description,
    };

    try {
      const response = await api.api.paperCreatePaperCreate(newProduct);
      const data = response.data;
      setNewProduct(data);
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
      } else {
        console.log("An unknown error occurred");
      }
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      onReset={resetForm}
      className="max-w-md mx-auto p-4 bg-base-100 shadow-md rounded mt-5"
    >
      <div className="form-control mb-4">
        <h1 className="text-2xl font-bold">Opret nyt Produkt</h1>
        <label className="label" htmlFor="prodName">
          <span className="label-text">Produkt navn</span>
        </label>
        <input
          name="prodName"
          id="prodName"
          type="text"
          className="input input-bordered"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="form-control mb-4">
        <label className="label" htmlFor="prodPrice">
          <span className="label-text">Pris</span>
        </label>
        <input
          name="prodPrice"
          id="prodPrice"
          type="number"
          className="input input-bordered"
          value={price}
          onChange={(e) => setPrice(parseFloat(e.target.value))}
          required
        />
      </div>
        <div className="form-control mb-4">
            <label className="label" htmlFor="prodStock">
            <span className="label-text">Antal på Lager</span>
            </label>
            <input
            name="prodStock"
            id="prodStock"
            type="number"
            className="input input-bordered"
            value={stock}
            onChange={(e) => setStock(parseInt(e.target.value))}
            required
            />
        </div>
        <div className="form-control mb-4">
            <label className="label" htmlFor="prodDescription">
            <span className="label-text">Beskrivelse</span>
            </label>
            <textarea
            name="prodDescription"
            id="prodDescription"
            className="textarea textarea-bordered"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            />
        </div>
      <OK_ResetBtn />
    </form>
  );
}
