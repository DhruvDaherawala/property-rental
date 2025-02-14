// import { useState } from "react";
// import axios from "axios";

// export default function RenterMasterForm() {
//   const [formData, setFormData] = useState({
//     renterName: "",
//     fullAddress: "",
//     age: "",
//     numberOfStayers: "",
//     aadhaarCard: null,
//     panCard: null,
//     passportPhoto: null,
//     otherDocument: null,
//     contact1: "",
//     contact2: "",
//     remarks: "",
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleFileChange = (e) => {
//     const { name, files } = e.target;
//     setFormData({ ...formData, [name]: files[0] });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const form = new FormData();

//       // Append text fields (any non-file values)
//       Object.entries(formData).forEach(([key, value]) => {
//         if (value && typeof value !== "object") {
//           form.append(key, value);
//         }
//       });

//       // Append files (if uploaded)
//       if (formData.aadhaarCard) {
//         form.append("aadhaarCard", formData.aadhaarCard);
//       }
//       if (formData.panCard) {
//         form.append("panCard", formData.panCard);
//       }
//       if (formData.passportPhoto) {
//         form.append("passportPhoto", formData.passportPhoto);
//       }
//       if (formData.otherDocument) {
//         form.append("otherDocument", formData.otherDocument);
//       }

//       // POST to your Node.js server
//       const response = await axios.post(
//         "http://localhost:3001/api/renter", // Ensure your server uses this route
//         form,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       console.log("Server Response:", response.data);
//       alert("Renter data saved successfully!");
//     } catch (error) {
//       console.error("Error saving renter data:", error);
//       alert("Failed to save renter data!");
//     }
//   };

//   return (
//     <div className="bg-gray-100 p-6 shadow-lg rounded-lg w-full">
//       <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">
//         Renter Master Form
//       </h2>
//       <form
//         onSubmit={handleSubmit}
//         className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full"
//       >
//         <input
//           type="text"
//           name="renterName"
//           placeholder="Renter Name"
//           onChange={handleInputChange}
//           className="p-2 border rounded w-full"
//         />
//         <input
//           type="text"
//           name="age"
//           placeholder="Age"
//           onChange={handleInputChange}
//           className="p-2 border rounded w-full"
//         />
//         <textarea
//           name="fullAddress"
//           placeholder="Full Address"
//           onChange={handleInputChange}
//           className="col-span-2 p-2 border rounded w-full"
//         ></textarea>
//         <input
//           type="number"
//           name="numberOfStayers"
//           placeholder="Number of Stayers"
//           onChange={handleInputChange}
//           className="p-2 border rounded w-full"
//         />

//         <div className="col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
//           <div>
//             <label className="block text-sm font-medium">Aadhaar Card</label>
//             <input
//               type="file"
//               name="aadhaarCard"
//               onChange={handleFileChange}
//               className="p-2 border rounded w-full"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium">PAN Card</label>
//             <input
//               type="file"
//               name="panCard"
//               onChange={handleFileChange}
//               className="p-2 border rounded w-full"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium">
//               Passport Size Photo
//             </label>
//             <input
//               type="file"
//               name="passportPhoto"
//               onChange={handleFileChange}
//               className="p-2 border rounded w-full"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium">Other Document</label>
//             <input
//               type="file"
//               name="otherDocument"
//               onChange={handleFileChange}
//               className="p-2 border rounded w-full"
//             />
//           </div>
//         </div>

//         <input
//           type="text"
//           name="contact1"
//           placeholder="Contact Number 1"
//           onChange={handleInputChange}
//           className="p-2 border rounded w-full"
//         />
//         <input
//           type="text"
//           name="contact2"
//           placeholder="Contact Number 2"
//           onChange={handleInputChange}
//           className="p-2 border rounded w-full"
//         />

//         <textarea
//           name="remarks"
//           placeholder="Remarks"
//           onChange={handleInputChange}
//           className="col-span-2 p-2 border rounded w-full"
//         ></textarea>

//         <button
//           type="submit"
//           className="col-span-2 bg-blue-600 text-white p-2 rounded hover:bg-blue-700 w-full"
//         >
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// }

// import { useState } from "react";
// import axios from "axios";

// export default function RenterMasterForm() {
//   const [formData, setFormData] = useState({
//     renterName: "",
//     fullAddress: "",
//     age: "",
//     numberOfStayers: "",
//     aadhaarCard: null,
//     panCard: null,
//     passportPhoto: null,
//     otherDocument: null,
//     contact1: "",
//     contact2: "",
//     remarks: "",
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleFileChange = (e) => {
//     const { name, files } = e.target;
//     setFormData({ ...formData, [name]: files[0] });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const form = new FormData();

//       // Append text fields
//       Object.entries(formData).forEach(([key, value]) => {
//         if (value && typeof value !== "object") {
//           form.append(key, value);
//         }
//       });

//       // Append files
//       if (formData.aadhaarCard) {
//         form.append("aadhaarCard", formData.aadhaarCard);
//       }
//       if (formData.panCard) {
//         form.append("panCard", formData.panCard);
//       }
//       if (formData.passportPhoto) {
//         form.append("passportPhoto", formData.passportPhoto);
//       }
//       if (formData.otherDocument) {
//         form.append("otherDocument", formData.otherDocument);
//       }

//       // POST to your Node.js server
//       const response = await axios.post(
//         "http://localhost:3001/api/renter",
//         form,
//         {
//           headers: { "Content-Type": "multipart/form-data" },
//         }
//       );

//       console.log("Server Response:", response.data);
//       alert("Renter data saved successfully!");
//     } catch (error) {
//       console.error("Error saving renter data:", error);
//       alert("Failed to save renter data!");
//     }
//   };

//   return (
//     <div className="bg-white p-10 rounded-2xl shadow-xl max-w-4xl mx-auto mt-10">
//       <h2 className="text-3xl font-semibold text-center text-indigo-600 mb-6">
//         Renter Master Form
//       </h2>

//       <form onSubmit={handleSubmit} className="space-y-6">
//         {/* Row 1: Renter Name + Age */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <input
//             type="text"
//             name="renterName"
//             placeholder="Renter Name"
//             onChange={handleInputChange}
//             className={formInputStyle}
//           />
//           <input
//             type="text"
//             name="age"
//             placeholder="Age"
//             onChange={handleInputChange}
//             className={formInputStyle}
//           />
//         </div>

//         {/* Full Address */}
//         <textarea
//           name="fullAddress"
//           placeholder="Full Address"
//           onChange={handleInputChange}
//           className={`${formInputStyle} h-32`}
//         ></textarea>

//         {/* Number of Stayers */}
//         <input
//           type="number"
//           name="numberOfStayers"
//           placeholder="Number of Stayers"
//           onChange={handleInputChange}
//           className={formInputStyle}
//         />

//         {/* Aadhaar Card */}
//         <div>
//           <label className="block mb-1 text-sm font-medium">Aadhaar Card</label>
//           <input
//             type="file"
//             name="aadhaarCard"
//             onChange={handleFileChange}
//             className={formInputStyle}
//           />
//         </div>

//         {/* PAN Card */}
//         <div>
//           <label className="block mb-1 text-sm font-medium">PAN Card</label>
//           <input
//             type="file"
//             name="panCard"
//             onChange={handleFileChange}
//             className={formInputStyle}
//           />
//         </div>

//         {/* Passport Size Photo */}
//         <div>
//           <label className="block mb-1 text-sm font-medium">
//             Passport Size Photo
//           </label>
//           <input
//             type="file"
//             name="passportPhoto"
//             onChange={handleFileChange}
//             className={formInputStyle}
//           />
//         </div>

//         {/* Other Document */}
//         <div>
//           <label className="block mb-1 text-sm font-medium">Other Document</label>
//           <input
//             type="file"
//             name="otherDocument"
//             onChange={handleFileChange}
//             className={formInputStyle}
//           />
//         </div>

//         {/* Contact 1 & Contact 2 */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <input
//             type="text"
//             name="contact1"
//             placeholder="Contact Number 1"
//             onChange={handleInputChange}
//             className={formInputStyle}
//           />
//           <input
//             type="text"
//             name="contact2"
//             placeholder="Contact Number 2"
//             onChange={handleInputChange}
//             className={formInputStyle}
//           />
//         </div>

//         {/* Remarks */}
//         <textarea
//           name="remarks"
//           placeholder="Remarks"
//           onChange={handleInputChange}
//           className={`${formInputStyle} h-32`}
//         ></textarea>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           className="w-full bg-indigo-600 text-white p-4 rounded-lg hover:bg-indigo-700 transition"
//         >
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// }

// // Tailwind Custom Styles
// const formInputStyle =
//   "w-full p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-200";













import { useState } from "react";
import axios from "axios";

export default function RenterMasterForm() {
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

      // Append text fields
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

      // POST to your Node.js server
      const response = await axios.post(
        "http://localhost:3001/api/renter",
        form,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log("Server Response:", response.data);
      alert("Renter data saved successfully!");
    } catch (error) {
      console.error("Error saving renter data:", error);
      alert("Failed to save renter data!");
    }
  };

  return (
    <div className="bg-white p-10 rounded-2xl shadow-xl max-w-4xl mx-auto mt-10">
      <h2 className="text-3xl font-semibold text-center text-indigo-600 mb-6">
        Renter Master Form
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Row 1: Renter Name + Age */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            name="renterName"
            placeholder="Renter Name"
            onChange={handleInputChange}
            className={formInputStyle}
          />
          <input
            type="text"
            name="age"
            placeholder="Age"
            onChange={handleInputChange}
            className={formInputStyle}
          />
        </div>

        {/* Full Address */}
        <textarea
          name="fullAddress"
          placeholder="Full Address"
          onChange={handleInputChange}
          className={`${formInputStyle} h-32`}
        ></textarea>

        {/* Row 2: Number of Stayers + Contact Number 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="number"
            name="numberOfStayers"
            placeholder="Number of Stayers"
            onChange={handleInputChange}
            className={formInputStyle}
          />
          <input
            type="text"
            name="contact1"
            placeholder="Contact Number 1"
            onChange={handleInputChange}
            className={formInputStyle}
          />
        </div>

        {/* Row 3: Contact Number 2 + Remarks (full width in 2-col layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            name="contact2"
            placeholder="Contact Number 2"
            onChange={handleInputChange}
            className={formInputStyle}
          />
          <textarea
            name="remarks"
            placeholder="Remarks"
            onChange={handleInputChange}
            className={`${formInputStyle} h-32`}
          ></textarea>
        </div>

        {/* Row 4: Aadhaar Card + PAN Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-1 text-sm font-medium">Aadhaar Card</label>
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
            <label className="block mb-1 text-sm font-medium">Other Document</label>
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
  );
}

// Tailwind Custom Styles
const formInputStyle =
  "w-full p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-200";









