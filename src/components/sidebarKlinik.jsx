import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faNewspaper,
  faFileLines,
  faEnvelopesBulk,
  faUser,
  faHospital,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import Logo from "../images/logo.png";
import axios from "axios";
import Swal from "sweetalert2";
import "../klinikPage/detailartikel.css";

function Sidebar({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isNavOpen, setIsNavOpen] = useState(false);

  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 950);

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 950);
      if (window.innerWidth > 950) {
        setSidebarOpen(true); // Pastikan sidebar terbuka di layar besar
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleNavbar = () => {
    setIsNavOpen(!isNavOpen);
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

  const mainStyle = {
    marginLeft: "250px",
    padding: "20px",
    backgroundColor: "#f8f9fa",
    minHeight: "100vh",
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

  const logoStyle = {
    width: "150px",
    height: "auto",
    marginBottom: "20px",
  };

  return (
    <div className="d-flex custom-vh">
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
      <div className="d-flex flex-column" style={sidebarStyle}>
        <div className="p-3 d-flex justify-content-center">
          <Link to="/" style={{ textDecoration: "none" }}>
            <img src={Logo} alt="Logo" style={logoStyle} />
          </Link>
        </div>
        <nav
          className={`flex-grow-1 px-4 py-4 ${
            isNavOpen ? "show" : ""
          } id="navbarNav"`}
        >
          {[
            {
              path: "/dashboard",
              icon: faHouse,
              label: "Beranda",
            },
            {
              path: "/dashboard/rujukan",
              icon: faFileLines,
              label: "Rujukan",
            },
            {
              path: "/dashboard/artikel",
              icon: faNewspaper,
              label: "Artikel",
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
              <FontAwesomeIcon icon={item.icon} className="me-2" />
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-3 border-top">
          <button
            onClick={handleLogout}
            className="btn btn-link d-flex align-items-center text-danger w-100 text-start"
            style={{ textDecoration: "none" }}
          >
            <svg
              aria-hidden="true"
              className="me-2"
              width="20"
              height="20"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            Keluar
          </button>
        </div>
      </div>

      <main className="flex-grow-1 p-4 bg-light">{children}</main>
    </div>
  );
}

export default Sidebar;
