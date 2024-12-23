import "./footer.css";
import logoPutih from "../images/logo-putih.png";
import { Link } from "react-router-dom";
function Footer() {
  return (
    <footer class="footer">
      <div class="footer-container">
        <div class="footer-column">
          <img src={logoPutih} alt="logo" />
          <p>
            Medis Tanggap memudahkan akses layanan kesehatan ibu hamil dengan
            diagnosis cepat, informasi kesehatan, dan rujukan rumah sakit
            akurat.
          </p>
        </div>

        <div class="footer-column respo-2">
          <h6 className="mb-4">Navigasi</h6>
          <ul>
            <li>
              <Link to="/">Beranda</Link>
            </li>
            <li>
              <Link to="/diagnosa">Diagnosa</Link>
            </li>
            <li>
              <Link to="/artikel">Artikel</Link>
            </li>
            <li>
              <Link to="/rumah-sakit">Rumah Sakit</Link>
            </li>
            <li>
              <Link to="/daftar-klinik">Daftar Klinik</Link>
            </li>
          </ul>
        </div>

        <div class="footer-column">
          <h6 className="mb-4">Sosial Media</h6>
          <div className="linktree">
            <Link to="#" className="facebook">
              <i class="fa-brands fa-instagram"></i> Instagram
            </Link>
          </div>
          <div className="linktree">
            <Link to="#" className="facebook">
              <i class="fa-brands fa-linkedin-in"></i> linkedin
            </Link>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <p>
          &copy; Semua hak dilindungi | Website dibuat oleh 
          <a href="#" class="footer-link ms-2">
            Medis Tanggap
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
