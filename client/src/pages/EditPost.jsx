// src/pages/EditPost.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    category: "",
    tags: "",
    featuredImage: null,
  });

  const [categories, setCategories] = useState([]);
  const [currentImage, setCurrentImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch post details and categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const [postRes, catRes] = await Promise.all([
          axios.get(`http://localhost:5000/api/posts/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:5000/api/categories"),
        ]);

        const post = postRes.data.post || postRes.data;
        setFormData({
          title: post.title,
          content: post.content,
          excerpt: post.excerpt || "",
          category: post.category?._id || "",
          tags: post.tags?.join(", ") || "",
          featuredImage: null,
        });
        setCurrentImage(post.featuredImage);
        setCategories(catRes.data.categories || catRes.data);
      } catch (err) {
        console.error("Failed to load post:", err);
        setError("Failed to load post data.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "featuredImage") {
      setFormData({ ...formData, featuredImage: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle post update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      // Prepare data as JSON object
      const postData = {
        title: formData.title,
        content: formData.content,
        excerpt: formData.excerpt,
        category: formData.category,
        tags: formData.tags.trim() ? formData.tags.split(",").map(tag => tag.trim()).filter(tag => tag) : [],
        featuredImage: formData.featuredImage ? formData.featuredImage.name : undefined, // Send filename if changed
      };

      const res = await axios.put(`http://localhost:5000/api/posts/${id}`, postData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      console.log("Post updated:", res.data);
      setSuccess("Post updated successfully!");
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (err) {
      console.error("Error updating post:", err);
      setError(err.response?.data?.message || "Failed to update post.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-center mt-20">Loading post...</p>;

  return (
    <div className="pt-20 min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 md:p-12">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 bg-linear-to-r from-amber-500 to-orange-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit Your Blog Post
            </div>
            <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
              Edit Post
            </h1>
            <p className="text-slate-600 text-lg">
              Update your coding insights and experiences
            </p>
          </div>

          {/* Status Messages */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl mb-6 flex items-center gap-3">
              <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-6 py-4 rounded-xl mb-6 flex items-center gap-3">
              <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Title */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700">
                Post Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="Enter an updated title for your post..."
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 bg-white/50 backdrop-blur-sm"
              />
            </div>

            {/* Excerpt */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700">
                Excerpt <span className="text-slate-500 text-sm">(optional)</span>
              </label>
              <input
                type="text"
                name="excerpt"
                value={formData.excerpt}
                onChange={handleChange}
                maxLength={200}
                placeholder="Updated summary of your post..."
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 bg-white/50 backdrop-blur-sm"
              />
              <p className="text-xs text-slate-500">{formData.excerpt.length}/200 characters</p>
            </div>

            {/* Content */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700">
                Content <span className="text-red-500">*</span>
              </label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                rows="8"
                required
                placeholder="Update your coding journey, insights, or experiences..."
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 bg-white/50 backdrop-blur-sm resize-vertical min-h-[200px]"
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 bg-white/50 backdrop-blur-sm"
              >
                <option value="">Choose a category...</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id} className="bg-white">
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Tags */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700">
                Tags <span className="text-slate-500 text-sm">(optional)</span>
              </label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="e.g. React, JavaScript, Node.js (comma-separated)"
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 bg-white/50 backdrop-blur-sm"
              />
              <p className="text-xs text-slate-500">Separate multiple tags with commas</p>
            </div>

            {/* Current Image */}
            {currentImage && (
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-slate-700">
                  Current Featured Image
                </label>
                <div className="relative bg-slate-50 rounded-xl p-4 border-2 border-dashed border-slate-300">
                  <img
                    src={`http://localhost:5000/${currentImage}`}
                    alt="Current Featured"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <div className="absolute top-2 right-2 bg-slate-800/80 text-white text-xs px-2 py-1 rounded">
                    Current Image
                  </div>
                </div>
              </div>
            )}

            {/* Replace Image */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700">
                Replace Featured Image <span className="text-slate-500 text-sm">(optional)</span>
              </label>
              <div className="relative">
                <input
                  type="file"
                  name="featuredImage"
                  accept="image/*"
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 bg-white/50 backdrop-blur-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100"
                />
              </div>
              <p className="text-xs text-slate-500">Supported formats: JPG, PNG, GIF, WebP (Max 5MB)</p>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={saving}
                className="w-full bg-linear-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 disabled:from-slate-400 disabled:to-slate-500 text-white py-4 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl disabled:cursor-not-allowed disabled:shadow-none hover:scale-[1.02] active:scale-[0.98]"
              >
                {saving ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Updating Your Blog...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    💾 Save Changes
                  </span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPost;
