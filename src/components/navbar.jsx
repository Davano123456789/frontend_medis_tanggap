import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Logo from '../images/logo.png'; // Pastikan path logo benar

function Navbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const location = useLocation(); // Mendapatkan lokasi path aktif saat ini
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('accessToken');
      const userDataStr = localStorage.getItem('userData');

      if (token && userDataStr) {
        const userData = JSON.parse(userDataStr);
        setIsAuthenticated(true);
        setUserRole(userData.role);
      } else {
        setIsAuthenticated(false);
        setUserRole(null);
      }
    };

    // Check saat komponen dimount
    checkAuth();

    // Listen untuk event storage
    const handleStorageChange = (e) => {
      if (e.key === 'accessToken') {
        checkAuth();
      }
    };

    // Listen untuk custom event auth
    const handleAuthChange = () => {
      checkAuth();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('authChange', handleAuthChange);

    // Cleanup
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('authChange', handleAuthChange);
    };
  }, []);

  const handleLogout = () => {
    Swal.fire({
      title: 'Apakah anda yakin?',
      text: 'Anda akan keluar dari akun ini',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, Keluar!',
      cancelButtonText: 'Batal',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userData');
        setIsAuthenticated(false);
        setUserRole(null);
        window.dispatchEvent(new Event('authChange'));

        Swal.fire(
          'Berhasil Keluar!',
          'Anda telah keluar dari akun.',
          'success'
        );
      }
    });
  };

  // Function to toggle navbar visibility
  const toggleNavbar = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleDiagnosaClick = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      Swal.fire({
        title: 'Akses Ditolak!',
        text: 'Silakan login terlebih dahulu untuk mengakses halaman Diagnosa',
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Login Sekarang',
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login');
        }
      });
    } else if (userRole !== 'clinic') {
      Swal.fire({
        title: 'Akses Terbatas!',
        text: 'Maaf, halaman Diagnosa hanya dapat diakses oleh Klinik',
        icon: 'error',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK',
      });
    } else {
      navigate('/diagnosa');
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-body-tertiary sticky-top">
      <div className="container">
        {/* Logo */}
        <a className="navbar-brand" href="#">
          <img src={Logo} alt="Logo" style={{ height: '40px' }} />
        </a>
        {/* Hamburger Menu */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleNavbar}
          aria-controls="navbarNav"
          aria-expanded={isNavOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`collapse navbar-collapse ${isNavOpen ? 'show' : ''}`}
          id="navbarNav"
        >
          <ul className={`navbar-nav ${isNavOpen ? '' : 'ms-auto'}`}>
            <li className="nav-item">
              <Link
                to="/"
                className={`nav-link ${
                  location.pathname === '/' ? 'active' : ''
                }`}
              >
                <i className="fas fa-home me-3"></i>Beranda
              </Link>
            </li>
            <li className="nav-item">
              <a
                href="#"
                onClick={handleDiagnosaClick}
                className={`nav-link ${
                  location.pathname === '/diagnosa' ? 'active' : ''
                }`}
              >
                <i className="fas fa-notes-medical me-3"></i>Diagnosa
              </a>
            </li>
            <li className="nav-item">
              <Link
                to="/artikel"
                className={`nav-link ${
                  location.pathname === '/artikel' ? 'active' : ''
                }`}
              >
                <i className="fas fa-newspaper me-3"></i>Artikel
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/rumah-sakit"
                className={`nav-link ${
                  location.pathname === '/rumah-sakit' ? 'active' : ''
                }`}
              >
                <i className="fas fa-hospital me-3"></i>Rumah Sakit
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/daftar-klinik"
                className={`nav-link ${
                  location.pathname === '/daftar-klinik' ? 'active' : ''
                }`}
              >
                <i className="fas fa-clipboard-list me-3"></i>Daftar Klinik
              </Link>
            </li>
          </ul>
          {/* Authentication button logic */}
          {isAuthenticated ? (
            userRole === 'clinic' ? (
              <Link to="/dashboard" className="btn btn-login text-light">
                <i className="fas fa-user"></i>
                {/* Dashboard */}
              </Link>
            ) : userRole === 'admin' ? (
              <Link to="/admin/dashboard" className="btn btn-login text-light">
                <i className="fas fa-user"></i>
              </Link>
            ) : (
              <button
                onClick={handleLogout}
                className="btn btn-login text-light"
              >
                {/* <i className="fas fa-sign-out-alt me-3"></i> */}
                Logout
              </button>
            )
          ) : (
            <Link to="/login" className="btn btn-login text-light">
              {/* <i className="fas fa-user me-3"></i> */}
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
