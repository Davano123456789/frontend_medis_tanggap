import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBedDetail } from "./ApiHospital";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";

const SelectBed = () => {
  const { hospitalId } = useParams();
  const [beds, setBeds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBedDetails = async () => {
      try {
        setLoading(true);
        const data = await getBedDetail(hospitalId, 2); // Fetch non-COVID beds
        if (data && Array.isArray(data.bedDetail)) {
          setBeds(data.bedDetail);
        } else {
          setBeds([]);
        }
      } catch (error) {
        console.error("Error fetching bed details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBedDetails();
  }, [hospitalId]);

  return (
    <div>
      <Navbar />
      <div className="wrap-bed">
        <div className="title-bed">
          <h1>Kapasitas Kasur</h1>
        </div>
        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Memuat data kapasitas kasur...</p>
          </div>
        ) : beds.length > 0 ? (
          <div className="table-responsive">
            <table className="bed-table">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Ruang</th>
                  <th>Kapasitas Tersedia</th>
                </tr>
              </thead>
              <tbody>
                {beds.map((bed, index) => {
                  const totalBeds =
                    bed.stats.bed_available + bed.stats.bed_empty; 
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{bed.stats.title}</td>
                      <td>
                        Tersedia: {bed.stats.bed_empty} dari {totalBeds}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="no-data-container">
            <p>Maaf, informasi mengenai ketersediaan kasur tidak tersedia, kami akan segera memperbarui data</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default SelectBed;
