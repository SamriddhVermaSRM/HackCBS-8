"use client";

import Image from "next/image";
import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";
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
import { Card,CardContent } from "./ui/card";
import { Button } from "./ui/button";
export default function Section() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-10vh", "10vh"]);

  return (
    <div
      ref={container}
      className="relative flex items-center justify-center h-screen overflow-hidden"
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
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
    </div>
  );
}
