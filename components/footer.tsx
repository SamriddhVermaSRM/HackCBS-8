import Link from "next/link";
import { Eye } from "lucide-react";
export default function Footer() {
  return (
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
  );
}
