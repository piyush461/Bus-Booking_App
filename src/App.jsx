import { Route, Routes } from "react-router-dom";
import LandingPage from "./Components/Main/LandingPage.jsx";
import AdminLogin from "./Components/Admin/AdminLogin";
import UserLogin from "./Components/User/UserLogin";
import { Bounce, ToastContainer } from "react-toastify";
import UserRegister from "./Components/Registeration/UserRegister";
import AdminRegister from "./Components/Registeration/AdminRegister";
import AdminHomePage from "./Components/Main/AdminHomePage";
import Dashboard from "./Components/Admin/AdminSideBar/Dashboard";
import Addbus from "./Components/Admin/AdminSideBar/Addbus";
import ChooseUser from "./Components/Login/ChooseUser.jsx";
import Header from "./Components/Main/Header.jsx";
import ProtectedRoute from "./Components/ProtectedRoute.jsx";
import EditBus from "./Components/Admin/EditBus.jsx";
import ViewBus from "./Components/Admin/ViewBus.jsx";
import UserHomePage from "./Components/Main/UserHomePage.jsx";

function App() {
  return (
    <div className="flex flex-col h-screen">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
        theme="light"
        limit={3}
        transition={Bounce}
      />
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="chooseuser" element={<ChooseUser />} />
        <Route path="adminlogin" element={<AdminLogin />} />
        <Route path="userlogin" element={<UserLogin />} />
        <Route path="registeruser" element={<UserRegister />} />
        <Route path="/adminregister" element={<AdminRegister />} />

        <Route
          path="adminhomepage"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminHomePage />
            </ProtectedRoute>
          }>
          <Route index element={<Dashboard />} />
          <Route path="addbus" element={<Addbus />} />
          <Route path="editbus/:id" element={<EditBus />} />
          <Route path="viewbus/:id" element={<ViewBus />} />
        </Route>
        <Route path="/userhomepage" element={
          <ProtectedRoute allowedRoles={["user"]}>
            <UserHomePage/>
          </ProtectedRoute>
        }></Route>
      </Routes>
    </div>
  );
}

export default App;
