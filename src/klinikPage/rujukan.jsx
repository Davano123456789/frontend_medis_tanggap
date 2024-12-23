import React, { useState, useEffect } from "react";
import Sidebar from "../components/sidebarKlinik";
import "./klinikStyle.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MyDocument from "../page/MyDocument/MyDocument";
import { pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";

function Rujukan() {
  const navigate = useNavigate();
  const [rujukanData, setRujukanData] = useState([]);

  useEffect(() => {
    getRujukanData();
  }, []);

  const getRujukanData = async () => {
    try {
      const response = await axios.get(
        "https://medis-tanggap-be.vercel.app/api/rujukan"
      );
      setRujukanData(response.data);
    } catch (error) {
      console.error("Error fetching rujukan data:", error);
    }
  };

  // Function to calculate age from birthday
  const calculateAge = (birthday) => {
    const birthDate = new Date(birthday);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const handleDownload = async (rujukan) => {
    try {
      if (!rujukan || !rujukan.no_rujukan) {
        throw new Error("Invalid rujukan data");
      }
      const blob = await pdf(<MyDocument rujukanData={rujukan} />).toBlob();
      saveAs(blob, `rujukan_${rujukan.no_rujukan}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Gagal mengunduh PDF. Silakan coba lagi.");
    }
  };

  return (
    <>
      <Sidebar>
        <div className="container-fluid">
          <div className="d-flex justify-content-between p-3">
            <h2>Data Rujukan</h2>
            <button
              onClick={() => {
                navigate("/dashboard/rujukan/tambah-rujukan");
              }}
              className="btn btn-primary hover-button"
            >
              Buat Rujukan
            </button>
          </div>
          <div className="table-responsive">
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>No</th>
                  <th>No. Rujukan</th>
                  <th>Tanggal</th>
                  <th>RS Tujuan</th>

                  <th>Nama Pasien</th>
                  <th>Kelamin</th>
                  <th>Diagnosa</th>
                  <th>Keterangan</th>
                  <th>Dokter</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {rujukanData.map((rujukan, index) => (
                  <tr key={rujukan.id}>
                    <td>{index + 1}</td>
                    <td>{rujukan.no_rujukan}</td>
                    <td>{formatDate(rujukan.tanggal)}</td>
                    <td>{rujukan.rs_tujuan}</td>

                    <td>{rujukan.name_patient}</td>
                    <td>{rujukan.gender}</td>
                    <td>{rujukan.diagnosis}</td>
                    <td>{rujukan.description}</td>
                    <td>{rujukan.doctor}</td>
                    <td>
                      <div className="btn-group">
                        <button
                          className="btn btn-warning btn-sm me-1"
                          onClick={() =>
                            navigate(`/dashboard/rujukan/edit/${rujukan.id}`)
                          }
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger btn-sm me-1"
                          onClick={async () => {
                            if (
                              window.confirm(
                                "Apakah anda yakin ingin menghapus rujukan ini?"
                              )
                            ) {
                              try {
                                await axios.delete(
                                  `https://medis-tanggap-be.vercel.app/api/rujukan/${rujukan.id}`
                                );
                                getRujukanData();
                              } catch (error) {
                                console.error("Error deleting rujukan:", error);
                                alert("Gagal menghapus rujukan");
                              }
                            }
                          }}
                        >
                          Hapus
                        </button>
                        <button
                          className="btn btn-success btn-sm"
                          onClick={() => handleDownload(rujukan)}
                        >
                          Download
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Sidebar>
    </>
  );
}

export default Rujukan;
