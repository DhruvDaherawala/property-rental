import { useState, useEffect } from "react";
import axios from "axios";

export default function PropertyMasterForm() {
  const [properties, setProperties] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [childCount, setChildCount] = useState(0);
  const [formData, setFormData] = useState({
    propertyName: "",
    ownerName: "",
    address: "",
    documents: null,
    childProperties: [],
  });

  // Fetch existing properties on mount
  useEffect(() => {
    fetchProperties();
  }, []);

  // GET request to fetch existing properties
  const fetchProperties = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/property");
      setProperties(response.data);
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  };

  // Handle text inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file input
  const handleFileChange = (e) => {
    setFormData({ ...formData, documents: e.target.files[0] });
  };

  // Handle the number of floors
  const handleChildCountChange = (e) => {
    const count = parseInt(e.target.value, 10) || 0;
    setChildCount(count);
    setFormData({
      ...formData,
      childProperties: Array(count).fill({
        floor: "",
        title: "",
        description: "",
        rooms: "",
        washroom: "",
        gas: "",
        electricity: "",
        deposit: "",
        rent: "",
      }),
    });
  };

  // Update each child property row
  const handleChildChange = (index, e) => {
    const { name, value } = e.target;
    const updatedChildren = [...formData.childProperties];
    updatedChildren[index] = { ...updatedChildren[index], [name]: value };
    setFormData({ ...formData, childProperties: updatedChildren });
  };

  // Submit the form (POST)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const form = new FormData();

      const textData = {
        propertyName: formData.propertyName,
        ownerName: formData.ownerName,
        address: formData.address,
        childProperties: formData.childProperties,
      };

      // Append text fields as JSON
      form.append("formData", JSON.stringify(textData));

      // Append file if present
      if (formData.documents) {
        form.append("documents", formData.documents);
      }

      // POST to server
      await axios.post("http://localhost:3001/api/property", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Property data saved successfully!");
      // Refresh table
      fetchProperties();
      // Reset form
      setFormData({
        propertyName: "",
        ownerName: "",
        address: "",
        documents: null,
        childProperties: [],
      });
      setChildCount(0);
      setShowForm(false);
    } catch (error) {
      console.error("Error saving property data:", error);
      alert("Failed to save property data!");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      {/* Table of existing properties */}
      <div className="bg-white shadow rounded-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">
            Registered Properties
          </h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
          >
            {showForm ? "Close Form" : "Add Property"}
          </button>
        </div>

        {properties.length === 0 ? (
          <p className="text-gray-600">No properties found.</p>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Owner
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Property Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Address
                </th>
                <th className="px-6 py-3 w-24"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {properties.map((prop) => (
                <tr key={prop.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {prop.ownerName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {prop.propertyName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {prop.address}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-indigo-600 hover:text-indigo-900">
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Toggleable form to add a new property */}
      {showForm && (
        <div className="bg-white p-6 rounded-2xl shadow-xl">
          <h2 className="text-2xl font-semibold text-indigo-600 mb-4">
            Add New Property
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <input
                type="text"
                name="propertyName"
                placeholder="Property Title"
                value={formData.propertyName}
                onChange={handleInputChange}
                className={formInputStyle}
              />
              <input
                type="text"
                name="ownerName"
                placeholder="Property Owner"
                value={formData.ownerName}
                onChange={handleInputChange}
                className={formInputStyle}
              />
            </div>
            <textarea
              name="address"
              placeholder="Property Description"
              value={formData.address}
              onChange={handleInputChange}
              className={`${formInputStyle} h-32`}
            ></textarea>
            <div className="grid grid-cols-2 gap-6">
              <input
                type="file"
                onChange={handleFileChange}
                className={formInputStyle}
              />
              <input
                type="number"
                min="0"
                name="childCount"
                placeholder="Number of Floors"
                value={childCount}
                onChange={handleChildCountChange}
                className={formInputStyle}
              />
            </div>

            {childCount > 0 && (
              <div className="overflow-x-auto">
                <table className="w-full bg-gray-200 rounded-lg text-sm mt-4">
                  <thead>
                    <tr className="bg-indigo-500 text-white">
                      <th className="p-3 rounded-tl-lg">Floor</th>
                      <th className="p-3">Title</th>
                      <th className="p-3">Description</th>
                      <th className="p-3">Rooms</th>
                      <th className="p-3">Washroom</th>
                      <th className="p-3">Gas</th>
                      <th className="p-3">Electricity</th>
                      <th className="p-3">Deposit</th>
                      <th className="p-3 rounded-tr-lg">Rent</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from({ length: childCount }, (_, index) => (
                      <tr key={index}>
                        {[
                          "floor",
                          "title",
                          "description",
                          "rooms",
                          "washroom",
                          "gas",
                          "electricity",
                          "deposit",
                          "rent",
                        ].map((field) => (
                          <td key={field} className="p-3">
                            <input
                              type="text"
                              name={field}
                              placeholder={
                                field.charAt(0).toUpperCase() + field.slice(1)
                              }
                              onChange={(e) => handleChildChange(index, e)}
                              className={tableInputStyle}
                            />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white p-4 rounded-lg hover:bg-indigo-700 transition"
            >
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

// Tailwind Styles
const formInputStyle =
  "w-full p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-200";

const tableInputStyle =
  "w-full p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white";
