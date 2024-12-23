import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import SidebarKlinik from "../components/sidebarKlinik";

function EditRujukan() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    no_rujukan: "",
    tanggal: "",
    rs_tujuan: "",
    no_kartu: "",
    name_patient: "",
    gender: "",
    address: "",
    birthday_date: "",
    diagnosis: "",
    description: "",
    doctor: "",
  });

  useEffect(() => {
    const getRujukanById = async () => {
      try {
        const response = await axios.get(
          `https://medis-tanggap-be.vercel.app/api/rujukan/${id}`
        );
        const data = response.data;

        // Format the date to YYYY-MM-DD for the input field
        const formattedBirthDate = data.birthday_date.split("T")[0];
        const formattedTanggal = data.tanggal.split("T")[0];

        setFormData({
          ...data,
          birthday_date: formattedBirthDate,
          tanggal: formattedTanggal,
          gender: data.gender === "Laki-laki" ? "male" : "female",
        });
      } catch (error) {
        console.error("Error fetching rujukan:", error);
        alert("Gagal mengambil data rujukan");
      }
    };

    getRujukanById();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSubmit = {
        ...formData,
        gender: formData.gender === "male" ? "Laki-laki" : "Perempuan",
      };

      await axios.patch(
        `https://medis-tanggap-be.vercel.app/api/rujukan/${id}`,
        dataToSubmit
      );
      alert("Rujukan berhasil diperbarui!");
      navigate("/dashboard/rujukan");
    } catch (error) {
      console.error("Error updating rujukan:", error);
      alert("Gagal memperbarui rujukan");
    }
  };

  return (
    <SidebarKlinik>
      <div className="h-100" style={{ minWidth: "1200px" }}>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <h3>Edit Rujukan</h3>
          </div>
          <div className="mb-3">
            <label className="form-label">Nomor Rujukan</label>
            <input
              type="text"
              className="form-control"
              name="no_rujukan"
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
              value={formData.description || ""}
              onChange={handleChange}
            />
          </div>
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
          <button type="submit" className="btn btn-warning">
            Update Rujukan
          </button>
        </form>
      </div>
    </SidebarKlinik>
  );
}

export default EditRujukan;
