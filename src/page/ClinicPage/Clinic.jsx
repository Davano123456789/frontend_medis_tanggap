import React, { useState } from "react";
import axios from "axios"; // Import axios
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import Swal from "sweetalert2";
import "./Clinic.css";

const Clinic = () => {
  const [clinicName, setClinicName] = useState("");
  const [address, setAddress] = useState("");
  const [ktpFile, setKtpFile] = useState(null);
  const [izinFile, setIzinFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = (e, setFile) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setFile(file);
    }
    setIsDragging(false);
  };

  const handleFileChange = (e, setFile) => {
    const file = e.target.files[0];
    const allowedFormats = ["image/jpeg", "image/png", "application/pdf"];
    if (file && allowedFormats.includes(file.type)) {
      setFile(file);
    } else {
      alert("Format file tidak didukung.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!clinicName || !address || !ktpFile || !izinFile) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Semua kolom wajib diisi!",
      });
      return;
    }

    const formData = new FormData();
    formData.append("clinic_name", clinicName);
    formData.append("address", address);
    formData.append("ktp_owner", ktpFile);
    formData.append("operation_license", izinFile);

    // Mengambil user_id dan token dari localStorage
    const userData = JSON.parse(localStorage.getItem("userData"));
    const token = localStorage.getItem("accessToken");

    if (!userData || !userData.id || !token) {
      Swal.fire({
        icon: "error",
        title: "User tidak ditemukan",
        text: "Pastikan Anda sudah login.",
      });
      return;
    }

    formData.append("user_id", userData.id);

    try {
      const response = await axios.post(
        "https://medis-tanggap-be.vercel.app/api/add",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      Swal.fire({
        icon: "success",
        title: "Klinik berhasil ditambahkan!",
        text: response.data.message,
      });

      // Reset form
      setClinicName("");
      setAddress("");
      setKtpFile(null);
      setIzinFile(null);
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Gagal menambahkan klinik!",
        text:
          error.response?.data?.message ||
          "Terjadi kesalahan. Silakan coba lagi.",
      });
    }
  };

  return (
    <div>
      <Navbar />
      <div className="wrap-clinic d-flex justify-content-center align-items-center">
        <div
          className="card p-4 shadow"
          style={{ width: "100%", maxWidth: "900px" }}
        >
          <h3 className="text-center mb-4">Form Pendaftaran Klinik</h3>
          <form onSubmit={handleSubmit}>
            {/* Nama Klinik */}
            <div className="mb-3">
              <label htmlFor="clinicName" className="form-label">
                Nama Klinik
              </label>
              <input
                type="text"
                id="clinicName"
                className="form-control"
                placeholder="Masukkan nama klinik"
                value={clinicName}
                onChange={(e) => setClinicName(e.target.value)}
              />
            </div>
            {/* Alamat */}
            <div className="mb-3">
              <label htmlFor="alamat" className="form-label">
                Alamat Klinik
              </label>
              <textarea
                id="alamat"
                className="form-control"
                placeholder="Masukkan alamat lengkap"
                rows="3"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              ></textarea>
            </div>
            {/* KTP Upload */}
            <div className="upload-area mb-3">
              <label htmlFor="ktpUpload" className="form-label">
                Upload Gambar KTP Penanggung Jawab
              </label>
              <div
                className={`drag-area ${isDragging ? "drag-over" : ""}`}
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => handleDrop(e, setKtpFile)}
              >
                {ktpFile ? (
                  <span className="file-name">{`File Selected: ${ktpFile.name}`}</span>
                ) : (
                  <span>Drag and drop file here or click to upload</span>
                )}
              </div>
              <input
                type="file"
                id="ktpUpload"
                className="file-input"
                onChange={(e) => handleFileChange(e, setKtpFile)}
              />
            </div>

            {/* Surat Izin Upload */}
            <div className="upload-area mb-3">
              <label htmlFor="suratIzinUpload" className="form-label">
                Upload Gambar Surat Izin Operasi
              </label>
              <div
                className={`drag-area ${isDragging ? "drag-over" : ""}`}
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => handleDrop(e, setIzinFile)}
              >
                {izinFile ? (
                  <span className="file-name">{`File Selected: ${izinFile.name}`}</span>
                ) : (
                  <span>Drag and drop file here or click to upload</span>
                )}
              </div>
              <input
                type="file"
                id="suratIzinUpload"
                className="file-input"
                onChange={(e) => handleFileChange(e, setIzinFile)}
              />
            </div>

            {/* Tombol Kirim */}
            <div className="d-flex justify-content-end">
              <button type="submit" className="btn btn-primary w-100">
                Kirim
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Clinic;
