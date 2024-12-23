import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Sidebar from "../components/sidebarAdmin";
import Swal from "sweetalert2";
import "./detail-klinik.css";

function DetailPengajuan() {
  const [clinicDetails, setClinicDetails] = useState(null);
  const { id } = useParams(); // Mengambil ID dari URL params

  useEffect(() => {
    const fetchClinicDetails = async () => {
      try {
        const token = localStorage.getItem("accessToken"); // Ambil token dari localStorage
        const response = await fetch(
          `https://medis-tanggap-be.vercel.app/api/detail-pengajuan/${id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`, // Sertakan token untuk otentikasi
            },
          }
        );

        if (!response.ok) {
          throw new Error("Gagal mengambil data klinik.");
        }

        const data = await response.json();
        setClinicDetails(data); // Menyimpan data klinik ke state
      } catch (error) {
        console.error("Error fetching clinic details:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Gagal mengambil data klinik.",
        });
      }
    };

    fetchClinicDetails();
  }, [id]);

  return (
    <Sidebar>
      <div className="container mt-4">
        <h2 className="mb-4">Detail Pengajuan Klinik</h2>
        <div className="card">
          <div className="card-body">
            {clinicDetails ? (
              <table className="table table-borderless table2">
                <tbody>
                  <tr>
                    <th>Nama Klinik</th>
                    <td>{clinicDetails.clinic_name}</td>
                  </tr>
                  <tr>
                    <th>Alamat</th>
                    <td>{clinicDetails.address}</td>
                  </tr>
                  <tr>
                    <th>File KTP</th>
                    <td>
                      <a
                        href={`https://medis-tanggap-be.vercel.app/uploads/${clinicDetails.ktp_owner}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Lihat KTP
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <th>Surat Jalan</th>
                    <td>
                      <a
                        href={`https://medis-tanggap-be.vercel.app/uploads/${clinicDetails.operation_license}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Lihat Surat Jalan
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <th>Diunggah</th>
                    <td>
                      {new Date(clinicDetails.createdAt).toLocaleString(
                        "id-ID",
                        {
                          timeZone: "Asia/Jakarta",
                          hour12: false,
                        }
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            ) : (
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            )}
          </div>
        </div>
        <div className="mt-4 mb-4">
          <Link to="/admin/pengajuan" className="btn btn-info">
            Kembali
          </Link>
        </div>
      </div>
    </Sidebar>
  );
}

export default DetailPengajuan;
