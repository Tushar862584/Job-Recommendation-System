// app/dashboard/page.jsx
'use client';
import { useState } from 'react';
import Head from 'next/head';
import axios from 'axios';

export default function Home() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openCard, setOpenCard] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 6;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setResult(null);
    setLoading(true);
    const response = await axios.post("http://localhost:5000/predict", {
      combined_text: input,
    });
    setResult(response.data.recommended_jobs);
    setCurrentPage(1);
    setLoading(false);
  };

  const toggleCard = (index) => {
    setOpenCard(openCard === index ? null : index);
  };

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = result?.slice(indexOfFirstJob, indexOfLastJob) || [];
  const totalPages = result ? Math.ceil(result.length / jobsPerPage) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-tr from-purple-100 via-pink-100 to-indigo-100 px-4 md:px-16 py-12 font-sans text-gray-800">
      <Head>
        <title>JobMatch AI</title>
      </Head>

      <header className="flex justify-between items-center mb-12 border-b pb-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-purple-700 drop-shadow-sm">💼 JobMatch AI</h1>
        <span className="text-sm text-purple-400 italic">Find your dream job faster</span>
      </header>

      <main className="flex flex-col items-center justify-start bg-white/60 px-4 py-10 rounded-xl">
        <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl p-8 mb-10 border border-gray-100 transition-all">
          <h2 className="text-3xl font-bold mb-4 text-indigo-600">✨ Discover Jobs Just for You</h2>
          <p className="text-gray-500 mb-6">Let our AI match you with top opportunities tailored to your skills.</p>

          <input
            type="text"
            placeholder="E.g., Full Stack Developer, Remote Design..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full p-4 rounded-xl border border-indigo-200 focus:outline-none focus:ring-4 focus:ring-indigo-300 text-base shadow-sm transition"
          />

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="mt-6 w-full px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full font-semibold shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-50"
          >
            {loading ? 'Finding best matches...' : '🔎 Match Me Now'}
          </button>
        </div>

        {loading && (
          <div className="mt-4 text-lg text-indigo-600 animate-pulse">
            ⏳ Scanning roles for your profile...
          </div>
        )}

        {currentJobs.length > 0 ? (
          <>
            <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {currentJobs.map((job, i) => {
                const globalIndex = indexOfFirstJob + i;
                const initial = job?.job_title?.trim()?.charAt(0)?.toUpperCase() || '🧠';
                const isLongTitle = job?.job_title?.length > 35;
                return (
                  <div key={globalIndex} className="group bg-white rounded-2xl shadow-lg border border-gray-100 p-6 flex flex-col justify-between hover:shadow-2xl transition-all duration-300 min-h-[280px]">
                    <div>
                      <div className="flex items-start gap-4 mb-4">
                        <div className={`w-12 h-12 min-w-12 min-h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-[20px] font-bold tracking-wide shadow-md`}>
                          {initial}
                        </div>
                        <div className="flex-1 text-left">
                          <h3 className={`text-base md:text-lg font-semibold text-gray-800 break-words ${openCard === globalIndex ? '' : 'line-clamp-1'}`}>
                            {job.job_title}
                          </h3>
                          <p className="text-sm text-gray-500 break-words line-clamp-1">{job.company_name}</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="text-xs bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full">📍 {job.location}</span>
                        <span className="text-xs bg-pink-100 text-pink-600 px-3 py-1 rounded-full">🧩 {job.hiring_status}</span>
                      </div>

                      {openCard === globalIndex && (
                        <div className="mt-3 space-y-2 text-sm text-gray-700 animate-fade-in">
                          {job.job_function && <div>💼 {job.job_function}</div>}
                          {job.seniority_level && <div>📈 {job.seniority_level}</div>}
                          {job.employment_type && <div>📋 {job.employment_type}</div>}
                          {job.industry && <div>🏢 {job.industry}</div>}
                          {job.date && <div>📅 {job.date}</div>}
                        </div>
                      )}
                    </div>

                    <div className="mt-5 flex justify-between items-center">
                      <button
                        onClick={() => toggleCard(globalIndex)}
                        className="text-sm font-medium text-indigo-600 hover:underline"
                      >
                        {openCard === globalIndex ? 'Less Info' : 'More Info'}
                      </button>
                      <a
                        href={`https://www.linkedin.com/jobs/view/${job.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-4 py-2 rounded-full shadow hover:scale-105 transition"
                      >
                        🔗 Apply
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-10">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 text-sm font-medium bg-white text-indigo-600 border border-indigo-300 rounded-full shadow disabled:opacity-50"
                >
                  ⬅️ Prev
                </button>
                <span className="text-sm font-medium text-gray-600">Page {currentPage} of {totalPages}</span>
                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 text-sm font-medium bg-white text-indigo-600 border border-indigo-300 rounded-full shadow disabled:opacity-50"
                >
                  Next ➡️
                </button>
              </div>
            )}
          </>
        ) : (
          !loading && result && (
            <p className="text-gray-400 mt-12 text-lg font-medium">🚫 No matches found. Try a different role!</p>
          )
        )}
      </main>

      <footer className="mt-16 text-sm text-indigo-400 text-center">
        © {new Date().getFullYear()} JobMatch AI. Crafted with 💜 using Next.js.
      </footer>

      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}