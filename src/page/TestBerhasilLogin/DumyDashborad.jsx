import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Correct the import of jwtDecode
import { useNavigate } from "react-router-dom";

const DumyDashboard = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [token, setToken] = useState("");
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [header, setHeader] = useState(""); // Tambahkan header
  const [content, setContent] = useState("");
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    refreshToken();
    fetchArticles();
  }, []);

  const refreshToken = async () => {
    try {
      const response = await axios.get(
        "https://medis-tanggap-be.vercel.app/token"
      );
      setToken(response.data.accessToken);
      const decoded = jwtDecode(response.data.accessToken);

      setName(decoded.name);
      setEmail(decoded.email);
      setTelephone(decoded.phone);
    } catch (error) {
      if (error.response) {
        navigate("/login");
      }
    }
  };

  const fetchArticles = async () => {
    try {
      const response = await axios.get(
        "https://medis-tanggap-be.vercel.app/api/articles"
      );
      setArticles(response.data);
    } catch (error) {
      console.error("There was an error fetching the articles!", error);
    }
  };

  const deleteArticle = async (id) => {
    try {
      await axios.delete(
        `https://medis-tanggap-be.vercel.app/api/articles/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setArticles(articles.filter((article) => article.id !== id));
    } catch (error) {
      console.error("There was an error deleting the article!", error);
    }
  };

  const updateArticle = (id) => {
    navigate(`/update-article/${id}`);
  };

  const Logout = async () => {
    try {
      await axios.delete("https://medis-tanggap-be.vercel.app/logout");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const articleData = {
      author,
      title,
      header,
      date: new Date().toLocaleString(),
      description: content,
    };

    console.log("Article Data:", articleData); // Tambahkan log untuk memeriksa data yang dikirim

    try {
      await axios.post(
        "https://medis-tanggap-be.vercel.app/api/articles",
        articleData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Article created successfully");
      navigate("/artikel"); // Redirect to the articles page
    } catch (error) {
      console.error("There was an error creating the article!", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header bg-primary text-white d-flex justify-content-between">
          <h1 className="h3">Dashboard</h1>
          <div className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              id="profileMenu"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Profile
            </button>
            <ul className="dropdown-menu" aria-labelledby="profileMenu">
              <li>
                <a className="dropdown-item" href="#">
                  Current Page: Dashboard
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Settings
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <button className="dropdown-item" onClick={Logout}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="card-body">
          <div className="user-info mb-4">
            <p className="mb-2">
              <strong>Name:</strong> {name}
            </p>
            <p className="mb-2">
              <strong>Email:</strong> {email}
            </p>
            <p className="mb-2">
              <strong>Phone:</strong> {telephone}
            </p>
          </div>
          <button className="btn btn-danger mb-4" onClick={Logout}>
            Logout
          </button>
          <div className="upload-article">
            <h2 className="h4 mb-3">Upload Article</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="author" className="form-label">
                  Author
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="author"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="header" className="form-label">
                  Header
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="header"
                  value={header}
                  onChange={(e) => setHeader(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="time" className="form-label">
                  Time
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="time"
                  value={new Date().toLocaleString()}
                  readOnly
                />
              </div>
              <div className="mb-3">
                <label htmlFor="content" className="form-label">
                  Content
                </label>
                <textarea
                  className="form-control"
                  id="content"
                  rows="5"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
          <div className="articles-list">
            <h2 className="h4 mb-3">Articles</h2>
            <ul className="list-group">
              {articles.map((article, index) => (
                <li
                  key={article.id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <div>
                    <h5>
                      {index + 1}. {article.title}
                    </h5>
                  </div>
                  <div>
                    <button
                      className="btn btn-warning me-2"
                      onClick={() => updateArticle(article.id)}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteArticle(article.id)}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DumyDashboard;
