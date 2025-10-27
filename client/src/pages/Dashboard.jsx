import React, { useEffect, useState } from "react";
import { postService, authService } from "../services/api.js";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/Loader.jsx";
import PostCard from "../components/PostCard.jsx";

const Dashboard = () => {
  const user = authService.getCurrentUser();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!user) return;
    const fetch = async () => {
      try {
        const res = await postService.getAllPosts();
        const postsArray = res.data || res.posts || [];
        const myPosts = postsArray.filter(
          (p) => p.author && p.author.email === user.email
        );
        setPosts(myPosts);
      } catch (err) {
        console.error("Error fetching posts:", err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [user]);

  async function handleDelete(id) {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await postService.deletePost(id);
        setPosts(posts.filter((p) => p._id !== id));
        setMessage("Post deleted successfully.");
        setTimeout(() => setMessage(""), 3000);
      } catch (err) {
        console.error("Failed to delete post:", err);
        alert(
          err.response?.data?.error ||
            "Error deleting post. Please try again later."
        );
      }
    }
  }

  if (!user) {
    return (
      <div className="text-center mt-20">
        <p className="text-gray-700 text-lg">
          Please{" "}
          <Link to="/login" className="text-indigo-600 underline">
            login
          </Link>{" "}
          to access your dashboard.
        </p>
      </div>
    );
  }

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50 pt-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <div className="flex items-center gap-4 mb-2">
                <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">
                    {user.name ? user.name.charAt(0).toUpperCase() : 'D'}
                  </span>
                </div>
                <div>
                  <h1 className="text-3xl font-bold gradient-text">
                    Welcome back, {user.name || "Developer"}
                  </h1>
                  <p className="text-slate-600">Manage your coding journey posts</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => navigate("/create-post")}
              className="bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create New Post
            </button>
          </div>
        </div>

        {/* Status Message */}
        {message && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-6 py-4 rounded-xl mb-8 flex items-center gap-3 shadow-lg">
            <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            {message}
          </div>
        )}

        {/* Posts Grid */}
        {posts.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <div
                key={post._id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200/50 overflow-hidden hover:-translate-y-1"
              >
                <PostCard post={post} />

                {/* Action Buttons */}
                <div className="p-6 pt-0">
                  <div className="flex gap-3">
                    <Link
                      to={`/posts/edit/${post._id}`}
                      className="flex-1 bg-linear-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105 text-center flex items-center justify-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(post._id)}
                      className="flex-1 bg-linear-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105 flex items-center justify-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-12 text-center">
            <div className="w-24 h-24 bg-linear-to-br from-slate-200 to-slate-300 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-4">No Posts Yet</h3>
            <p className="text-slate-600 mb-8 max-w-md mx-auto">
              You haven't created any posts yet. Start sharing your coding journey and insights with the developer community!
            </p>
            <button
              onClick={() => navigate("/create-post")}
              className="bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 inline-flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create Your First Post
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
