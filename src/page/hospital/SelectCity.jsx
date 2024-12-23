// SelectCity.js
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getCities } from './ApiHospital';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'; // Ikon lokasi

const SelectCity = () => {
  const { provinceId } = useParams();
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCities = async () => {
      try {
        setLoading(true);
        const data = await getCities(provinceId);
        setCities(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCities();
  }, [provinceId]);

  const handleSelect = (cityId) => {
    if (cityId) {
      navigate(`/select-hospital/${provinceId}/${cityId}`);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="wrap-all-city">
        <div className="city-container">
          <div className="title-hospital">
            <h1>Pilih Kota/Kabupaten</h1>
          </div>
          {loading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Memuat data kota...</p>
            </div>
          ) : (
            <div className="city-cards">
              {cities.map((city) => (
                <div
                  key={city.id}
                  className="city-card"
                  onClick={() => handleSelect(city.id)} // Menambahkan onClick ke div
                  style={{ cursor: 'pointer' }} // Memberikan efek kursor pointer agar terlihat seperti link
                >
                  <FontAwesomeIcon icon={faLocationDot} className="city-icon" /> {/* Menambahkan ikon */}
                  <h3>{city.name}</h3>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SelectCity;
