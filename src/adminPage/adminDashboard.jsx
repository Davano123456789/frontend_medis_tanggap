import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SidebarAdmin from "../components/sidebarAdmin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faNewspaper,
  faFileLines,
  faHospital,
} from "@fortawesome/free-solid-svg-icons";
import "./adminDashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const verifyAdmin = () => {
      const storedUserData = localStorage.getItem("userData");
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        navigate("/login");
        return;
      }

      if (storedUserData) {
        const userData = JSON.parse(storedUserData);
        if (userData.role !== "admin") {
          navigate("/dashboard");
          return;
        }
        setUserData(userData);
      }
    };

    verifyAdmin();
  }, [navigate]);

  if (!userData) {
    return null;
  }

  return (
    <>
      <SidebarAdmin>
        <div className="w-100 h-100">
          <div className="mb-4">
            <h3 className="text-primary fw-bold">Selamat Datang</h3>
            <h5 className="text-muted">Medis Tanggap</h5>
            <h2>Admin Dashboard</h2>
          </div>
          <div className="d-flex gap-5">
            <div className="card1 p-4 text-start d-flex flex-column shadow-sm hover-card1">
              <FontAwesomeIcon
                className="icon mb-3"
                style={{ width: "30px", height: "30px" }}
                icon={faFileLines}
              />
              <h5 className="card1-title">10</h5>
              <p className="card1-text">Daftar pengajuan klinik</p>
            </div>

            <div className="card1 p-4 text-start d-flex flex-column shadow-sm hover-card1">
              <FontAwesomeIcon
                className="icon mb-3"
                style={{ width: "30px", height: "30px" }}
                icon={faHospital}
              />
              <h5 className="card1-title">15</h5>
              <p className="card1-text">Daftar Klinik</p>
            </div>
          </div>
        </div>
      </SidebarAdmin>
    </>
  );
}

export default AdminDashboard;
