import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const UpdateArticle = () => {
  const { id } = useParams();
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [header, setHeader] = useState("");
  const [content, setContent] = useState("");
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchArticle();
    refreshToken();
  }, []);

  const refreshToken = async () => {
    try {
      const response = await axios.get(
        "https://medis-tanggap-be.vercel.app/token"
      );
      setToken(response.data.accessToken);
    } catch (error) {
      if (error.response) {
        navigate("/login");
      }
    }
  };

  const fetchArticle = async () => {
    try {
      const response = await axios.get(
        `https://medis-tanggap-be.vercel.app/api/articles/${id}`
      );
      const article = response.data;
      setAuthor(article.author);
      setTitle(article.title);
      setHeader(article.header);
      setContent(article.description);
    } catch (error) {
      console.error("There was an error fetching the article!", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const articleData = {
      author,
      title,
      header,
      description: content,
    };

    try {
      await axios.put(
        `https://medis-tanggap-be.vercel.app/api/articles/${id}`,
        articleData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Article updated successfully");
      navigate("/artikel"); // Redirect to the articles page
    } catch (error) {
      console.error("There was an error updating the article!", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header bg-primary text-white">
          <h1 className="h3">Update Article</h1>
        </div>
        <div className="card-body">
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
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateArticle;
