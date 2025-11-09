import Link from "next/link";
import { Button } from "./ui/button";
import { Eye, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useEffectEvent, useState } from "react";

export default function Header() {
  const [isCounsellor, setIsCounsellor] = useState<boolean | null>(null);

  // Safely read the user role from localStorage. Guard against missing
  // keys or malformed JSON to avoid runtime errors during render.
  const initializeUserType = useEffectEvent(() => {
    try {
      const raw = localStorage.getItem("user");
      if (!raw) {
        setIsCounsellor(null);
        return;
      }
      const parsed = JSON.parse(raw);
      const role = parsed?.role;
      if (role === "counselor" || role === "counsellor") {
        setIsCounsellor(true);
      } else if (role === "user") {
        setIsCounsellor(false);
      } else {
        setIsCounsellor(null);
      }
    } catch (e) {
      setIsCounsellor(null);
    }
  });

  useEffect(() => {
    initializeUserType();
  }, []);

  const logout = async () => {
    try {
      // remove local user data
      localStorage.removeItem("user");

      // try Cookie Store API first (modern browsers)
      if (typeof (window as any).cookieStore?.delete === "function") {
        try {
          await (window as any).cookieStore.delete("jwt");
        } catch (e) {
          // ignore and fall back
        }
      }

      // fallback: expire the cookie via document.cookie
      document.cookie = "jwt=; Max-Age=0; path=/; SameSite=Lax";
    } catch (e) {
      // silent
    } finally {
      setIsCounsellor(null);
      router.push("/auth");
    }
  };
  const router = useRouter();
  return (
    <nav
      aria-label="Main navigation"
      className="relative container mx-auto px-6 py-4 flex justify-between items-center"
    >
      <div className="flex items-center gap-3">
        <img src="/images/logo.png" className="w-12" alt="To Observe logo" />
        <div>
          <h1 className="text-2xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            To Observe
          </h1>
          <p className="text-xs text-gray-600">
            Building Emotional Intelligence
          </p>
        </div>
      </div>
      <div className="flex gap-2 items-center">

        {isCounsellor !== null ? (
          isCounsellor ? (
            <>
              <Link
                className="bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-2 px-4 rounded-lg text-sm"
                href={"/dashboard"}
              >
                Dashboard
              </Link>
              <Button
                className="bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-2 px-4 rounded-lg text-sm"
                onClick={logout}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link
                className="bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-2 px-4 rounded-lg text-sm"
                href={"/training"}
              >
                Training
              </Link>
              <Button
                className="bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-2 px-4 rounded-lg text-sm"
                onClick={logout}
              >
                Logout
              </Button>
            </>
          )
        ) : (
          <>
            <Link
              className="bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-2 px-4 rounded-lg text-sm"
              href={"/partner"}
            >
              Partner with us
            </Link>
            <Link
              className="bg-linear-to-r flex from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-2 px-4 rounded-lg text-sm"
              href={"/auth"}
            >
              Login
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
