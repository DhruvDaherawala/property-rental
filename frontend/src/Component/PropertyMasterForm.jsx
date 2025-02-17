import { useState, useEffect } from "react";
import axios from "axios";

<<<<<<< HEAD
export default function RenterMasterForm() {
=======
export default function PropertyMasterForm() {
  const [properties, setProperties] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [childCount, setChildCount] = useState(0);
>>>>>>> 37c93552acc524bd2dac8bac41677a031a4aa8b6
  const [formData, setFormData] = useState({
    propertyTitle: "",
    propertyOwner: "",
    numberofFloors: "",
    renterName: "",
    fullAddress: "",
    age: "",
    numberOfStayers: "",
    aadhaarCard: null,
    panCard: null,
    passportPhoto: null,
    otherDocument: null,
    contact1: "",
    contact2: "",
    remarks: "",
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
<<<<<<< HEAD
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
=======
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
>>>>>>> 37c93552acc524bd2dac8bac41677a031a4aa8b6
  };

  // Submit the form (POST)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const form = new FormData();
<<<<<<< HEAD
      Object.entries(formData).forEach(([key, value]) => {
        if (value && typeof value !== "object") {
          form.append(key, value);
        }
      });

      if (formData.aadhaarCard) form.append("aadhaarCard", formData.aadhaarCard);
      if (formData.panCard) form.append("panCard", formData.panCard);
      if (formData.passportPhoto) form.append("passportPhoto", formData.passportPhoto);
      if (formData.otherDocument) form.append("otherDocument", formData.otherDocument);

      const response = await axios.post("http://localhost:3001/api/renter", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Server Response:", response.data);
      alert("Renter data saved successfully!");
=======

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
>>>>>>> 37c93552acc524bd2dac8bac41677a031a4aa8b6
    } catch (error) {
      console.error("Error saving renter data:", error);
      alert("Failed to save renter data!");
    }
  };

  return (
<<<<<<< HEAD
    <div className="bg-white p-10 rounded-2xl shadow-xl max-w-4xl mx-auto mt-10">
      <h2 className="text-3xl font-semibold text-center text-indigo-600 mb-6">Renter Master Form</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Three Input Fields in One Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <FloatingLabelInput label="Property Title" name="propertyTitle" value={formData.propertyTitle} onChange={handleInputChange} />
          <FloatingLabelInput label="Property Owner" name="propertyOwner" value={formData.propertyOwner} onChange={handleInputChange} />
          <FloatingLabelInput label="Number of Floors" name="numberofFloors" value={formData.numberofFloors} onChange={handleInputChange} />
        </div>

        <FloatingLabelTextarea label="Property Description" name="propertyDescription" value={formData.propertyDescription} onChange={handleInputChange} />

        {/* Aadhaar Card Input without Header */}
        <FileInput name="aadhaarCard" onChange={handleFileChange} />

        <button type="submit" className="w-full bg-indigo-600 text-white p-4 rounded-lg hover:bg-indigo-700 transition">Submit</button>
      </form>
=======
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
>>>>>>> 37c93552acc524bd2dac8bac41677a031a4aa8b6
    </div>
  );
}

<<<<<<< HEAD
const FloatingLabelInput = ({ label, name, value, onChange }) => {
  return (
    <div className="relative w-full">
      <input type="text" name={name} value={value} onChange={onChange} placeholder=" "
        className="peer w-full p-4 border border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none bg-white" />
      <label className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-indigo-500 px-1 bg-white">
        {label}
      </label>
    </div>
  );
};

const FloatingLabelTextarea = ({ label, name, value, onChange }) => {
  return (
    <div className="relative w-full">
      <textarea name={name} value={value} onChange={onChange} placeholder=" "
        className="peer w-full p-4 h-32 border border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none bg-white" ></textarea>
      <label className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-indigo-500 px-1 bg-white">
        {label}
      </label>
    </div>
  );
};

const FileInput = ({ name, onChange }) => {
  return (
    <div className="relative w-full">
      <input type="file" name={name} onChange={onChange} className="w-full p-4 border border-gray-300 rounded-lg bg-gray-100 file:bg-indigo-600 file:text-white file:px-4 file:py-2 file:border-none file:rounded-lg hover:file:bg-indigo-700" />
    </div>
  );
};
=======
// Tailwind Styles
const formInputStyle =
  "w-full p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-200";

const tableInputStyle =
  "w-full p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white";
>>>>>>> 37c93552acc524bd2dac8bac41677a031a4aa8b6
