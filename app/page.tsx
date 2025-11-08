"use client";
import { useEffect } from "react"
import Lenis from "@studio-freight/lenis"
import Hero from "@/components/hero"
import Featured from "@/components/featured"
import Promo from "@/components/promo"
import Footer from "@/components/footer"
import How from "@/components/how";
import CTA from "@/components/CTA";
export default function Home() {
    useEffect(() => {
    const lenis = new Lenis()

    function raf(time:any) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
  }, [])
  return (
    <>
      <main className="bg-background text-foreground min-h-screen">
        <Hero/>
        <Featured/>
        <Promo/>
        <How/>
        <CTA/>
        <Footer/>
      </main>
    </>
  );
}
