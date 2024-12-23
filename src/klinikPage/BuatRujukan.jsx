import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SidebarKlinik from "../components/sidebarKlinik";
import "./rujukan.css";

// Configure axios defaults globally
axios.defaults.baseURL = "https://medis-tanggap-be.vercel.app";
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.withCredentials = true;

function BuatRujukan() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    no_rujukan: "",
    tanggal: new Date().toISOString().split("T")[0],
    rs_tujuan: "",
    no_kartu: "",
    name_patient: "",
    gender: "male",
    address: "",
    birthday_date: "",
    diagnosis: "",
    description: "",
    doctor: "",
  });

  // Function to generate rujukan number
  const generateRujukanNumber = async () => {
    try {
      const response = await axios.get("/api/rujukan/count/today");
      const { nextSequence } = response.data;

      const date = new Date();
      const year = date.getFullYear().toString();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");

      // Format sequence number to 4 digits
      const sequence = nextSequence.toString().padStart(4, "0");

      // Format: YYYYMMDD-XXXX
      const rujukanNumber = `${year}${month}${day}-${sequence}`;

      console.log("Generated rujukan number:", rujukanNumber); // Debug log

      setFormData((prev) => ({
        ...prev,
        no_rujukan: rujukanNumber,
      }));

      setIsLoading(false);
      return rujukanNumber;
    } catch (error) {
      console.error("Error generating rujukan number:", error);
      setIsLoading(false);
      throw error;
    }
  };

  useEffect(() => {
    generateRujukanNumber();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) {
      alert("Mohon tunggu, nomor rujukan sedang dibuat");
      return;
    }

    try {
      // Format data before sending
      const dataToSubmit = {
        no_rujukan: formData.no_rujukan.trim(),
        tanggal: new Date().toISOString().split("T")[0],
        rs_tujuan: formData.rs_tujuan.trim(),
        no_kartu: formData.no_kartu.trim(),
        name_patient: formData.name_patient.trim(),
        gender: formData.gender === "male" ? "Laki-laki" : "Perempuan",
        address: formData.address.trim(),
        birthday_date: formData.birthday_date,
        diagnosis: formData.diagnosis.trim(),
        description: formData.description ? formData.description.trim() : null,
        doctor: formData.doctor.trim(),
      };

      // Log the data being sent
      console.log("Submitting data:", dataToSubmit);

      const response = await axios.post("/api/rujukan", dataToSubmit);

      console.log("Server response:", response.data);
      alert("Rujukan berhasil dibuat!");
      navigate("/dashboard/rujukan");
    } catch (error) {
      console.error("Submit error:", error.response?.data);
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.details?.[0] ||
        "Gagal membuat rujukan. Silakan coba lagi.";
      alert(errorMessage);
    }
  };

  return (
    <SidebarKlinik>
      <div className="h-100 ">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <h3>Buat Rujukan</h3>
          </div>
          <div className="mb-3">
            <label className="form-label">Nomor Rujukan</label>
            <input
              type="text"
              className="form-control"
              value={formData.no_rujukan}
              disabled
            />
          </div>
          <div className="mb-3">
            <label htmlFor="rs_tujuan" className="form-label">
              Rumah Sakit Tujuan
            </label>
            <input
              type="text"
              className="form-control"
              id="rs_tujuan"
              name="rs_tujuan"
              value={formData.rs_tujuan}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="no_kartu" className="form-label">
              NIK
            </label>
            <input
              type="text"
              className="form-control"
              id="no_kartu"
              name="no_kartu"
              value={formData.no_kartu}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="name_patient" className="form-label">
              Nama Pasien
            </label>
            <input
              type="text"
              className="form-control"
              id="name_patient"
              name="name_patient"
              value={formData.name_patient}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="gender" className="form-label">
              Jenis Kelamin
            </label>
            <select
              name="gender"
              id="gender"
              className="form-control"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="male">Laki-laki</option>
              <option value="female">Perempuan</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="address" className="form-label">
              Alamat
            </label>
            <textarea
              className="form-control"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="birthday_date" className="form-label">
              Tanggal Lahir
            </label>
            <input
              type="date"
              className="form-control"
              id="birthday_date"
              name="birthday_date"
              value={formData.birthday_date}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="diagnosis" className="form-label">
              Diagnosa
            </label>
            <input
              type="text"
              className="form-control"
              id="diagnosis"
              name="diagnosis"
              value={formData.diagnosis}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Keterangan
            </label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>{" "}
          <div className="mb-3">
            <label htmlFor="doctor" className="form-label">
              Dokter Pemeriksa
            </label>
            <input
              className="form-control"
              id="doctor"
              name="doctor"
              value={formData.doctor}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isLoading}
          >
            {isLoading ? "Memuat..." : "Konfirmasi"}
          </button>
        </form>
      </div>
    </SidebarKlinik>
  );
}

export default BuatRujukan;
