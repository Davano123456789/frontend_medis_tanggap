import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import { useNavigate } from "react-router-dom";

function Pengajuan() {
    const navigate = useNavigate()
    return(
        <>
        <Navbar />
        <div id="rs">
            <div className="header text-center p-4">
                <p>Pengajuan Klinik</p>
            </div>
            <main className="container flex-container p-4">
                    
                
            </main>
        </div>
        <Footer />
        </>
    )
}

export default Pengajuan