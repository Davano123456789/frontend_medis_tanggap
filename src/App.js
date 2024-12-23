import Home from './page/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css';
import Diagnosa from './page/DiagnosaPage/Diagnosa';
import Artikel from './page/artikel';
import Detail from './page/artikel-detail';
import RumahSakit from './page/RumahSakitPage/rumahSakit';
import LoginForm from './page/LoginPage/Login';
import Register from './page/RegisterPage/Register';
import ResultDiagnosa from './page/DiagnosaPage/ResultDiagnosa';
import Provinsi from './page/RumahSakitPage/provinsi';
import Rs from './page/RumahSakitPage/rs';
import Kamar from './page/RumahSakitPage/kamar';
import Clinic from './page/ClinicPage/Clinic';
import KlinikDashboard from './klinikPage/klinikDashboard';
import Rujukan from './klinikPage/rujukan';
import Profil from './klinikPage/profil';
import Pengajuan from './page/DaftarKlinikPage/DaftarKlinik';
import KlinikArtikel from './klinikPage/artikelKlinik';
import SelectProvince from './page/hospital/SelectProvince';
import SelectCity from './page/hospital/SelectCity';
import SelectHospital from './page/hospital/SelectHospital';
import SelectBed from './page/hospital/SelectBed';
import AdminDashboard from './adminPage/adminDashboard';
import PengajuanKlinik from './adminPage/pengajuan-klinik';
import DaftarKlinik from './adminPage/daftar-klinik';
import InputArticle from './page/WhatYouSeePage/InputArticle';
import UpdateArtikel from './klinikPage/UpdateArtikel';
import DetailArtikel from './klinikPage/DetailArtikel';
import BuatRujukan from './klinikPage/BuatRujukan';
import DetailKlinik from './adminPage/detail-klinik';
import DetailPengajuan from './adminPage/detail-pengajuan';
import MyDocument from './page/MyDocument/MyDocument';
import EditRujukan from './klinikPage/EditRujukan';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Hospital selection flow */}
        <Route path="/rumah-sakit" element={<SelectProvince />} />
        <Route path="/select-city/:provinceId" element={<SelectCity />} />
        <Route
          path="/select-hospital/:provinceId/:cityId"
          element={<SelectHospital />}
        />
        <Route path="/select-bed/:hospitalId" element={<SelectBed />} />
        <Route path="/" element={<Home />} />
        <Route path="/diagnosa" element={<Diagnosa />} />
        <Route path="/result-diagnosa" element={<ResultDiagnosa />} />

        {/* <Route path="/clinic" element={<Clinic />} /> */}
        <Route path="/artikel" element={<Artikel />} />
        <Route path="/artikel-detail/:id" element={<Detail />} />

        <Route path="/rumah-sakit" element={<RumahSakit />} />
        <Route path="/provinsi" element={<Provinsi />} />
        <Route path="/rs" element={<Rs />} />
        <Route path="/kamar" element={<Kamar />} />
        <Route path="/daftar-klinik" element={<Clinic />} />
        <Route path="/login" element={<LoginForm />} />

        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<KlinikDashboard />} />
        <Route path="/dashboard/rujukan" element={<Rujukan />} />
        <Route path="/dashboard/rujukan/edit/:id" element={<EditRujukan />} />
        <Route
          path="/dashboard/rujukan/tambah-rujukan"
          element={<BuatRujukan />}
        />
        <Route path="/dashboard/profile" element={<Profil />} />
        <Route path="/dashboard/artikel" element={<KlinikArtikel />} />
        <Route
          path="/dashboard/artikel/tambah-artikel"
          element={<InputArticle />}
        />
        <Route
          path="/dashboard/artikel/edit-artikel/:id"
          element={<InputArticle />}
        />
        <Route
          path="/dashboard/artikel/detail/:id"
          element={<DetailArtikel />}
        />
        <Route
          path="/dashboard/rujukan/tambah-rujukan"
          element={<BuatRujukan />}
        />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/pengajuan" element={<PengajuanKlinik />} />
        <Route path="/admin/daftar-klinik" element={<DaftarKlinik />} />
        <Route
          path="/admin/daftar-klinik/detail-klinik/:id"
          element={<DetailKlinik />}
        />
        <Route
          path="/admin/pengajuan/detail-pengajuan/:id"
          element={<DetailPengajuan />}
        />

        <Route path="create-pdf" element={<MyDocument />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
