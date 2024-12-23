import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SidebarKlinik from "../components/sidebarKlinik";
import axios from "axios";
import Swal from "sweetalert2";

function BuatArtikel() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    author: "",
    title: "",
    description: "",
    content: "",
    date: new Date().toISOString().split("T")[0],
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://medis-tanggap-be.vercel.app/api/articles",
        formData
      );

      Swal.fire({
        title: "Success!",
        text: "Artikel berhasil ditambahkan",
        icon: "success",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/dashboard/artikel");
        }
      });
    } catch (error) {
      console.error("Error details:", error.response || error); // Add error logging
      Swal.fire({
        title: "Error!",
        text: error.response?.data?.msg || "Terjadi kesalahan",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <SidebarKlinik>
      <div className="h-100" style={{ minWidth: "1200px" }}>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <h3>Buat Artikel</h3>
          </div>
          <div className="mb-3">
            <label htmlFor="author" className="form-label">
              Penulis
            </label>
            <input
              type="text"
              className="form-control"
              id="author"
              value={formData.author}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Judul
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Deskripsi
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="content" className="form-label">
              Konten
            </label>
            <textarea
              className="form-control"
              id="content"
              value={formData.content}
              onChange={handleChange}
              required
              rows="5"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Simpan Artikel
          </button>
        </form>
      </div>
    </SidebarKlinik>
  );
}

export default BuatArtikel;
