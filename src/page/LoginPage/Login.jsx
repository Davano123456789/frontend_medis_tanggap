import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css"; // Tambahkan custom styling jika diperlukan
import Button from "../../components/Button"; // Import the new Button component
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import axios from "axios";
import Swal from "sweetalert2"; // Import SweetAlert

const LoginForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const navigateToRegister = () => {
    navigate("/register");
  };

  const Auth = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://medis-tanggap-be.vercel.app/login",
        {
          email: email,
          password: password,
        }
      );

      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("userData", JSON.stringify(response.data.user));

      window.dispatchEvent(new Event("authChange"));

      Swal.fire({
        title: "Login Sukses!",
        text: `Selamat Datang, ${response.data.user.name}!`,
        icon: "success",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          // Redirect based on user role
          if (response.data.user.role === "admin") {
            navigate("/admin/dashboard");
          } else {
            navigate("/");
          }
        }
      });
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.msg,
        });
      }
    }
  };

  return (
    <div className="d-flex vh-100">
      {/* Bagian kiri */}
      <div className="bg-kiri text-white d-flex flex-column justify-content-center align-items-center w-50">
        <h1 className="mb-3 fw-bold text-custom-color-kiri">
          Selamat Datang di
        </h1>
        <h1 className="mb-4 fw-bold">Medis Tanggap</h1>
        <Button
          className="btn btn-info2 text-white fw-bold px-4 py-2"
          onClick={navigateToRegister}
        >
          Buat Akun
        </Button>
      </div>

      {/* Bagian kanan */}
      <div className="bg-kanan1 d-flex flex-column justify-content-center align-items-center w-50">
        <h1 className="mb-3 fw-bold font-welcome h1-responsive">
          Selamat Datang di
        </h1>
        <h2 className="mb-3 text-custom-color fw-bold text-center">
          Medis Tanggap
        </h2>
        <div className="card-responsive2">
          <p className="mb-4 text-muted font-weight-bold text-center">
            Masuk ke Akun
          </p>
          <form className="w-75" onSubmit={Auth}>
            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3 position-relative">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="btn btn-link position-absolute end-0 top-50 translate-middle-y eye-responsive"
                style={{ right: "10px" }}
              >
                {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
              </button>
            </div>
            <p className="text-muted1">
              Belum punya akun?{" "}
              <span
                onClick={navigateToRegister}
                className="text-custom-color1"
                style={{ cursor: "pointer", fontWeight: "bold" }}
              >
                Daftar sekarang
              </span>
              .
            </p>
            <Button
              type="submit"
              className="btn button-color w-100 text-white  fw-bold hover:"
            >
              Masuk
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
