import React from "react";
import { Card, CardContent } from "./ui/card";
import { Target, Brain, TrendingUp, Heart } from "lucide-react";

const How = () => {
  return (
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
  );
};

export default How;