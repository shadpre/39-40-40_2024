import { useState, useEffect } from "react";
import { Property } from "../../Api";
import { api } from "../../MyAPI";

export default function PropertyAdmin(): JSX.Element {
  const [propertyName, setPropertyName] = useState("");
  const [allProperties, setAllProperties] = useState<Property[]>([]);
  const [editingPropertyId, setEditingPropertyId] = useState<number | null>(
    null
  );
  const [editedPropertyName, setEditedPropertyName] = useState<string>("");

  useEffect(() => {
    async function fetchProperties() {
      try {
        const response = await api.api.propertyGetAllPropertiesList();
        const data = response.data;
        setAllProperties(data);
      } catch (err) {
        if (err instanceof Error) {
          console.log(err.message);
        } else {
          console.log("An unknown error occurred");
        }
      }
    }
    fetchProperties();
  }, []);

  const handleDelete = async (prop: Property) => {
    console.log(prop);

    try {
      let response;
      if (prop.id !== undefined) {
        response = await api.api.propertyDeleteDelete(prop.id, prop);
      } else {
        console.log("Property ID is undefined");
      }
      setAllProperties(response?.data as Property[]);
    } catch (err) {
      console.log("Failed to delete property:", err);
    }
  };

  const handleAddProperty = async () => {
    if (propertyName.trim() === "") return;
    try {
      const response = await api.api.propertyCreatePropertyCreate({
        propertyName,
      });
      setAllProperties(response?.data as Property[]);
      setPropertyName("");
    } catch (err) {
      console.log("Failed to add property:", err);
    }
  };

  const handleEdit = (property: Property) => {
    setEditingPropertyId(property.id as number);
    setEditedPropertyName(property.propertyName as string);
  };

  const handleSave = async (property: Property) => {
    try {
      const response = await api.api.propertyUpdatePropertyUpdate(
        property.id as number,
        {
          propertyName: editedPropertyName,
          id: editingPropertyId as number,
        }
      );
      console.log(response);
      setAllProperties(response?.data as Property[]);
      setEditingPropertyId(null);
    } catch (err) {
      console.log("Failed to update property:", err);
    }
  };

  const handleKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>,
    property: Property
  ) => {
    if (event.key === "Enter") {
      handleSave(property);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-base-100 shadow-md rounded mt-5">
      <h1 className="text-2xl font-bold mb-4">Property Administration</h1>
      <div className="grid grid-cols-1 gap-4">
        {allProperties.map((property) => (
          <div key={property.id} className="card bg-base-100 shadow-xl p-4">
            <div className="flex justify-between items-center mb-2">
              {editingPropertyId === property.id ? (
                <input
                  type="text"
                  className="input input-bordered mr-2"
                  value={editedPropertyName}
                  onChange={(e) => setEditedPropertyName(e.target.value)}
                  onKeyPress={(e) => handleKeyPress(e, property)}
                />
              ) : (
                <span>{property.propertyName}</span>
              )}
              <div>
                {editingPropertyId === property.id ? (
                  <button
                    className="btn btn-primary mr-2"
                    onClick={() => handleSave(property)}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    className="btn btn-secondary mr-2"
                    onClick={() => handleEdit(property)}
                    disabled={editingPropertyId !== null}
                  >
                    Edit
                  </button>
                )}
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(property)}
                  disabled={editingPropertyId !== null}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center mt-4">
        <input
          type="text"
          className="input input-bordered mr-2"
          placeholder="New Property Name"
          value={propertyName}
          onChange={(e) => setPropertyName(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleAddProperty}>
          Add Property
        </button>
      </div>
    </div>
  );
}
