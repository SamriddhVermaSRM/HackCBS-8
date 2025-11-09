import Link from "next/link";
import { Button } from "./ui/button";
import { Eye, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useEffectEvent, useState } from "react";
export default function Header() {
  const [isCounsellor, setIsCounsellor] = useState<boolean | null>(null);

  const initializeUserType = useEffectEvent(() => {
    const { role } = JSON.parse(localStorage.getItem("user") ?? "{}");
    if (role === "counselor") {
      setIsCounsellor(true);
    } else if (role === "user") {
      setIsCounsellor(false);
    } else {
      setIsCounsellor(null);
    }
  });

  useEffect(() => {
    initializeUserType();
  }, []);

  const router = useRouter();
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
        <Link
          className="bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-2 px-4 rounded-lg text-sm"
          href={"/partner"}
        >
          Patrner with us
        </Link>

        {isCounsellor !== null ? (
          isCounsellor ? (
            <Link
              className="bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-2 px-4 rounded-lg text-sm"
              href={"/dashboard"}
            >
              Dashboard
            </Link>
          ) : (
            <Link
              className="bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-2 px-4 rounded-lg text-sm"
              href={"/training"}
            >
              Training
            </Link>
          )
        ) : (
          <Link
            className="bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-2 px-4 rounded-lg text-sm flex "
            href={"/auth"}
          >
            Login/Logout
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        )}
      </div>
    </nav>
  );
}
