"use client";

import { useState } from "react";
// 1. Added icon imports from lucide-react
import {
  ArrowRight,
  BookOpen,
  BarChart3,
  Smile,
  Plug,
  Check,
  Send,
  HelpCircle,
  X,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
export default function Partner() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter()
  const openModal = () => {
    setSubmitted(false);
    setIsOpen(true);
  };
  const closeModal = () => setIsOpen(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // UI-only: no network calls. Show a success state.
    setSubmitted(true);
    setTimeout(() => {
      setIsOpen(false);
      setName("");
      setEmail("");
    }, 1500); // Increased timeout slightly for better UX
  };

  // New FAQ Content
  const faqs = [
    {
      q: "Who is this platform for?",
      a: "Our platform is designed for schools, tutoring centers, and educational content creators who want to provide engaging, audio-first lessons for children aged 5-10.",
    },
    {
      q: "How does the integration work?",
      a: "We offer a lightweight API and a simple content model. You can either embed our lesson player directly into your existing site or app, or use our API to pull content.",
    },
    {
      q: "Is the content safe for children?",
      a: "Absolutely. 'Child-first' is our core principle. All content is rigorously tested for safety, clarity, and age-appropriateness. There are no external links or ads.",
    },
    {
      q: "What do 'data-driven insights' include?",
      a: "You get access to a dashboard that tracks key metrics like lesson completion, answer times, and areas of difficulty. This helps educators personalize learning paths.",
    },
  ];

  return (
    // Updated vibrant background gradient
    <>
      <main className="min-h-screen relative bg-linear-to-br from-indigo-50 via-white to-emerald-50 py-16 px-4">
        <Button
          className="absolute left-4 top-4 z-20"
          aria-label="Go back"
          onClick={() => {
            router.push("/");
          }}
        >
          <ArrowLeft />
        </Button>
        {/* --- Hero Section --- */}
        <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="flex flex-col gap-6">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              Partner with Us
            </h1>
            <p className="text-lg text-gray-600">
              Join a growing learning platform built for children and educators.
              We combine interactive audio, friendly characters, and measurable
              insights so learners stay curious and progress faster.
            </p>
            <div className="flex items-center gap-4">
              <button
                onClick={openModal}
                className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105"
              >
                Register Interest
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                className="inline-flex items-center gap-2 bg-white border border-gray-300 text-gray-700 font-medium px-5 py-3 rounded-lg hover:bg-gray-50 transition-all duration-300"
                onClick={() =>
                  // Scroll to the features section
                  document.getElementById("features")?.scrollIntoView({
                    behavior: "smooth",
                  })
                }
              >
                <HelpCircle className="w-5 h-5" />
                Learn more
              </button>
            </div>
          </div>
          <div className="hidden md:flex items-center justify-center p-8 bg-linear-to-tr from-indigo-100 to-emerald-100 rounded-2xl shadow-inner aspect-square">
            {/* This is a placeholder for a hero image or illustration */}

            <img src="/images/patner.png" alt="Partnership illustration" />
          </div>
        </section>

        {/* --- Feature Grid Section --- */}
        <section id="features" className="max-w-6xl mx-auto mt-20">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">
            Our Platform Highlights
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <li className="p-6 bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-indigo-100 transition-shadow duration-300">
              <div className="w-12 h-12 flex items-center justify-center bg-indigo-100 rounded-full mb-4">
                <BookOpen className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="font-semibold text-lg text-indigo-700 mb-1">
                Interactive Audio Lessons
              </h3>
              <p className="text-sm text-indigo-600">
                Voice-guided lessons with engaging characters keep learners
                focused.
              </p>
            </li>
            {/* Feature 2 */}
            <li className="p-6 bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-emerald-100 transition-shadow duration-300">
              <div className="w-12 h-12 flex items-center justify-center bg-emerald-100 rounded-full mb-4">
                <BarChart3 className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-lg text-emerald-700 mb-1">
                Data-driven Insights
              </h3>
              <p className="text-sm text-emerald-600">
                Track answer times and progress to personalize learning paths.
              </p>
            </li>
            {/* Feature 3 */}
            <li className="p-6 bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-yellow-100 transition-shadow duration-300">
              <div className="w-12 h-12 flex items-center justify-center bg-yellow-100 rounded-full mb-4">
                <Smile className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="font-semibold text-lg text-yellow-700 mb-1">
                Kid-friendly UI
              </h3>
              <p className="text-sm text-yellow-600">
                Bright, friendly designs that feel safe and welcoming.
              </p>
            </li>
            {/* Feature 4 */}
            <li className="p-6 bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-pink-100 transition-shadow duration-300">
              <div className="w-12 h-12 flex items-center justify-center bg-pink-100 rounded-full mb-4">
                <Plug className="w-6 h-6 text-pink-600" />
              </div>
              <h3 className="font-semibold text-lg text-pink-700 mb-1">
                Easy Integration
              </h3>
              <p className="text-sm text-pink-600">
                Lightweight API and simple content model so you can launch
                quickly.
              </p>
            </li>
          </ul>
        </section>

        {/* --- Comparison & Why Choose Us Section --- */}
        <section className="max-w-6xl mx-auto mt-20 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Feature Comparison
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr className="text-slate-600">
                    <th className="p-3 font-medium">Capability</th>
                    <th className="p-3 font-medium">Our Product</th>
                    <th className="p-3 font-medium">Typical Alternatives</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  <tr className="border-b border-slate-100">
                    <td className="p-3">Audio-first lessons</td>
                    <td className="p-3 font-medium text-emerald-600">
                      Yes — native audio generation & player
                    </td>
                    <td className="p-3 text-gray-500">
                      Often text-first, limited audio
                    </td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="p-3">Simple analytics</td>
                    <td className="p-3 font-medium text-emerald-600">
                      Answer times & lesson logs
                    </td>
                    <td className="p-3 text-gray-500">
                      Manual reporting or none
                    </td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="p-3">Kid-friendly visuals</td>
                    <td className="p-3 font-medium text-emerald-600">
                      Bright characters and clear CTAs
                    </td>
                    <td className="p-3 text-gray-500">Generic UI</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <aside className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
            <h4 className="text-2xl font-semibold text-gray-800 mb-4">
              Why Choose Us?
            </h4>
            <ol className="text-base text-gray-700 space-y-3 list-decimal list-inside">
              <li>
                <span className="font-medium">Child-first design</span> —
                everything is tested for safety and clarity.
              </li>
              <li>
                <span className="font-medium">Rich audio</span> that reduces
                screen fatigue and aids listening skills.
              </li>
              <li>
                <span className="font-medium">Built-in analytics</span> so
                caregivers can support progress.
              </li>
              <li>
                <span className="font-medium">Open to partners</span> — we offer
                easy co-branding and content placement.
              </li>
            </ol>
          </aside>
        </section>

        {/* --- Testimonials Section --- */}
        <section className="max-w-6xl mx-auto mt-20">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">
            What Our Partners Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-6">
              <blockquote className="text-lg text-gray-700 mb-4 italic">
                “My students are more attentive and actually enjoy their reading
                practice now. The audio lessons are a game-changer.”
              </blockquote>
              <p className="font-semibold text-indigo-700">
                — Mrs. Chen, Primary School Teacher
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-6">
              <blockquote className="text-lg text-gray-700 mb-4 italic">
                “The platform was incredibly easy to adopt. We were up and
                running in a day, and our tutors love the analytics dashboard.”
              </blockquote>
              <p className="font-semibold text-indigo-700">
                — David Lee, BrightStart Tutoring
              </p>
            </div>
          </div>
        </section>

        {/* --- NEW: FAQ Section --- */}
        <section className="max-w-4xl mx-auto mt-20">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-white rounded-lg shadow-lg border border-gray-100 p-5"
              >
                <h4 className="font-semibold text-lg text-gray-800">{faq.q}</h4>
                <p className="text-gray-600 mt-1">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* --- Modal (Logic unchanged, styles polished) --- */}
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Overlay */}
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={closeModal}
            />

            {/* Modal Content */}
            <div className="relative z-10 w-full max-w-md">
              <div className="bg-white rounded-2xl shadow-2xl p-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-semibold">
                    Partner Registration
                  </h3>
                  <button
                    onClick={closeModal}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Tell us a bit about your organization and we will reach out.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <label className="block">
                    <span className="text-sm font-medium text-gray-700">
                      Name
                    </span>
                    <input
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500"
                      placeholder="Your name or organization"
                    />
                  </label>

                  <label className="block">
                    <span className="text-sm font-medium text-gray-700">
                      Email
                    </span>
                    <input
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500"
                      placeholder="you@school.org"
                    />
                  </label>

                  <div className="flex items-center justify-between gap-3 pt-2">
                    <button
                      type="submit"
                      disabled={submitted}
                      className={`inline-flex items-center justify-center gap-2 w-full px-4 py-2 rounded-md font-semibold text-white transition-all duration-300 ${
                        submitted
                          ? "bg-green-500"
                          : "bg-indigo-600 hover:bg-indigo-700"
                      }`}
                    >
                      {submitted ? (
                        <>
                          Submitted <Check className="w-5 h-5" />
                        </>
                      ) : (
                        <>
                          Register <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                  {submitted && (
                    <div className="flex items-center gap-2 text-sm text-green-700 p-3 bg-green-50 rounded-lg mt-3">
                      <Check className="w-4 h-4" />
                      Thanks — we will contact you soon.
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
