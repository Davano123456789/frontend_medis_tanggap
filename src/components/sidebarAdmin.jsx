import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faFileLines,
  faHospital,
  faUser,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import Logo from "../images/logo.png";
import "./sidebarAdmin.css";

function SidebarAdmin({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 950);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 950);
      if (window.innerWidth > 950) {
        setSidebarOpen(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isActive = (path) => location.pathname === path;

  const sidebarStyle = {
    width: "250px",
    borderTopRightRadius: "20px",
    borderBottomRightRadius: "20px",
    boxShadow: "5px 0px 10px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#ffffff",
    color: "#343a40",
    position: isMobile ? "absolute" : "relative",
    zIndex: 10,
    transition: "transform 0.3s ease-in-out",
    transform: isSidebarOpen ? "translateX(0)" : "translateX(-100%)",
  };

  const buttonStyle = (active) => ({
    textDecoration: "none",
    color: active ? "#007bff" : "#343a40",
    fontWeight: active ? "bold" : "normal",
    backgroundColor: active ? "#e8f4ff" : "#f8f9fa",
    border: "none",
    padding: "10px 15px",
    borderRadius: "8px",
    width: "100%",
    textAlign: "left",
    display: "flex",
    alignItems: "center",
    transition: "background-color 0.3s",
    marginBottom: "10px",
  });

  const iconStyle = {
    minWidth: "20px",
    marginRight: "15px",
    textAlign: "center",
    display: "inline-block",
  };

  const logoStyle = {
    width: "150px",
    height: "auto",
    marginBottom: "20px",
  };

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Anda Yakin?",
      text: "Apakah Anda yakin ingin keluar?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Keluar!",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete("https://medis-tanggap-be.vercel.app/logout", {
          withCredentials: true,
        });

        localStorage.removeItem("accessToken");
        localStorage.removeItem("userData");
        window.dispatchEvent(new Event("authChange"));

        Swal.fire("Telah Keluar!", "Logout Berhasil.", "success").then(() => {
          navigate("/login");
        });
      } catch (error) {
        console.error("Logout error:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Terjadi kesalahan saat logout",
        });
      }
    }
  };

  return (
    <div className="d-flex custom-vh">
      {/* Tombol hamburger */}
      {isMobile && (
        <div className="p-2" style={{ zIndex: 20 }}>
          <button
            className="btn btn-light"
            onClick={() => setSidebarOpen(!isSidebarOpen)}
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
      )}

      {/* Sidebar */}
      <div className="d-flex flex-column" style={sidebarStyle}>
        <div className="p-3 d-flex justify-content-center">
          <a href="/" style={{ textDecoration: "none" }}>
            <img src={Logo} alt="Logo" style={logoStyle} />
          </a>
        </div>
        <nav className="flex-grow-1 px-4 py-4">
          {[
            { path: "/admin/dashboard", icon: faHouse, label: "Dashboard" },
            {
              path: "/admin/pengajuan",
              icon: faFileLines,
              label: "Pengajuan Klinik",
            },
            {
              path: "/admin/daftar-klinik",
              icon: faHospital,
              label: "Daftar Klinik",
            },
            {
              path: "/dashboard/profile",
              icon: faUser,
              label: "Profil",
            },
          ].map((item, index) => (
            <button
              key={index}
              onClick={() => navigate(item.path)}
              className="btn btn-link"
              style={buttonStyle(isActive(item.path))}
            >
              <FontAwesomeIcon icon={item.icon} style={iconStyle} />
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-3 border-top">
          <button
            className="btn btn-link d-flex align-items-center text-danger w-100 text-start"
            style={{ textDecoration: "none" }}
            onClick={handleLogout}
          >
            Keluar
          </button>
        </div>
      </div>

      <main className="flex-grow-1 p-4 bg-light">{children}</main>
    </div>
  );
}

export default SidebarAdmin;
