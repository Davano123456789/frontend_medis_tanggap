import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../components/sidebarKlinik";
import axios from "axios";
import Swal from "sweetalert2";
import "./klinikStyle.css";
import "../adminPage/responsive.css";

function KlinikArtikel() {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getArticles();
  }, []);

  const getArticles = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://medis-tanggap-be.vercel.app/api/articles"
      );
      console.log("API Response:", response.data); // Debug log
      if (response.data) {
        setArticles(response.data);
      }
    } catch (error) {
      console.error("Error fetching articles:", error);
      setError("Failed to fetch articles");
      Swal.fire("Error", "Failed to load articles: " + error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Apakah anda yakin?",
        text: "Data yang dihapus tidak dapat dikembalikan!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Ya, hapus!",
        cancelButtonText: "Batal",
      });

      if (result.isConfirmed) {
        await axios.delete(
          `https://medis-tanggap-be.vercel.app/api/articles/${id}`
        );
        await getArticles(); // Refresh the articles list
        Swal.fire("Terhapus!", "Data artikel berhasil dihapus.", "success");
      }
    } catch (error) {
      console.error("Error deleting article:", error);
      Swal.fire("Error!", "Terjadi kesalahan saat menghapus artikel.", "error");
    }
  };

  return (
    <Sidebar>
      {/* <div className="h-100 " style={{ minWidth: '1200px' }}> */}
      <div className="container-fluid">
        <div className="d-flex justify-content-between p-3">
          <h2>Data Artikel</h2>
          <Link
            to="/dashboard/artikel/tambah-artikel"
            className="btn btn-primary hover-button"
          >
            Buat Artikel
          </Link>
        </div>
        {loading ? (
          <div className="text-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : error ? (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Penulis</th>
                  <th>Judul</th>
                  <th>Waktu</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {articles.length > 0 ? (
                  articles.map((article, index) => (
                    <tr key={article.id}>
                      <td>{index + 1}</td>
                      <td>{article.author || "N/A"}</td>
                      <td>{article.title || "N/A"}</td>
                      <td>
                        {article.date
                          ? new Date(article.date).toLocaleDateString()
                          : "N/A"}
                      </td>
                      <td>
                        <button
                          className="btn btn-warning btn-sm me-2"
                          onClick={() =>
                            navigate(
                              `/dashboard/artikel/edit-artikel/${article.id}`
                            )
                          }
                        >
                          Ubah
                        </button>
                        <button
                          className="btn btn-danger btn-sm me-2"
                          onClick={() => handleDelete(article.id)}
                        >
                          Hapus
                        </button>
                        <Link
                          to={`/dashboard/artikel/detail/${article.id}`}
                          className="btn btn-info btn-sm"
                        >
                          Lihat Detail
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center">
                      Tidak ada artikel yang tersedia
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {/* </div> */}
    </Sidebar>
  );
}

export default KlinikArtikel;
