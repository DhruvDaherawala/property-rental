import { useState } from "react";
import axios from "axios";

export default function RenterMasterForm() {
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const form = new FormData();
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
    } catch (error) {
      console.error("Error saving renter data:", error);
      alert("Failed to save renter data!");
    }
  };

  return (
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
    </div>
  );
}

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