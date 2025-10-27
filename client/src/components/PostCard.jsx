import React from "react";
import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
  const hasImage = post?.featuredImage && post.featuredImage.trim() !== "";

  return (
    <article className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200/50 overflow-hidden hover:-translate-y-1">
      {/* Featured Image */}
      {hasImage && (
        <div className="relative overflow-hidden">
          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        {/* Category Badge */}
        {post.category?.name && (
          <span className="inline-block bg-linear-to-r from-blue-500 to-purple-600 text-white text-xs font-semibold px-3 py-1 rounded-full mb-3">
            {post.category.name}
          </span>
        )}

        {/* Title */}
        <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-slate-600 mb-4 text-sm leading-relaxed line-clamp-3">
          {post.excerpt || post.content?.slice(0, 120) + "..."}
        </p>

        {/* Meta Information */}
        <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              {post.viewCount || 0}
            </span>
            {post.author?.name && (
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                {post.author.name}
              </span>
            )}
          </div>
          <time className="text-xs">
            {new Date(post.createdAt).toLocaleDateString()}
          </time>
        </div>

        {/* Read More Link */}
        <Link
          to={`/posts/${post.slug}`}
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200 group-hover:gap-3"
        >
          Read More
          <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </article>
  );
};

export default PostCard;
