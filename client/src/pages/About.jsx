import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-16 px-6">
      <div className="max-w-3xl text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">About DevDiary</h1>
        <p className="text-lg text-gray-700 leading-relaxed mb-4">
          <strong>DevDiary</strong> is a blog platform created for developers to document their coding journey,
          share insights, and connect through experiences in software development.
          Whether you’re building your first app or debugging your hundredth,
          DevDiary gives you a voice to reflect, teach, and inspire.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed">
          Here, every post is a story of growth - your challenges, your breakthroughs,
          and your evolution as a developer. The goal is to foster a space where we
          celebrate progress, not perfection. 
        </p>
      </div>
    </div>
  );
};

export default About;
