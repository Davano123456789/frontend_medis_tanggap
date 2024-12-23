import { useState, useEffect, useRef } from "react";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import { useNavigate } from "react-router-dom";
import Section1 from "../images/dashboard.png";
import Section2 from "../images/section2.png";
import Section3 from "../images/section3.png";
import Map from "../images/map.png";
import Arrow from "../images/arrow.png";
import axios from "axios";

function Home() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const cardsContainerRef = useRef(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observerTarget = useRef(null);
  const [currentMobileIndex, setCurrentMobileIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const extractFirstImage = (content) => {
    if (!content) return null;
    const div = document.createElement("div");
    div.innerHTML = content;
    const img = div.querySelector("img");
    return img ? img.src : null;
  };

  const fetchArticles = async (pageNum) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://medis-tanggap-be.vercel.app/api/articles?page=${pageNum}`
      );
      if (response.data) {
        const processedArticles = response.data.map((article) => ({
          ...article,
          previewImage: extractFirstImage(article.content),
        }));

        if (pageNum === 1) {
          setArticles(processedArticles);
        } else {
          setArticles((prev) => [...prev, ...processedArticles]);
        }

        setHasMore(processedArticles.length > 0);
      }
    } catch (error) {
      console.error("Error fetching articles:", error);
      setError("Failed to fetch articles");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles(page);
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 1.0 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [hasMore, loading]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isMobile && articles.length > 0) {
      const timer = setInterval(() => {
        setCurrentMobileIndex((prev) => (prev + 1) % articles.length);
      }, 3000);
      return () => clearInterval(timer);
    }
  }, [isMobile, articles.length]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - cardsContainerRef.current.offsetLeft);
    setScrollLeft(cardsContainerRef.current.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - cardsContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    cardsContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <>
      <Navbar />
      <div className="w-100">
        <section
          id="sec1"
          className="h-100 section-1"
          style={{ backgroundColor: "#EDF2F6" }}
        >
          <div className="container d-flex align-items-center flex-column flex-md-row">
            <div className="col-md-6 col-12 text-center text-md-start">
              <h1 className="fw-bold">
                Selamat Datang <br /> Di{" "}
                <span style={{ color: "#174AB5" }}>Medis Tanggap</span>
              </h1>
              <p style={{ textAlign: "justify" }}>
                Medis Tanggap memberikan solusi inovatif untuk meningkatkan
                akses layanan kesehatan bagi ibu hamil. Dengan teknologi modern,
                kami menyediakan diagnosis, informasi kesehatan, dan fitur
                rujukan rumah sakit secara cepat dan akurat. Kami hadir untuk
                memastikan Anda mendapatkan layanan medis yang tepat, kapan saja
                dan di mana saja.
              </p>
              <div>
                <h5 className="mb-3 fw-bold" style={{ color: "#0a192f" }}>
                  Mengapa Memilih Kami?
                </h5>
                <ul className="list-unstyled">
                  <li className="mb-2 d-flex align-items-center">
                    <span style={{ color: "#0a192f" }} className="me-2 fs-4">
                      ✓
                    </span>
                    Akses Mudah dan Fleksibel
                  </li>
                  <li className="mb-2 d-flex align-items-center">
                    <span style={{ color: "#0a192f" }} className="me-2 fs-4">
                      ✓
                    </span>
                    Sistem Rujukan Terintegrasi Real-time
                  </li>
                  <li className="d-flex align-items-center">
                    <span style={{ color: "#0a192f" }} className="me-2 fs-4">
                      ✓
                    </span>
                    Informasi Kesehatan yang Komprehensif
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-6 col-12 image-home">
              <img src={Section1} alt="" className="img-fluid" />
            </div>
          </div>
        </section>

        <section
          id="sec2"
          className="h-100 section-2 text-light"
          style={{ backgroundColor: "#0a192f" }}
        >
          <div className="container d-flex align-items-center flex-column flex-md-row">
            <div className="col-md-6 col-12 mb-4 mb-md-0 section-image-1">
              <img src={Section2} alt="" className="img-fluid" />
            </div>
            <div className="col-md-6 col-12">
              <h2 className="fw-bold mb-4">APA ITU MEDIS TANGGAP ?</h2>
              <p className="mb-4">
                Medis Tanggap adalah aplikasi yang memberikan solusi kesehatan
                dengan menyediakan fitur diagnosa penyakit, pencarian rumah
                sakit, serta akses artikel kesehatan untuk mendukung ibu hamil
                menjalani kehamilan dengan sehat dan aman.
              </p>
              <ul className="navbar-nav-fitur">
                <li>
                  <img id="li" src={Arrow} className="img-arrow1" alt="" />{" "}
                  Fitur Diagnosa Penyakit Selama Kehamilan
                </li>
                <li>
                  <img id="li" src={Arrow} className="img-arrow1" alt="" />{" "}
                  Fitur Cari Rumah Sakit
                </li>
                <li>
                  <img id="li" src={Arrow} className="img-arrow1" alt="" />{" "}
                  Artikel Kesehatan
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section id="sec3" className="section-3">
          <div className="container d-flex align-items-center flex-column flex-md-row">
            <div className="col-md-5 col-12 mb-4 mb-md-0">
              <img src={Section3} alt="" className="img-fluid" />
            </div>
            <div className="col-md-7 col-12">
              <h1 className="fw-bold">
                Fitur <span>Diagnosa Penyakit</span>
                <br /> Selama Kehamilan
              </h1>
              <p>
                Membantu ibu hamil untuk mengenali gejala penyakit secara dini
                dan memberikan panduan langkah selanjutnya untuk menjaga
                kesehatan selama kehamilan.
              </p>
              <button
                className="btn btn-sec3 text-light"
                style={{ background: "#0a192f" }}
                onClick={() => {
                  navigate("/diagnosa");
                }}
              >
                Diagnosa
              </button>
            </div>
          </div>
        </section>

        <section id="sec4" className="section-4">
          <div className="container d-flex align-items-center flex-column flex-md-row">
            <div className="col-md-7 col-12 mb-4 mb-md-0">
              <h1 className="fw-bold">
                Fitur <span>Cari Rumah Sakit</span>
                <br /> Medis Tanggap
              </h1>
              <p>
                Memberikan informasi real-time tentang ketersediaan kamar rumah
                sakit terdekat, sehingga mempermudah proses rujukan bagi pasien
                dalam kondisi darurat.
              </p>
              <button
                onClick={() => {
                  navigate("/rumah-sakit");
                }}
                className="btn btn-sec3 text-light"
                style={{ background: "#0a192f" }}
              >
                Cari Sekarang
              </button>
            </div>
            <div className="col-md-5 col-12">
              <img src={Map} alt="" className="img-fluid" />
            </div>
          </div>
        </section>

        <section id="sec5" className="section-5">
          <h2 className="text-center mb-5 fw-bold">
            Artikel <span style={{ color: "#174AB5" }}>Medis Tanggap</span>
          </h2>
          <div className="container px-0">
            {isMobile ? (
              <div className="d-flex justify-content-center">
                {articles.length > 0 && (
                  <div
                    className="card mx-auto"
                    style={{
                      width: "90%",
                      maxWidth: "400px",
                      borderRadius: "8px",
                      backgroundColor: "#fff",
                      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                      marginBottom: "1rem",
                    }}
                  >
                    <div
                      className="image-container"
                      style={{
                        height: "200px",
                        width: "100%",
                        position: "relative",
                        overflow: "hidden",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#f8f9fa",
                      }}
                    >
                      {articles[currentMobileIndex].previewImage ? (
                        <img
                          src={articles[currentMobileIndex].previewImage}
                          className="card-img-top"
                          alt={articles[currentMobileIndex].title}
                          style={{
                            minWidth: "100%",
                            minHeight: "100%",
                            objectFit: "contain",
                            borderTopLeftRadius: "8px",
                            borderTopRightRadius: "8px",
                          }}
                        />
                      ) : (
                        <div
                          className="card-img-top d-flex align-items-center justify-content-center bg-light"
                          style={{
                            width: "100%",
                            height: "100%",
                            borderTopLeftRadius: "8px",
                            borderTopRightRadius: "8px",
                          }}
                        >
                          <span className="text-muted">No image available</span>
                        </div>
                      )}
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">
                        {articles[currentMobileIndex].title}
                      </h5>
                      <p className="card-text">
                        {articles[currentMobileIndex].description
                          ? articles[currentMobileIndex].description.substring(
                              0,
                              100
                            ) + "..."
                          : "No description available"}
                      </p>
                      <button
                        onClick={() =>
                          navigate(
                            `/artikel-detail/${articles[currentMobileIndex].id}`
                          )
                        }
                        className="btn"
                        style={{ background: "#0a192f", color: "white" }}
                      >
                        Baca Selengkapnya
                      </button>
                    </div>
                  </div>
                )}
                {/* Dots indicator */}
                <div
                  className="d-flex justify-content-center mt-3 w-100 position-absolute"
                  style={{ bottom: "1rem" }}
                >
                  {articles.map((_, index) => (
                    <div
                      key={index}
                      style={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        backgroundColor:
                          index === currentMobileIndex ? "#174AB5" : "#ccc",
                        margin: "0 4px",
                      }}
                    />
                  ))}
                </div>
              </div>
            ) : (
              // Desktop view with horizontal scroll
              <div
                className="d-flex mb-4 article-container"
                ref={cardsContainerRef}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                style={{
                  overflowX: "auto",
                  cursor: "grab",
                  whiteSpace: "nowrap",
                  scrollBehavior: "smooth",
                  msOverflowStyle: "none",
                  scrollbarWidth: "none",
                  padding: "1rem",
                }}
              >
                {articles.map((article) => (
                  <div
                    key={article.id}
                    className="card mx-2"
                    style={{
                      width: "300px",
                      minWidth: "300px",
                      height: "100%", // Add fixed height
                      borderRadius: "8px",
                      backgroundColor: "#fff",
                      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                      marginBottom: "1rem",
                      flex: "0 0 auto",
                    }}
                  >
                    <div
                      style={{
                        height: "200px",
                        width: "100%",
                        position: "relative",
                        overflow: "hidden",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#f8f9fa",
                      }}
                    >
                      {article.previewImage ? (
                        <img
                          src={article.previewImage}
                          className="card-img-top"
                          alt={article.title}
                          style={{
                            minWidth: "100%",
                            minHeight: "100%",
                            objectFit: "contain",
                            borderTopLeftRadius: "8px",
                            borderTopRightRadius: "8px",
                          }}
                        />
                      ) : (
                        <div
                          className="card-img-top d-flex align-items-center justify-content-center bg-light"
                          style={{
                            height: "200px",
                            borderTopLeftRadius: "8px",
                            borderTopRightRadius: "8px",
                          }}
                        >
                          <span className="text-muted">No image available</span>
                        </div>
                      )}
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">{article.title}</h5>
                      <p className="card-text">
                        {article.description
                          ? article.description.substring(0, 100) + "..."
                          : "No description available"}
                      </p>
                      <button
                        onClick={() =>
                          navigate(`/artikel-detail/${article.id}`)
                        }
                        className="btn "
                        style={{ background: "#0a192f", color: "white" }}
                      >
                        Baca Selengkapnya
                      </button>
                    </div>
                  </div>
                ))}
                {hasMore && (
                  <div
                    ref={observerTarget}
                    style={{ minWidth: "50px", height: "1px" }}
                  />
                )}
              </div>
            )}
            {loading && (
              <div className="text-center py-3">Loading more articles...</div>
            )}
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

export default Home;
