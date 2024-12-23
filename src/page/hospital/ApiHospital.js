import axios from 'axios';

const API_BASE_URL = 'https://rs-bed-covid-api.vercel.app/api';

// Create axios instance with custom config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // Remove credentials mode
  withCredentials: false,
});

// Mendapatkan semua provinsi
export const getProvinces = async () => {
  try {
    const response = await apiClient.get('/get-provinces');
    return response.data.provinces;
  } catch (error) {
    console.error('API Error:', error);
    throw new Error('Gagal mengambil data provinsi');
  }
};



// Mendapatkan kota berdasarkan provinsi
// export const getCities = async (provinceId) => {
//   try {
//     if (!provinceId) {
//       throw new Error('Province ID is required');
//     }

//     // Clean the provinceId to ensure it's just numbers
//     const cleanId = provinceId.toString().replace(/[^0-9]/g, '');
//     console.log('Cleaned province ID:', cleanId); // Debug log

//     const response = await apiClient.get(`/get-cities?provinceid=${cleanId}`);
//     console.log('API Response:', response.data); // Debug log

//     if (!response.data || !response.data.cities) {
//       throw new Error('Invalid response format from API');
//     }

//     return response.data.cities;
//   } catch (error) {
//     console.error('API Error:', error);
//     throw new Error(error.message || 'Failed to fetch cities');
//   }
// };



export const getCities = async (provinceId) => {
  try {
    const response = await apiClient.get('/get-cities', {
      params: { provinceid: provinceId }, // Menggunakan params untuk query string
    });
    return response.data.cities;
  } catch (error) {
    console.error("Error fetching cities:", error.message);
    throw new Error("Gagal mengambil data kota");
  }
};
// // Mendapatkan rumah sakit berdasarkan provinsi dan kota
// export const getHospitals = async (provinceId, cityId, type) => {
//   try {
//     const response = await apiClient.get(
//       `/get-hospitals?provinceid=${provinceId}&cityid=${cityId}&type=${type}`
//     );
//     return response.data.hospitals;
//   } catch (error) {
//     throw new Error('Gagal mengambil data rumah sakit');
//   }
// };

export const getHospitals = async (provinceId, cityId, type) => {
  try {
    const response = await apiClient.get("/get-hospitals", {
      params: {
        provinceid: provinceId,
        cityid: cityId,
        type: type,
      },
    });
    return response.data.hospitals;
  } catch (error) {
    console.error("Error fetching hospitals:", error);
    throw new Error("Gagal mengambil data rumah sakit");
  }
};



// Mendapatkan detail kapasitas rumah sakit
export const getBedDetail = async (hospitalId, type) => {
  try {
    const response = await apiClient.get(
      `/get-bed-detail?hospitalid=${hospitalId}&type=${type}`
    );
    return response.data.data;
  } catch (error) {
    throw new Error('Gagal mengambil detail kapasitas rumah sakit');
  }
};
