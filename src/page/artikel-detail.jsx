import React, { useEffect, useState } from "react";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./Detail-artikel.css";
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import profile from "../images/laki.jpg"; // Path relatif ke gambar

const DEFAULT_ARTICLE_IMAGE =
  "https://via.placeholder.com/800x400?text=No+Image+Available";

// Frontend (React)
const Detail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchArticle();
    fetchRelatedArticles();
  }, [id]);

  const extractFirstImage = (content) => {
    if (!content) return null;
    const div = document.createElement("div");
    div.innerHTML = content;
    const img = div.querySelector("img");
    return img ? img.src : null;
  };

  const fetchArticle = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://medis-tanggap-be.vercel.app/api/articles/${id}`
      );
      setArticle(response.data);
    } catch (error) {
      console.error("Error fetching article!", error);
      setError("Failed to fetch article");
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedArticles = async () => {
    try {
      const response = await axios.get(
        "https://medis-tanggap-be.vercel.app/api/articles"
      );
      const related = response.data
        .filter((item) => item.id !== id)
        .map((article) => ({
          ...article,
          previewImage:
            extractFirstImage(article.content) || DEFAULT_ARTICLE_IMAGE,
        }));
      setRelatedArticles(related);
    } catch (error) {
      console.error("Error fetching related articles!", error);
    }
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

  if (loading) {
    return (
      <>
        <Navbar />
        <div
          className="container d-flex justify-content-center align-items-center"
          style={{ minHeight: "50vh" }}
        >
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="container text-center mt-5">
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!article) {
    return (
      <>
        <Navbar />
        <div className="container text-center mt-5">
          <h2>Article not found</h2>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container py-5">
        <div className="row">
          {/* Left column for article details */}
          <div className="col-lg-9 mb-4 wrap-right">
            <article>
              <header className="mb-4">
                <div className="d-flex align-items-center mb-3">
                  <div>
                    {/* Gambar profil sesuai dengan data yang diterima dari API */}
                    <span className="img-profile">
                      {renderAuthorImage(article)} {/* Gambar penulis */}
                    </span>
                    <span className="text-muted nama">{article.author}</span>
                    <p className="text-muted hari">
                      {new Date(article.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </header>
              <div
                className="ql-editor article-content"
                style={{
                  padding: "0 20px 0 0",
                  fontSize: "1.1rem",
                  lineHeight: "1.8",
                }}
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            </article>
          </div>

          {/* Right column for related articles */}
          <div className="col-lg-3">
            <Link to="/artikel" className="article-all">
              <h5 className="side-artikel">Artikel Lainnya..</h5>
            </Link>

            {relatedArticles.slice(0, 3).map((related) => (
              <div className="wrap-card mb-4" key={related.id}>
                <Link
                  to={`/artikel-detail/${related.id}`}
                  className="text-decoration-none text-dark"
                >
                  <div className="row g-0">
                    <div className="col-md-12 img-list">
                      <img
                        src={related.previewImage}
                        className="img-fluid"
                        alt={related.title}
                        style={{ objectFit: "cover", height: "100%" }}
                      />
                    </div>
                    <div className="col-md-12">
                      <div className="card-body">
                        <p className="card-text mt-1">
                          {/* Render the author's profile image */}
                          {renderAuthorImage(related)}
                        </p>
                        <p className="text-muted1">{related.author}</p>
                        <span className="text-muted">
                          {new Date(related.date).toLocaleDateString()}
                        </span>
                        <p className="card-text title">{related.title}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Detail;
