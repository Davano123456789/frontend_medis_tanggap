import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import "./ResultDiagnosa.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStethoscope,
  faBookOpen,
  faPills,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

const ResultDiagnosa = () => {
  const { state } = useLocation();
  const [result, setResult] = useState(null);
  const resultId = state?.resultId; // Ambil resultId dari state
  const selectedSymptoms = state?.selectedSymptoms || []; // Gejala yang dipilih

  // Fetch hasil berdasarkan resultId
  useEffect(() => {
    const fetchResult = async () => {
      try {
        const response = await fetch(
          `https://medis-tanggap-be.vercel.app/results/${resultId}`
        );
        if (!response.ok) {
          throw new Error("Terjadi kesalahan pada server");
        }
        const data = await response.json();
        setResult(data);
      } catch (error) {
        console.error("Error fetching result:", error);
        setResult(null); // Agar tampil pesan error jika gagal mengambil data
      }
    };

    if (resultId) {
      fetchResult();
    }
  }, [resultId]);

  return (
    <div>
      <Navbar />
      <div className="wrap-result-diagnosa">
        <div className="bg-image1">
          <div className="container py-5">
            <div className="d-flex justify-content-center align-items-center min-vh-100">
              <div className="wrap-output1 bg-white shadow p-4 rounded">
                {result ? (
                  <>
                    <h4 className="text-center title-output fw-bold text-uppercase mb-4">
                      HASIL PENYAKIT
                    </h4>
                    <div
                      className="mb-4"
                      style={{
                        backgroundColor: "#47ABC1",
                        borderRadius: "20px",
                      }}
                    >
                      <h5 className="fw-bold pt-4 ms-4 mb-2">
                        <FontAwesomeIcon
                          icon={faStethoscope}
                          className="me-2"
                        />
                        Diagnosa Penyakit
                      </h5>
                      <p className="text-white ms-1 me-4 p-4 pt-2 rounded">
                        <div className="row">
                          <div className="col-1" style={{ width: "30px" }}>
                            <FontAwesomeIcon
                              icon={faArrowRight}
                              className="me-2"
                            />
                          </div>
                          <div className="col">
                            {result.disease || "Nama Penyakit"}
                          </div>
                        </div>
                      </p>
                    </div>
                    <div
                      className="mb-4"
                      style={{
                        backgroundColor: "#47ABC1",
                        borderRadius: "20px",
                      }}
                    >
                      <h5 className="fw-bold pt-4 ms-4 mb-2">
                        <FontAwesomeIcon icon={faBookOpen} className="me-2" />
                        Penjelasan
                      </h5>
                      <div className="text-white ms-1 me-4 p-4 pt-2 rounded">
                        <div className="row">
                          <div className="col-1" style={{ width: "30px" }}>
                            <FontAwesomeIcon
                              icon={faArrowRight}
                              className="me-2"
                            />
                          </div>
                          <div className="col">
                            <p>
                              {result.explanation ||
                                "Penjelasan tidak tersedia"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="mb-4"
                      style={{
                        backgroundColor: "#47ABC1",
                        borderRadius: "20px",
                      }}
                    >
                      <h5 className="fw-bold pt-4 ms-4 mb-2">
                        <FontAwesomeIcon icon={faPills} className="me-2" />
                        Cara Pengobatan
                      </h5>
                      <div className="text-white ms-1 me-4 p-4 pt-2 rounded">
                        <div className="row">
                          <div className="col-1" style={{ width: "30px" }}>
                            <FontAwesomeIcon icon={faArrowRight} />
                          </div>
                          <div className="col">
                            <p>
                              {result.treatment || "Pengobatan tidak tersedia"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <p className="text-center">Tidak ada hasil yang sesuai.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ResultDiagnosa;
