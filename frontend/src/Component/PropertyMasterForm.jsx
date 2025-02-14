import { useState } from "react";
import axios from "axios";

export default function PropertyMasterForm() {
  const [childCount, setChildCount] = useState(0);
  const [formData, setFormData] = useState({
    propertyName: "",
    ownerName: "",
    address: "",
    documents: null,
    childProperties: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, documents: e.target.files[0] });
  };

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

  const handleChildChange = (index, e) => {
    const { name, value } = e.target;
    const updatedChildren = [...formData.childProperties];
    updatedChildren[index] = { ...updatedChildren[index], [name]: value };
    setFormData({ ...formData, childProperties: updatedChildren });
  };

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
      form.append("formData", JSON.stringify(textData));
      if (formData.documents) {
        form.append("documents", formData.documents);
      }
      const response = await axios.post("http://localhost:3001/api/property", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Server Response:", response.data);
      alert("Property data saved successfully!");
    } catch (error) {
      console.error("Error saving property data:", error);
      alert("Failed to save property data!");
    }
  };

  return (
    <div className="h-full bg-white p-10 rounded-2xl shadow-xl max-w-4xl mx-auto mt-10">
      <h2 className="text-3xl font-semibold text-center text-indigo-600 mb-6">
        Property Master Form
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <input type="text" name="propertyName" placeholder="Property Title" onChange={handleInputChange} className={formInputStyle} />
          <input type="text" name="ownerName" placeholder="Property Owner" onChange={handleInputChange} className={formInputStyle} />
        </div>
        <textarea name="address" placeholder="Property Description" onChange={handleInputChange} className={`${formInputStyle} h-32`}></textarea>
        <div className="grid grid-cols-2 gap-6">
          <input type="file" onChange={handleFileChange} className={formInputStyle} />
          <input type="number" min="0" name="childCount" placeholder="Number of Floors" onChange={handleChildCountChange} className={formInputStyle} />
        </div>

        {childCount > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full bg-gray-200 rounded-lg text-sm">
              <thead>
                <tr className="bg-indigo-500 text-white ">
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
                    {['floor', 'title', 'description', 'rooms', 'washroom', 'gas', 'electricity', 'deposit', 'rent'].map((field) => (
                      <td key={field} className="p-3">
                        <input type="text" name={field} placeholder={field.charAt(0).toUpperCase() + field.slice(1)} onChange={(e) => handleChildChange(index, e)} className={tableInputStyle} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <button type="submit" className="w-full bg-indigo-600 text-white p-4 rounded-lg hover:bg-indigo-700 transition">
          Submit
        </button>
      </form>
    </div>
  );
}

// Tailwind Custom Styles
const formInputStyle = "w-full p-4  rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-200";
const tableInputStyle = "w-full p-2  rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white";
