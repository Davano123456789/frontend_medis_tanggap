import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import { useNavigate } from "react-router-dom";
import Kalteng from "../../images/kalteng.png"
import "./rs.css";

function RumahSakit() {
    const navigate = useNavigate()
    return(
        <>
        <Navbar />
        <div id="rs">
            <div className="header text-center p-4">
                <p>Pilih Provinsi</p>
            </div>
            <main className="container flex-container p-4">
                <a href="./provinsi">
                    <div class="card">
                        <img src={Kalteng} class="card-img-top" alt="..."/>
                        <div class="card-body text-center">
                            <h5 class="card-title">Kalimantan Tengah</h5>
                        </div>
                    </div>
                </a>
                <a href="./provinsi">
                    <div class="card">
                        <img src={Kalteng} class="card-img-top" alt="..."/>
                        <div class="card-body text-center">
                            <h5 class="card-title">Kalimantan Tengah</h5>
                        </div>
                    </div>
                </a>
                <a href="./provinsi">
                    <div class="card">
                        <img src={Kalteng} class="card-img-top" alt="..."/>
                        <div class="card-body text-center">
                            <h5 class="card-title">Kalimantan Tengah</h5>
                        </div>
                    </div>
                </a>
                <a href="./provinsi">
                    <div class="card">
                        <img src={Kalteng} class="card-img-top" alt="..."/>
                        <div class="card-body text-center">
                            <h5 class="card-title">Kalimantan Tengah</h5>
                        </div>
                    </div>
                </a>
                <a href="./provinsi">
                    <div class="card">
                        <img src={Kalteng} class="card-img-top" alt="..."/>
                        <div class="card-body text-center">
                            <h5 class="card-title">Kalimantan Tengah</h5>
                        </div>
                    </div>
                </a>
                <a href="./provinsi">
                    <div class="card">
                        <img src={Kalteng} class="card-img-top" alt="..."/>
                        <div class="card-body text-center">
                            <h5 class="card-title">Kalimantan Tengah</h5>
                        </div>
                    </div>
                </a>
                <a href="./provinsi">
                    <div class="card">
                        <img src={Kalteng} class="card-img-top" alt="..."/>
                        <div class="card-body text-center">
                            <h5 class="card-title">Kalimantan Tengah</h5>
                        </div>
                    </div>
                </a>
                <a href="./provinsi">
                    <div class="card">
                        <img src={Kalteng} class="card-img-top" alt="..."/>
                        <div class="card-body text-center">
                            <h5 class="card-title">Kalimantan Tengah</h5>
                        </div>
                    </div>
                </a>
                
                
            </main>
        </div>
        <Footer />
        </>
    )
}

export default RumahSakit