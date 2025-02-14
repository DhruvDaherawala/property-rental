import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../Component/Navbar/Navbar";
import Sidebar from "../Component/Sidebar/Sidebar";
import PropertyMasterForm from "../Component/PropertyMasterForm";
import RenterMasterForm from "../Component/RenterMasterForm";
import PropertyMasterDashboard from "../Pages/Layouts/PropertyMasterDashboard";
import RenterMasterDashboard from "../Pages/Layouts/RenterMasterDashboard";

const AppRoutes = () => {
  return (
    <Router>
      <Navbar />
      <div className="flex h-full ">
        <Sidebar />
        <div className="content p-4 justify-center w-full h-full">
          <Routes>
            
            <Route path="/" element={<PropertyMasterForm />} />
            <Route path="/property-form" element={<PropertyMasterForm />} />
            <Route path="/renter-form" element={<RenterMasterForm />} />
            {/* <Route path="/property-dashboard" element={<PropertyMasterDashboard />} />
            <Route path="/renter-dashboard" element={<RenterMasterDashboard />} /> */}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default AppRoutes;
