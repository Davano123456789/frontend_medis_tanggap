import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getHospitals } from './ApiHospital';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';

const SelectHospital = () => {
  const { provinceId, cityId } = useParams();
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        setLoading(true);
        const data = await getHospitals(provinceId, cityId, 2);
        setHospitals(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchHospitals();
  }, [provinceId, cityId]);

  const handleSelect = (hospitalId) => {
    navigate(`/select-bed/${hospitalId}`);
  };

  return (
    <div>
      <Navbar />
      <div className="wrap-hopital">
        <div className="title-hospital">
          <h2>Daftar Rumah Sakit</h2>
        </div>
        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Memuat data rumah sakit...</p>
          </div>
        ) : hospitals.length > 0 ? (
          <table className="hospital-table">
            <thead>
              <tr>
                <th>No</th>
                <th>Nama Rumah Sakit</th>
                <th>Alamat</th>
                <th>Telepon</th>
                <th>Info Pembaruan</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {hospitals.map((hospital, index) => (
                <tr key={hospital.id}>
                  <td>{index + 1}</td>
                  <td>{hospital.name}</td>
                  <td>{hospital.address}</td>
                  <td>{hospital.phone}</td>
                  <td>
                    {hospital.available_beds && hospital.available_beds[0]
                      ? hospital.available_beds[0].info
                      : 'Informasi tidak tersedia'}
                  </td>
                  <td>
                    <button
                      onClick={() => handleSelect(hospital.id)}
                      className="btn-action"
                    >
                      Pilih
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="no-hospital-message">
          <p>Rumah sakit belum tersedia di lokasi ini. Kami akan segera memperbarui data.</p>
        </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default SelectHospital;
