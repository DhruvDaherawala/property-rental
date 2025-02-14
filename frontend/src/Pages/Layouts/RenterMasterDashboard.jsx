import Navbar from "../../Component/Navbar/Navbar";
import RenterMasterForm from "../../Component/RenterMasterForm";
import Sidebar from "../../Component/Sidebar/Sidebar";

export default function Layout({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <main className="p-6">{children}
          <RenterMasterForm />
        </main>
      </div>
    </div>
  );
}