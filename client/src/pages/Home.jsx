import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="pt-20 min-h-screen">
      {/* HERO SECTION */}
      <section className="relative bg-linear-to-br from-slate-900 via-blue-900 to-indigo-900 text-white py-32 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-purple-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <span className="text-sm font-medium">Welcome to the Developer Community</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
            Your <span className="gradient-text">DevJourney</span> Starts Here
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed">
            Transform your coding experiences into compelling stories. Share your breakthroughs,
            document your challenges, and inspire the next generation of developers.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              to="/create-post"
              className="group bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 shadow-2xl hover:shadow-blue-500/25 hover:scale-105"
            >
              <span className="flex items-center gap-2">
              Start Writing
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Link>
            <Link
              to="/register"
              className="group border-2 border-white/30 text-white hover:bg-white hover:text-slate-900 px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 hover:scale-105 backdrop-blur-sm"
            >
              Join Community
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">500+</div>
              <div className="text-slate-400 text-sm">Developers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">1000+</div>
              <div className="text-slate-400 text-sm">Stories Shared</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">50+</div>
              <div className="text-slate-400 text-sm">Technologies</div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              Why Choose DevDiary?
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              A platform designed specifically for developers, by developers
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group bg-linear-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl border border-blue-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-linear-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">📝</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-slate-800">
                Document Your Journey
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Capture every milestone, bug fix, and breakthrough. Your coding story deserves to be told and remembered.
              </p>
            </div>

            <div className="group bg-linear-to-br from-purple-50 to-pink-50 p-8 rounded-2xl border border-purple-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-linear-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-slate-800">
                Connect & Learn
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Discover solutions from fellow developers, share your expertise, and build meaningful connections in tech.
              </p>
            </div>

            <div className="group bg-linear-to-br from-teal-50 to-green-50 p-8 rounded-2xl border border-teal-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-linear-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-slate-800">
                Grow Together
              </h3>
              <p className="text-slate-600 leading-relaxed">
                From junior to senior, every developer’s perspective matters. Share, learn, and evolve as a community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="relative bg-linear-to-r from-slate-900 via-blue-900 to-slate-900 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            Ready to Share Your <span className="gradient-text">Story</span>?
          </h2>
          <p className="mb-10 text-xl text-slate-300 leading-relaxed">
            Join thousands of developers who are already documenting their journey and inspiring others.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 shadow-2xl hover:shadow-blue-500/25 hover:scale-105"
            >
              Start Your Journey
            </Link>
            <Link
              to="/login"
              className="border-2 border-white/30 text-white hover:bg-white hover:text-slate-900 font-bold px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
