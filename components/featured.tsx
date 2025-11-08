import Image from "next/image"
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
export default function Featured() {
  return (
    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center min-h-screen px-6 py-12 lg:py-0">
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
    </div>
  )
}
