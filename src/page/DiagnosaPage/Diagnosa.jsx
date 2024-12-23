import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // Import Swal
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import "./Diagnosa.css";

const Diagnosa = () => {
  const [symptoms, setSymptoms] = useState([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const navigate = useNavigate();

  // Fetch data gejala dari backend
  useEffect(() => {
    const fetchSymptoms = async () => {
      try {
        const response = await fetch(
          "https://medis-tanggap-be.vercel.app/symptoms"
        );
        const data = await response.json();
        setSymptoms(data);
      } catch (error) {
        console.error("Error fetching symptoms:", error);
      }
    };

    fetchSymptoms();
  }, []);

  // Handle checkbox perubahan
  const handleCheckboxChange = (symptomId) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptomId)
        ? prev.filter((id) => id !== symptomId)
        : [...prev, symptomId]
    );
  };

  // Submit data dan redirect
  const handleSubmit = () => {
    const set1 = [9, 10, 12, 14];
    const set2 = [1, 2, 3, 9, 11, 15];

    const isSet1Match = set1.every((id) => selectedSymptoms.includes(id));
    const isSet2Match = set2.every((id) => selectedSymptoms.includes(id));

    if (isSet1Match || isSet2Match) {
      const resultId = isSet1Match ? 1 : 2;
      navigate("/result-diagnosa", {
        state: {
          selectedSymptoms,
          resultId, // Kirim resultId untuk ResultDiagnosa
        },
      });
    } else {
      // Ganti alert dengan Swal
      Swal.fire({
        icon: "error",
        title: "Gejala yang dipilih tidak sesuai",
        text: "Silakan pilih gejala yang sesuai dengan diagnosa ini.",
        confirmButtonText: "Ok",
      });
    }
  };

  return (
    <div>
      <Navbar />
      <div className="wrap-diagnosa">
        <div className="bg-image">
          <div className="container">
            <div className="container d-flex justify-content-center align-items-center ">
              <div className="wrap-output bg-white shadow p-4">
                <h4 className="text-center title-output fw-bold text-uppercase mb-5">
                  Pilih sesuai dengan gejala yang dialami
                </h4>
                <div className="row">
                  {symptoms.length > 0 ? (
                    symptoms.map((symptom) => (
                      <div className="col-md-4-1" key={symptom.id}>
                        <label className="checkbox-btn w-100 mb-3">
                          <input
                            type="checkbox"
                            onChange={() => handleCheckboxChange(symptom.id)}
                          />
                          <span className="text-center">{symptom.name}</span>
                        </label>
                      </div>
                    ))
                  ) : (
                    <div className="col-12 text-center">Memuat gejala...</div>
                  )}
                </div>
                <div className="d-flex justify-content-center mt-4">
                  <button
                    className="btn btn-info text-white fw-bold px-4 py-3 w-100"
                    onClick={handleSubmit}
                  >
                    Diagnosa Penyakit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Diagnosa;
