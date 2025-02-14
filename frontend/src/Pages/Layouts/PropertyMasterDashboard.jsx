import Navbar from "../../Component/Navbar/Navbar";
import PropertyMasterForm from "../../Component/PropertyMasterForm";
import Sidebar from "../../Component/Sidebar/Sidebar";

export default function PropertyMasterDashboard({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <main className="p-6">{children}
          <PropertyMasterForm />
        </main>
      </div>
    </div>
  );
}