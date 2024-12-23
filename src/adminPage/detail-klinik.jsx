import React, { useEffect, useState } from "react";
import Sidebar from "../components/sidebarAdmin";
import { Link, useParams } from "react-router-dom";
import "./detail-klinik.css";

function DetailKlinik() {
  const { id } = useParams(); // Mengambil id dari URL params
  const [clinicDetail, setClinicDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data detail klinik berdasarkan ID
  useEffect(() => {
    const fetchClinicDetail = async () => {
      try {
        const response = await fetch(
          `https://medis-tanggap-be.vercel.app/users/clinic/${id}`
        );
        const data = await response.json();

        if (response.ok) {
          setClinicDetail(data.data); // Menyimpan data klinik yang ditemukan
        } else {
          setError(data.message); // Menyimpan pesan error jika tidak ditemukan
        }
      } catch (err) {
        setError("Terjadi kesalahan dalam mengambil data");
      } finally {
        setLoading(false); // Mengubah loading menjadi false setelah data diambil
      }
    };

    fetchClinicDetail();
  }, [id]);

  // Loading state
  if (loading) {
    return <p>Loading...</p>;
  }

  // Error handling
  if (error) {
    return <p>{error}</p>;
  }

  return (
    <Sidebar>
      <div className="container mt-4">
        <h2 className="mb-4">Detail Data Klinik</h2>
        <div className="card">
          <div className="card-body">
            {clinicDetail ? (
              <table className="table table-borderless table2">
                <tbody>
                  <tr>
                    <th>Nama</th>
                    <td>{clinicDetail.name}</td>
                  </tr>
                  <tr>
                    <th>Telepon</th>
                    <td>{clinicDetail.phone}</td>
                  </tr>
                  <tr>
                    <th>Email</th>
                    <td>{clinicDetail.email}</td>
                  </tr>
                  <tr>
                    <th>Created At</th>
                    <td>
                      {new Date(clinicDetail.createdAt).toLocaleString(
                        "id-ID",
                        { timeZone: "Asia/Jakarta", hour12: false }
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            ) : (
              <p>Klinik tidak ditemukan</p>
            )}
          </div>
        </div>
        <div className="mt-4 mb-4">
          <Link to="/admin/daftar-klinik" className="btn btn-info">
            Kembali
          </Link>
        </div>
      </div>
    </Sidebar>
  );
}

export default DetailKlinik;
