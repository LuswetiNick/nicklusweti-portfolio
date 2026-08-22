import About from "@/components/about";
import Contact from "@/components/contact";
import FloatingNav from "@/components/floating-nav";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Hero from "@/components/hero";
import Projects from "@/components/projects";
import Services from "@/components/services";

export default function Home() {
  return (
    <>
      <main className="relative min-h-screen overflow-x-clip bg-[#0f0f10]">
        <Header />
        <Hero />
        <About />
        <Projects />
        <Services />
        <Contact />
      </main>
      <Footer />
      <FloatingNav />
    </>
  );
}
