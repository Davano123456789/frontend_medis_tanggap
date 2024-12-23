import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProvinces } from "./ApiHospital"; // Fungsi untuk mengambil data dari database
import provincesData from "./provinces.json"; // JSON dengan URL gambar
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"; // Ikon pencarian
import "./Hospital.css";

const SelectProvince = () => {
  const [provinces, setProvinces] = useState([]);
  const [filteredProvinces, setFilteredProvinces] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // To handle errors
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        setLoading(true);
        const dbProvinces = await getProvinces();
        setProvinces(dbProvinces);
        setFilteredProvinces(dbProvinces); // Set data awal untuk filter
      } catch (error) {
        console.error("Error fetching provinces:", error);
        setError("Gagal memuat data provinsi"); // Set error message
      } finally {
        setLoading(false);
      }
    };

    fetchProvinces();
  }, []);

  const handleSelect = (provinceId) => {
    if (provinceId) {
      navigate(`/select-city/${provinceId}`);
    }
  };

  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setSearch(searchValue);
    const result = provinces.filter((province) =>
      province.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredProvinces(result);
  };

  const getImageUrl = (provinceName) => {
    const provinceData = provincesData.find(
      (data) => data.name.toLowerCase() === provinceName.toLowerCase()
    );
    return provinceData
      ? `${process.env.PUBLIC_URL}/${provinceData.imageUrl}`
      : `${process.env.PUBLIC_URL}/images/default.png`;
  };

  return (
    <div>
      <Navbar />
      <div className="province-container">
        <h1>Pilih Provinsi</h1>

        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Provinsi..."
            aria-label="Search province"
            value={search}
            onChange={handleSearch}
          />
          <span className="input-icon">
            <FontAwesomeIcon className="icon" icon={faMagnifyingGlass} />
          </span>
        </div>

        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Memuat data provinsi...</p>
          </div>
        ) : error ? (
          <div className="error-container">
            <p>{error}</p>
          </div>
        ) : (
          <div className="province-cards">
            {filteredProvinces.length > 0 ? (
              filteredProvinces.map((province) => (
                <div
                  className="province-card"
                  key={province.id}
                  onClick={() => handleSelect(province.id)}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={getImageUrl(province.name)}
                    alt={province.name}
                    className="province-image"
                  />
                  <h3>{province.name}</h3>
                </div>
              ))
            ) : (
              <div className="message">
                <p>Provinsi tidak ditemukan.</p>
              </div>
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default SelectProvince;
