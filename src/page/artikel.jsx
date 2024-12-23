import React, { useEffect, useState } from "react";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./artikel.css";

// Add custom styles at the top of the file
const imgStyles = {
  articleImg: {
    width: "550px",
    height: "400px",
    objectFit: "cover",
    borderRadius: "8px",
  },
  miniImg: {
    width: "300px",
    height: "200px",
    objectFit: "cover",
    borderRadius: "8px",
  },
};

function Artikel() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchArticles();
  }, []);

  const extractFirstImage = (content) => {
    if (!content) return null;
    const div = document.createElement("div");
    div.innerHTML = content;
    const img = div.querySelector("img");
    return img ? img.src : null;
  };

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://medis-tanggap-be.vercel.app/api/articles"
      );
      console.log("API Response:", response.data);

      if (response.data) {
        const processedArticles = response.data.map((article) => ({
          ...article,
          previewImage: extractFirstImage(article.content),
        }));

        const sortedArticles = processedArticles.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setArticles(sortedArticles);
      }
    } catch (error) {
      console.error("Error message:", error.message || error);
      console.error("Error response:", error.response || error);
      setError("Failed to fetch articles: " + error.message || error);
    } finally {
      setLoading(false);
    }
  };

  const truncateText = (text, maxLength) => {
    if (!text) return "";
    return text.length <= maxLength ? text : text.substr(0, maxLength) + "...";
  };

  const renderAuthorImage = (article) => {
    const fallbackImage = `https://ui-avatars.com/api/?name=${encodeURIComponent(
      article.author
    )}`;

    if (article.authorImage) {
      return (
        <img
          className="artikel-profil"
          src={`https://medis-tanggap-be.vercel.app/uploads/${article.authorImage}`}
          alt={article.author}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = fallbackImage;
          }}
        />
      );
    }

    return (
      <img
        className="artikel-profil"
        src={fallbackImage}
        alt={article.author}
      />
    );
  };

  const latestArticle = articles.length > 0 ? articles[0] : null;
  const otherArticles = articles.slice(1);

  return (
    <>
      <Navbar />
      <div className="container align-items-center">
        <section className="h-100 p-2 text-white">
          <div className="artikel-tagline">
            <h3 className="fw-bolder fst-italic fs-4 m-4 costum-font-size2">
              Kesehatan adalah aset berharga, jaga hari ini untuk hidup yang
              lebih baik esok.
            </h3>
          </div>
        </section>

        {loading ? (
          <div className="d-flex justify-content-center py-5">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : error ? (
          <div className="alert alert-danger m-4" role="alert">
            {error}
          </div>
        ) : articles.length === 0 ? (
          <div className="text-center m-4">Tidak ada artikel tersedia</div>
        ) : (
          <>
            <section>
              {latestArticle && (
                <div className="row m-2" key={latestArticle.id}>
                  <div className="col">
                    <Link
                      to={`/artikel-detail/${latestArticle.id}`}
                      className="text-decoration-none text-dark"
                    >
                      {latestArticle.previewImage ? (
                        <img
                          style={imgStyles.articleImg}
                          src={latestArticle.previewImage}
                          alt={latestArticle.title}
                          className="artikel-terbaru"
                        />
                      ) : (
                        <div
                          style={imgStyles.articleImg}
                          className="bg-light d-flex align-items-center justify-content-center"
                        >
                          <span className="text-muted">No image available</span>
                        </div>
                      )}
                    </Link>
                  </div>
                  <div className="col">
                    <div className="row align-items-center">
                      <div className="col-1">
                        {renderAuthorImage(latestArticle)}
                      </div>
                      <div className="col">
                        <h3 className="fw-costum artikel-username mb-0">
                          {latestArticle.author}
                        </h3>
                        <span className="text-muted">
                          {new Date(latestArticle.date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="mt-3">
                      <h2 className="fs-4 costum-font-size">
                        <Link
                          to={`/artikel-detail/${latestArticle.id}`}
                          className="text-decoration-none fw-costum"
                        >
                          {latestArticle.title}
                        </Link>
                      </h2>
                      <h2 className="fs-6 costum-font-size1">
                        {truncateText(latestArticle.description || "", 200)}
                      </h2>
                      <button
                        className="btn btn-brand1 text-light mt-3 fw-semibold ms-0"
                        onClick={() => {
                          navigate(`/artikel-detail/${latestArticle.id}`);
                        }}
                      >
                        Baca Sekarang
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </section>

            <section style={{ margin: "18px" }}>
              <h2 className="fw-bolder fs-4 mb-3 mt-5">Artikel Lainnya</h2>
              <div className="row">
                {otherArticles.map((article) => (
                  <div className="col-md-4 mb-4" key={article.id}>
                    <div className="card-artikel">
                      <Link
                        to={`/artikel-detail/${article.id}`}
                        className="text-decoration-none text-dark"
                      >
                        {article.previewImage ? (
                          <img
                            style={imgStyles.miniImg}
                            src={article.previewImage}
                            alt={article.title}
                            className="mini-img-artikel"
                          />
                        ) : (
                          <div
                            style={imgStyles.miniImg}
                            className="bg-light d-flex align-items-center justify-content-center"
                          >
                            <span className="text-muted">
                              No image available
                            </span>
                          </div>
                        )}
                        <div className="row align-items-center">
                          <div className="col-1">
                            {renderAuthorImage(article)}
                          </div>
                          <div className="col">
                            <h3 className="fw-bold artikel-mini-username mb-0">
                              {article.author}
                            </h3>
                            <span className="artikel-mini-hari">
                              {new Date(article.date).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <h2 className="fw-costum fs-6 mb-3 mt-2">
                          {article.title}
                        </h2>
                        <h2 className="fw-costum1 fs-6 mb-3">
                          {truncateText(article.description, 100)}
                        </h2>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Artikel;
