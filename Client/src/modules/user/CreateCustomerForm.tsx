import { useState } from "react";
import { Api } from "../../Api";
import { useAtom } from "jotai";
import { CurrentCustomerAtom } from "../../atoms";
import { useNavigate } from "react-router-dom";

const api = new Api({
  baseUrl: "http://localhost:5135",
});

export default function CreateCustomerForm(): JSX.Element {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [, setCurrentCustomer] = useAtom(CurrentCustomerAtom);
  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setEmailError("Invalid email format");
      return;
    }
    setEmailError("");
    PostCustomer();
    navigate("/");
  };

  async function PostCustomer() {
    try {
      const response = await api.api.customerCreateNewCustomerCreate({
        name: name,
        address: address,
        phone: phone,
        email: email,
        id: 0, // This is a placeholder value
      });
      const data = response.data;
      setCurrentCustomer(data);
      console.log(data);
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
      } else {
        console.log("An unknown error occurred");
      }
    }
  }

  function resetForm() {
    setName("");
    setAddress("");
    setPhone("");
    setEmail("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      onReset={resetForm}
      className="max-w-md mx-auto p-4 bg-base-100 shadow-md rounded mt-5"
    >
      <div className="form-control mb-4">
        <h1 className="text-2xl font-bold">Opret Kunde</h1>
        <label className="label">
          <span className="label-text">Navn</span>
        </label>
        <input
          type="text"
          className="input input-bordered"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="form-control mb-4">
        <label className="label">
          <span className="label-text">Addresse</span>
        </label>
        <input
          type="text"
          className="input input-bordered"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      </div>
      <div className="form-control mb-4">
        <label className="label">
          <span className="label-text">Telefon</span>
        </label>
        <input
          type="text"
          className="input input-bordered"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </div>
      <div className="form-control mb-4">
        <label className="label">
          <span className="label-text">Email</span>
        </label>
        <input
          type="email"
          className="input input-bordered"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {emailError && (
          <p className="text-red-500 text-sm mt-1">{emailError}</p>
        )}
      </div>
      <div className="form-control flex space-x-4">
        <button type="submit" className="btn btn-primary m-2">
          Opret
        </button>
        <button type="reset" className="btn btn-secondary m-2">
          Reset
        </button>
      </div>
    </form>
  );
}
