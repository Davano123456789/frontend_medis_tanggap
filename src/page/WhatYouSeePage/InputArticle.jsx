import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "bootstrap/dist/css/bootstrap.min.css";
import SidebarKlinik from "../../components/sidebarKlinik";
import "./input.css";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // Import SweetAlert

const EditorComponent = () => {
  const [value, setValue] = useState("");
  const [author, setAuthor] = useState("");
  const [userId, setUserId] = useState(null); // Store userId

  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  useEffect(() => {
    const storedUser = localStorage.getItem("userData");
    const userData = storedUser ? JSON.parse(storedUser) : null;

    console.log("Stored user data:", userData);

    if (userData) {
      setUserId(userData.id); // Set the userId from localStorage
      setAuthor(userData.name); // Set nama pengguna sebagai nama penulis
      console.log("User ID set to:", userData.id); // Log for debugging
    } else {
      Swal.fire("Error", "Pengguna tidak ditemukan. Silakan login.", "error");
      navigate("/login");
    }

    if (isEditMode) {
      fetchArticle();
    }
  }, [id, navigate]);

  const fetchArticle = async () => {
    try {
      const response = await fetch(
        `https://medis-tanggap-be.vercel.app/api/articles/${id}`
      );
      const data = await response.json();
      if (response.ok) {
        setValue(data.content);
        setAuthor(data.author);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error("Error fetching article:", error);
      alert("Error loading article");
    }
  };

  const extractTitle = (content) => {
    console.log("Raw content:", content);
    const div = document.createElement("div");
    div.innerHTML = content;

    const headings = Array.from(
      div.querySelectorAll("h1, h2, h3, h4, h5, h6")
    ).filter((heading) => {
      const text = heading.textContent.trim();
      return text.length > 0;
    });

    if (!headings.length) {
      throw new Error(
        "Please add a heading (H1-H6) to your article to set the title"
      );
    }

    const title = headings[0].textContent.trim();
    console.log("Extracted title:", title);

    return title;
  };

  const handleSubmit = async () => {
    if (!value.trim() || !author.trim()) {
      Swal.fire("Error", "Harap lengkapi semua kolom", "error");
      return;
    }

    if (!userId) {
      Swal.fire("Error", "Pengguna tidak ditemukan. Silakan login.", "error");
      return;
    }

    try {
      const title = extractTitle(value);
      const url = `https://medis-tanggap-be.vercel.app/api/articles/${
        isEditMode ? id : ""
      }`;
      const method = isEditMode ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content: value,
          author: author.trim(),
          userId, // Include the userId in the request body
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage;
        try {
          const errorJson = JSON.parse(errorText);
          errorMessage = errorJson.message || "Gagal menyimpan artikel";
        } catch (e) {
          errorMessage = "Terjadi kesalahan pada server";
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();

      await Swal.fire({
        title: isEditMode ? "Artikel Diperbarui" : "Artikel Diterbitkan",
        text: isEditMode
          ? "Artikel Anda berhasil diperbarui."
          : "Artikel Anda berhasil diterbitkan.",
        icon: "success",
        confirmButtonText: "Oke",
      });

      navigate("/dashboard/artikel");
    } catch (error) {
      console.error("Submission error:", error);
      Swal.fire("Error", error.message, "error");
    }
  };

  const toolbarOptions = [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline"],
    ["link", "image"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
  ];

  const module = {
    toolbar: toolbarOptions,
  };

  return (
    <div className="d-flex wrap-all">
      <SidebarKlinik />
      <div className="container-fluid mt-4 flex-grow-1 right-input">
        <h2 className="mb-4">
          {isEditMode ? "Edit Artikel" : "Buat Artikel Baru"}
        </h2>
        <label htmlFor="" className="mb-2">
          Nama Author
        </label>
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Nama Penulis"
          disabled
          value={author} // Akan terisi dengan nama pengguna dari localStorage
          onChange={(e) => setAuthor(e.target.value)} // Jika pengguna ingin mengubahnya
        />

        <div className="mb-2 text-muted">
          Gunakan format judul (H1-H6) untuk judul artikel Anda
        </div>

        <ReactQuill
          modules={module}
          theme="snow"
          value={value}
          onChange={setValue}
          style={{ minHeight: "100px" }}
        />
        <button
          className="btn btn-primary mt-3"
          onClick={handleSubmit}
          disabled={!value.trim() || !author.trim()}
        >
          {isEditMode ? "Memperbarui" : "Kirim"}
        </button>
      </div>
      <style>
        {`
          .bg-light {
            display: none !important;
          }
        `}
      </style>
    </div>
  );
};

export default EditorComponent;
