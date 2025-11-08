import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
function CTA() {
  return (
    <>
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
    </>
  );
}

export default CTA;
