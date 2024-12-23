import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import { useLocation, useNavigate } from "react-router-dom";
import Kalteng from "../../images/kalteng.png"
import "./rs.css";

function Rs() {
    const navigate = useNavigate();
    const location = useLocation();
    const provinsi = location.state?.provinsi || "Default Value";

    return(
        <>
        <Navbar />
        <div id="detailrs">
            <div className="header text-center p-4">
                <p>Pilih Rumah Sakit</p>
                <p>{provinsi}</p>
            </div>
            <main className="container d-flex p-4 justify-content-center">
                <div className="d-flex rs gap-4 flex-column">
                <button className="btn" onClick={()=>{navigate("/kamar", { state: { rumahSakit: "RSDI Kota Banjarbaru" } })}}>RSDI Kota Banjarbaru</button>
                <button className="btn" onClick={()=>{navigate("/kamar", { state: { rumahSakit: "RSDI Kota Banjarbaru" } })}}>RSDI Kota Banjarbaru</button>
                <button className="btn" onClick={()=>{navigate("/kamar", { state: { rumahSakit: "Rumah Sakit Umum Mawar" } })}}>Rumah Sakit Umum Mawar</button>
                <button className="btn" onClick={()=>{navigate("/kamar", { state: { rumahSakit: "Rumah Sakit Umum Mawar" } })}}>Rumah Sakit Umum Mawar</button>
                </div>
            </main>
        </div>
        <Footer />
        </>
    )
}

export default Rs