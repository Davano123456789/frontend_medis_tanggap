import Swal from "sweetalert2";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/sidebarAdmin";
import "./responsive.css";
import axios from "axios";

function DaftarKlinik() {
  // State untuk menyimpan data klinik
  const [clinics, setClinics] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fungsi untuk mengambil data dari API
  const fetchClinics = async () => {
    try {
      const response = await fetch(
        "https://medis-tanggap-be.vercel.app/users/clinic"
      );
      const data = await response.json();
      console.log("Response API:", data); // Debug respons
      setClinics(data.data); // Akses properti data yang berisi array
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  // Fungsi untuk menghapus data (opsional)

  const handleDelete = async (id) => {
    // Konfirmasi dengan SweetAlert2
    Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Data yang dihapus tidak dapat dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, Hapus!",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Proses penghapusan
          const response = await axios.delete(
            `https://medis-tanggap-be.vercel.app/users/clinic/${id}`
          );

          // Jika berhasil
          Swal.fire({
            title: "Berhasil!",
            text: response.data.message,
            icon: "success",
            confirmButtonText: "OK",
          });

          // Reload data
          fetchClinics();
        } catch (error) {
          // Jika gagal
          Swal.fire({
            title: "Gagal!",
            text: "Data gagal dihapus. Silakan coba lagi.",
            icon: "error",
            confirmButtonText: "OK",
          });
          console.error("Error deleting clinic:", error);
        }
      }
    });
  };

  // UseEffect untuk memanggil fetchClinics saat komponen dimuat
  useEffect(() => {
    fetchClinics();
  }, []);

  return (
    <>
      <Sidebar>
        <div className="container-fluid">
          <div className="d-flex justify-content-between p-3">
            <h2>Daftar Data Klinik</h2>
          </div>
          {/* Wrapper untuk scroll horizontal */}
          <div className="table-responsive">
            {loading ? (
              <p>Loading...</p> // Menampilkan pesan loading
            ) : Array.isArray(clinics) && clinics.length > 0 ? (
              <table className="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Nama</th>
                    <th>Telepon</th>
                    <th>Email</th>
                    <th>Dibuat</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {clinics.map((clinic, index) => (
                    <tr key={clinic.id}>
                      <td>{index + 1}</td>
                      <td>{clinic.name}</td>
                      <td>{clinic.phone}</td>
                      <td>{clinic.email}</td>
                      <td>
                        {new Date(clinic.createdAt).toLocaleString("id-ID", {
                          timeZone: "Asia/Jakarta",
                          hour12: false,
                        })}
                      </td>
                      <td>
                        <button
                          className="btn btn-danger btn-sm me-2"
                          onClick={() => handleDelete(clinic.id)}
                        >
                          Hapus
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>Daftar Klinik Kosong</p> // Menampilkan pesan jika data kosong
            )}
          </div>
        </div>
      </Sidebar>
    </>
  );
}

export default DaftarKlinik;
