import { useState, useEffect } from "react";
import axios from "axios";

export default function RenterMasterForm() {
  const [renters, setRenters] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
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

  // Fetch existing renters on mount
  useEffect(() => {
    fetchRenters();
  }, []);

  // GET request to fetch existing renters
  const fetchRenters = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/renter");
      setRenters(response.data);
    } catch (error) {
      console.error("Error fetching renters:", error);
    }
  };

  // Handle text inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file inputs
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  // Submit form data to server
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const form = new FormData();

      // Append non-file fields
      Object.entries(formData).forEach(([key, value]) => {
        if (value && typeof value !== "object") {
          form.append(key, value);
        }
      });

      // Append files
      if (formData.aadhaarCard) {
        form.append("aadhaarCard", formData.aadhaarCard);
      }
      if (formData.panCard) {
        form.append("panCard", formData.panCard);
      }
      if (formData.passportPhoto) {
        form.append("passportPhoto", formData.passportPhoto);
      }
      if (formData.otherDocument) {
        form.append("otherDocument", formData.otherDocument);
      }

      // POST to server
      await axios.post("http://localhost:3001/api/renter", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Renter data saved successfully!");
      // Refresh renters table
      fetchRenters();

      // Reset form
      setFormData({
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
      setShowForm(false);
    } catch (error) {
      console.error("Error saving renter data:", error);
      alert("Failed to save renter data!");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      {/* Table of existing renters */}
      <div className="bg-white shadow rounded-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">
            Registered Renters
          </h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
          >
            {showForm ? "Close Form" : "Add Renter"}
          </button>
        </div>

        {renters.length === 0 ? (
          <p className="text-gray-600">No renters found.</p>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Renter Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Age
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Address
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact1
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact2
                </th>
                <th className="px-6 py-3 w-24"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {renters.map((renter) => (
                <tr key={renter.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {renter.renterName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {renter.age}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {renter.fullAddress}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {renter.contact1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {renter.contact2}
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

      {/* Toggleable form to add a new renter */}
      {showForm && (
        <div className="bg-white p-6 rounded-2xl shadow-xl">
          <h2 className="text-2xl font-semibold text-indigo-600 mb-4">
            Add New Renter
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Row 1: Renter Name + Age */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                name="renterName"
                placeholder="Renter Name"
                value={formData.renterName}
                onChange={handleInputChange}
                className={formInputStyle}
              />
              <input
                type="text"
                name="age"
                placeholder="Age"
                value={formData.age}
                onChange={handleInputChange}
                className={formInputStyle}
              />
            </div>

            {/* Full Address */}
            <textarea
              name="fullAddress"
              placeholder="Full Address"
              value={formData.fullAddress}
              onChange={handleInputChange}
              className={`${formInputStyle} h-32`}
            ></textarea>

            {/* Row 2: Number of Stayers + Contact Number 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="number"
                name="numberOfStayers"
                placeholder="Number of Stayers"
                value={formData.numberOfStayers}
                onChange={handleInputChange}
                className={formInputStyle}
              />
              <input
                type="text"
                name="contact1"
                placeholder="Contact Number 1"
                value={formData.contact1}
                onChange={handleInputChange}
                className={formInputStyle}
              />
            </div>

            {/* Row 3: Contact Number 2 + Remarks */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                name="contact2"
                placeholder="Contact Number 2"
                value={formData.contact2}
                onChange={handleInputChange}
                className={formInputStyle}
              />
              <textarea
                name="remarks"
                placeholder="Remarks"
                value={formData.remarks}
                onChange={handleInputChange}
                className={`${formInputStyle} h-32`}
              ></textarea>
            </div>

            {/* Row 4: Aadhaar Card + PAN Card */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-1 text-sm font-medium">
                  Aadhaar Card
                </label>
                <input
                  type="file"
                  name="aadhaarCard"
                  onChange={handleFileChange}
                  className={formInputStyle}
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">PAN Card</label>
                <input
                  type="file"
                  name="panCard"
                  onChange={handleFileChange}
                  className={formInputStyle}
                />
              </div>
            </div>

            {/* Row 5: Passport Photo + Other Document */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-1 text-sm font-medium">
                  Passport Size Photo
                </label>
                <input
                  type="file"
                  name="passportPhoto"
                  onChange={handleFileChange}
                  className={formInputStyle}
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">
                  Other Document
                </label>
                <input
                  type="file"
                  name="otherDocument"
                  onChange={handleFileChange}
                  className={formInputStyle}
                />
              </div>
            </div>

            {/* Submit Button */}
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
