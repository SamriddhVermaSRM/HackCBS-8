import Link from "next/link";
import { Button } from "./ui/button";
import { Eye,ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
export default function Header() {
	const router =  useRouter()
	return (
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
	);
}
