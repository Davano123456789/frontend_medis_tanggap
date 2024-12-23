import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import { useLocation, useNavigate } from "react-router-dom";
import "./rs.css";

function Kamar() {
    const navigate = useNavigate();
    const location = useLocation();
    const rumahSakit = location.state?.rumahSakit || "Default Value";

    return(
        <>
        <Navbar />
        <div id="kamar">
            <div className="header text-center p-4">
                <p>Pilih Kamar</p>
                <p>{rumahSakit}</p>
            </div>
            <main className="">
                <section className="d-flex p-4 w-75 align-items-center">
                    <div className="col-md-6">
                        <h3>VVIP</h3>
                    </div>
                    <div className="col-md-6 d-flex justify-content-end text-center gap-3">
                        <div className="p-2 box">
                            Jumlah <br /> 5
                        </div>
                        <div className="p-2 box">
                            Kosong <br /> 2
                        </div>
                    </div>
                </section>

                <section className="d-flex p-4 w-75 align-items-center">
                    <div className="col-md-6">
                        <h3>VIP</h3>
                    </div>
                    <div className="col-md-6 d-flex justify-content-end text-center gap-3">
                        <div className="p-2 box">
                            Jumlah <br /> 5
                        </div>
                        <div className="p-2 box">
                            Kosong <br /> 2
                        </div>
                    </div>
                </section>

                <section className="d-flex p-4 w-75 align-items-center">
                    <div className="col-md-6">
                        <h3>Kelas I</h3>
                    </div>
                    <div className="col-md-6 d-flex justify-content-end text-center gap-3">
                        <div className="p-2 box">
                            Jumlah <br /> 5
                        </div>
                        <div className="p-2 box">
                            Kosong <br /> 2
                        </div>
                    </div>
                </section>
            </main>
        </div>
        <Footer />
        </>
    )
}

export default Kamar