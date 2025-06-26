'use client';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const [loading, setLoading] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleStartMatching = () => {
    setButtonLoading(true);
    setTimeout(() => router.push('/dashboard'), 1200);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-500 border-solid mx-auto mb-4"></div>
          <p className="text-indigo-600 font-medium">Loading JobMatch AI...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-sans text-gray-800 bg-gradient-to-tr from-purple-50 via-pink-50 to-indigo-100">
      <Head>
        <title>JobMatch AI - Intelligent Career Discovery</title>
      </Head>

      <header className="sticky top-0 z-50 bg-white shadow-sm px-8 py-5 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-indigo-700">💼 JobMatch AI</h1>
        <nav className="space-x-5 text-sm">
          <Link href="#features" className="text-indigo-600 hover:underline">Features</Link>
          <Link href="#steps" className="text-indigo-600 hover:underline">How It Works</Link>
          <Link href="/dashboard" className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-full font-medium shadow">Try Now</Link>
        </nav>
      </header>

      <section className="text-center py-32 px-6 bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100">
        <h2 className="text-5xl md:text-6xl font-extrabold text-indigo-800 drop-shadow-sm mb-6">🚀 AI That Understands Your Career</h2>
        <p className="max-w-2xl mx-auto text-lg text-indigo-600 mb-10">Instant, intelligent job matching crafted just for you. No signup. No hassle.</p>
        <button
          onClick={handleStartMatching}
          disabled={buttonLoading}
          className={`bg-gradient-to-r from-indigo-500 to-purple-600 hover:to-pink-500 px-10 py-4 text-white font-bold rounded-full shadow-xl transition-all hover:scale-105 ${buttonLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {buttonLoading ? 'Loading...' : 'Start Matching →'}
        </button>
      </section>

      <section id="features" className="py-24 bg-white text-center px-4">
        <h3 className="text-4xl font-bold text-indigo-700 mb-12">✨ Platform Highlights</h3>
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-50 to-white shadow-lg hover:shadow-2xl">
            <h4 className="text-xl font-semibold text-purple-700 mb-2">🔍 Smart Matching</h4>
            <p className="text-sm text-gray-600">AI reads your input and recommends roles that truly match your skills & goals.</p>
          </div>
          <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-white shadow-lg hover:shadow-2xl">
            <h4 className="text-xl font-semibold text-indigo-700 mb-2">⚡ Instant Results</h4>
            <p className="text-sm text-gray-600">Submit your query and get tailored jobs in under 2 seconds, powered by cutting-edge ML.</p>
          </div>
          <div className="p-6 rounded-2xl bg-gradient-to-br from-pink-50 to-white shadow-lg hover:shadow-2xl">
            <h4 className="text-xl font-semibold text-pink-700 mb-2">🎯 Personalized Always</h4>
            <p className="text-sm text-gray-600">The more you use it, the more accurate it gets. Adaptive learning that improves over time.</p>
          </div>
        </div>
      </section>

      <section id="steps" className="py-24 bg-gradient-to-r from-indigo-50 to-purple-100 text-center px-4">
        <h3 className="text-4xl font-bold text-indigo-800 mb-14">🛠️ How It Works</h3>
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition">
            <h5 className="text-3xl mb-2">1️⃣</h5>
            <p className="text-gray-600 text-sm">Describe yourself and your career goals in a few words.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition">
            <h5 className="text-3xl mb-2">2️⃣</h5>
            <p className="text-gray-600 text-sm">Our AI finds jobs that align with your skills and ambition.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition">
            <h5 className="text-3xl mb-2">3️⃣</h5>
            <p className="text-gray-600 text-sm">Review the top matches and apply instantly in one click.</p>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 text-center bg-white">
        <h3 className="text-4xl font-bold text-indigo-700 mb-4">🔥 Start Matching Smarter</h3>
        <p className="text-lg text-gray-600 mb-8">Join thousands who've found their path with AI — zero friction.</p>
        <Link href="/dashboard" className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-4 rounded-full text-lg font-bold shadow-lg">
          Launch Recommender
        </Link>
      </section>

      <footer className="text-center text-sm py-8 text-indigo-400">
        © {new Date().getFullYear()} JobMatch AI. Made with 💜 using Next.js & Tailwind CSS.
      </footer>

      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}