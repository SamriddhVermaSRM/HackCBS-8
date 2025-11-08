"use client";
import React from "react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Brain,
  Users,
  LineChart,
  Heart,
  Shield,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  GraduationCap,
  Eye,
  Target,
  TrendingUp,
} from "lucide-react";
import { useRouter } from "next/navigation";
export default function Home() {
  const scrollToLearnMore = () => {
    document
      .getElementById("learn-more-section")
      ?.scrollIntoView({ behavior: "smooth" });
  };
  const router = useRouter();
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-r from-blue-600/10 to-purple-600/10" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSIjOTMzNEU2IiBzdHJva2Utb3BhY2l0eT0iLjA1Ii8+PC9nPjwvc3ZnPg==')] opacity-30" />
        <nav className="relative container mx-auto px-6 py-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-linear-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Eye className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                To Observe
              </h1>
              <p className="text-xs text-gray-600">
                Building Emotional Intelligence
              </p>
            </div>
          </div>
          <div className=" flex gap-2">
            <Button
              className="bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              onClick={() => {
                router.push("/training");
              }}
            >
              Training
            </Button>
            <Button className="bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              Login
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </nav>
        <div className="relative container mx-auto px-6 py-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur rounded-full mb-6 shadow-sm">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium text-gray-700">
              AI-Powered Emotional Intelligence Platform
            </span>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Observe, Learn, <br />
            <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Evolve
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
            Building emotionally strong students for the future through
            interactive learning and preventive emotional health monitoring.
          </p>
          <div className="flex gap-4 justify-center">
            <Button
              size="lg"
              className="bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 shadow-lg"
            >
              Get Started
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 border-2"
              onClick={scrollToLearnMore}
            >
              Learn More
            </Button>
          </div>
        </div>
      </header>
      {/* Stats Section */}
      <section className="py-12 bg-white/50 backdrop-blur border-y">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">98%</div>
              <div className="text-gray-600">Early Detection Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">
                10K+
              </div>
              <div className="text-gray-600">Students Supported</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-indigo-600 mb-2">
                500+
              </div>
              <div className="text-gray-600">Schools Partner</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-pink-600 mb-2">95%</div>
              <div className="text-gray-600">Counselor Satisfaction</div>
            </div>
          </div>
        </div>
      </section>
      {/* About Section */}
      <section id="learn-more-section" className="py-20 container mx-auto px-6">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-bold text-gray-900 mb-4">
            Where Learning Meets Emotional Wellness
          </h3>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            To Observe seamlessly combines engaging EQ education with AI-powered
            behavioral analysis, helping schools detect early emotional
            challenges while students learn valuable life skills.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="border-2 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-8">
              <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                <Brain className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="text-2xl font-bold mb-4">Interactive Learning</h4>
              <p className="text-gray-600 mb-4">
                Students engage with real-life scenarios, making choices and
                learning emotional intelligence through story-based modules
                aligned with the CASEL framework.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600">
                    Self-awareness development
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600">
                    Social skills training
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600">
                    Decision-making practice
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
          <Card className="border-2 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-8">
              <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center mb-6">
                <LineChart className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="text-2xl font-bold mb-4">AI-Powered Analysis</h4>
              <p className="text-gray-600 mb-4">
                Our advanced AI system analyzes student responses and behavioral
                patterns to identify early signs of emotional challenges that
                may need attention.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600">
                    Response pattern analysis
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600">
                    Behavioral trend tracking
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600">
                    Automated flagging system
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
          <Card className="border-2 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-8">
              <div className="w-14 h-14 bg-pink-100 rounded-2xl flex items-center justify-center mb-6">
                <Heart className="w-8 h-8 text-pink-600" />
              </div>
              <h4 className="text-2xl font-bold mb-4">Early Support</h4>
              <p className="text-gray-600 mb-4">
                Counselors receive timely alerts about students showing
                concerning patterns, enabling proactive intervention before
                issues escalate.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600">
                    Preventive intervention
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600">
                    Progress monitoring
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600">
                    Targeted support plans
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>
      {/* User Types Section */}
      <section className="py-20 bg-linear-to-b from-white to-blue-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 mb-4">
              Designed for Every Role
            </h3>
            <p className="text-xl text-gray-600">
              Tailored experiences for students, counselors, and administrators
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="relative overflow-hidden group hover:shadow-2xl transition-all duration-300">
              <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-blue-400 to-blue-600 rounded-bl-full opacity-10 group-hover:opacity-20 transition-opacity" />
              <CardContent className="p-8">
                <GraduationCap className="w-12 h-12 text-blue-600 mb-4" />
                <h4 className="text-2xl font-bold mb-3">For Students</h4>
                <p className="text-gray-600 mb-6">
                  Engage with fun, interactive scenarios that teach emotional
                  intelligence and life skills while tracking your progress and
                  earning badges.
                </p>
                <Button
                  variant="outline"
                  className="w-full group-hover:bg-blue-600 group-hover:text-white transition-colors"
                >
                  Student Login
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
            <Card className="relative overflow-hidden group hover:shadow-2xl transition-all duration-300">
              <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-purple-400 to-purple-600 rounded-bl-full opacity-10 group-hover:opacity-20 transition-opacity" />
              <CardContent className="p-8">
                <Users className="w-12 h-12 text-purple-600 mb-4" />
                <h4 className="text-2xl font-bold mb-3">For Counselors</h4>
                <p className="text-gray-600 mb-6">
                  Access insights on flagged students, view behavioral patterns,
                  and create targeted intervention plans to support student
                  wellbeing.
                </p>
                <Button
                  variant="outline"
                  className="w-full group-hover:bg-purple-600 group-hover:text-white transition-colors"
                >
                  Counselor Login
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
            <Card className="relative overflow-hidden group hover:shadow-2xl transition-all duration-300">
              <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-pink-400 to-pink-600 rounded-bl-full opacity-10 group-hover:opacity-20 transition-opacity" />
              <CardContent className="p-8">
                <Shield className="w-12 h-12 text-pink-600 mb-4" />
                <h4 className="text-2xl font-bold mb-3">For Admins</h4>
                <p className="text-gray-600 mb-6">
                  Comprehensive analytics, student management, module creation,
                  and full system control with powerful reporting tools.
                </p>
                <Button
                  variant="outline"
                  className="w-full group-hover:bg-pink-600 group-hover:text-white transition-colors"
                >
                  Admin Login
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      {/* How It Works */}
      <section className="py-20 container mx-auto px-6">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h3>
          <p className="text-xl text-gray-600">
            A seamless flow from learning to support
          </p>
        </div>
        <div className="relative">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-linear-to-r from-blue-200 via-purple-200 to-pink-200 -translate-y-1/2 hidden md:block" />
          <div className="grid md:grid-cols-4 gap-8 relative">
            {/*
              {
                icon: Target,
                title: "Students Play",
                desc: "Engage with life-scenario modules",
                color: "blue",
              },
              {
                icon: Brain,
                title: "AI Analyzes",
                desc: "Responses are evaluated in real-time",
                color: "purple",
              },
              {
                icon: TrendingUp,
                title: "Data Visualized",
                desc: "Admin dashboard monitors patterns",
                color: "indigo",
              },
              {
                icon: Heart,
                title: "Support Provided",
                desc: "Counselors intervene when needed",
                color: "pink",
              },
            */}
            {Array(4)
              .fill(0)
              .map((_, idx) => (
                <Card
                  key={idx}
                  className="relative bg-white border-2 hover:shadow-lg transition-all"
                >
                  <CardContent className="p-6 text-center">
                    <div
                      className={`w-16 h-16 bg-${
                        ["blue", "purple", "indigo", "pink"][idx]
                      }-100 rounded-full flex items-center justify-center mx-auto mb-4 relative z-10`}
                    >
                      {React.createElement(
                        [Target, Brain, TrendingUp, Heart][idx],
                        {
                          className: `w-8 h-8 text-${
                            ["blue", "purple", "indigo", "pink"][idx]
                          }-600`,
                        }
                      )}
                    </div>
                    <div className="absolute top-8 left-1/2 -translate-x-1/2 w-12 h-12 bg-white rounded-full border-4 border-gray-100 flex items-center justify-center font-bold text-gray-400 z-0">
                      {idx + 1}
                    </div>
                    <h5 className="font-bold text-lg mb-2 mt-4">
                      {["Students Play", "AI Analyzes", "Data Visualized", "Support Provided"][
                        idx
                      ]}
                    </h5>
                    <p className="text-sm text-gray-600">
                      {["Engage with life-scenario modules", "Responses are evaluated in real-time", "Admin dashboard monitors patterns", "Counselors intervene when needed"][
                        idx
                      ]}
                    </p>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-20 bg-linear-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-4xl font-bold mb-4">
            Ready to Build Emotionally Intelligent Students?
          </h3>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join schools worldwide in creating a supportive, proactive approach
            to student emotional wellness.
          </p>
          <Button
            size="lg"
            className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-10 shadow-xl"
          >
            Start Your Journey
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>
      {/* Footer */}
      <footer className="py-12 bg-gray-900 text-gray-400">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-linear-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <span className="text-white font-bold text-lg">To Observe</span>
              </div>
              <p className="text-sm">
                Building emotionally strong students through AI-powered learning
                and observation.
              </p>
            </div>
            <div>
              <h5 className="text-white font-semibold mb-4">Platform</h5>
              <ul className="space-y-2 text-sm">
                <li>
                  <button className="hover:text-white transition-colors">
                    For Students
                  </button>
                </li>
                <li>
                  <button className="hover:text-white transition-colors">
                    For Counselors
                  </button>
                </li>
                <li>
                  <button className="hover:text-white transition-colors">
                    For Schools
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="text-white font-semibold mb-4">Resources</h5>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About CASEL
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Research
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Support
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="text-white font-semibold mb-4">Legal</h5>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    COPPA Compliance
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>
              &copy; 2025 To Observe. All rights reserved. Built with care for
              emotional wellness.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}