import { useState } from "react";
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import { useNavigate } from "react-router-dom";
import Kalteng from "../../images/kalteng.png"
import "./rs.css";

function Provinsi() {
    const navigate = useNavigate()

    const [provinsi, setProvinsi] = useState()
    function handleProvinsi(e) {
        const selectedProvinsi = e.target.value;
        setProvinsi(selectedProvinsi);
        navigate(`/rs`, { state: { provinsi: selectedProvinsi } });
    }

    return(
        <>
        <Navbar />
        <div id="provinsi">
            <div className="header text-center p-4">
                <p>Pilih Kota / Kabupaten</p>
            </div>
            <main className="container d-flex p-4 justify-content-center">
                <div className="d-flex flex-column">
                <img src={Kalteng} alt="" className="mb-4" />
                <select name="" onChange={handleProvinsi} id="">
                    <option value="Kota Banjarmasin">Kota Banjarmasin</option>
                    <option value="Kota Banjarbaru">Kota Banjarbaru</option>
                    <option value="Kabupaten Kotabaru">Kabupaten Kotabaru</option>
                </select>
                </div>
            </main>
        </div>
        <Footer />
        </>
    )
}

export default Provinsi