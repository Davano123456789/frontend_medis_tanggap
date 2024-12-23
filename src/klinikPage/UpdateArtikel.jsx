import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SidebarKlinik from "../components/sidebarKlinik";
import axios from "axios";
import Swal from "sweetalert2";

function UpdateArtikel() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    author: "",
    title: "",
    description: "",
    content: "",
  });

  useEffect(() => {
    const getArticleById = async () => {
      try {
        const response = await axios.get(
          `https://medis-tanggap-be.vercel.app/api/articles/${id}`
        );
        const { author, title, description, content } = response.data;
        setFormData({ author, title, description, content });
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "Gagal mengambil data artikel",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    };
    getArticleById();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `https://medis-tanggap-be.vercel.app/api/articles/${id}`,
        formData
      );
      Swal.fire({
        title: "Success!",
        text: "Artikel berhasil diperbarui",
        icon: "success",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/dashboard/artikel");
        }
      });
    } catch (error) {
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
            <h3>Ubah Artikel</h3>
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
          <button type="submit" className="btn btn-warning">
            Update Artikel
          </button>
        </form>
      </div>
    </SidebarKlinik>
  );
}

export default UpdateArtikel;
