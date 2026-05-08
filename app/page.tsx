import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import Work from "./components/Work";
import Projects from "./components/Projects";
import Stack from "./components/Stack";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Page() {
  return (
    <main className="min-h-screen">
      <Nav />
      <Hero />
      <About />
      <Work />
      <Projects />
      <Stack />
      <Contact />
      <Footer />
    </main>
  );
}
