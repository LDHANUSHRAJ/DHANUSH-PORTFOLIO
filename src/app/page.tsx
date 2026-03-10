import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import StartupTimeline from "@/components/StartupTimeline";
import Contact from "@/components/Contact";
import SocialLinks from "@/components/SocialLinks";
import StorytellingStrip from "@/components/StorytellingStrip";
import HorizontalGallery from "@/components/HorizontalGallery";

export default function Home() {
  return (
    <div className="relative bg-white selection:bg-primary selection:text-white">
      {/* Fixed UI elements remaining on page */}
      <SocialLinks />

      {/* Content Layers */}
      <div className="relative z-10">
        <Hero />

        <section id="about" className="bg-[#f2f2f2]">
          <About />
        </section>

        <StorytellingStrip />

        <HorizontalGallery />

        <section id="projects" className="bg-white">
          <Projects />
        </section>

        <section id="timeline" className="bg-[#f2f2f2]">
          <StartupTimeline />
        </section>

        <section id="contact" className="bg-white">
          <Contact />
        </section>
      </div>

      {/* Global Bottom Frame - Professional Detail */}
      <footer className="py-20 bg-white border-t border-[#333333]/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-6">
          <span className="luxury-text text-xl text-[#333333]">L DHANUSH RAJ</span>
          <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-[#333333]/30">© 2026 L DHANUSH RAJ. ALL RIGHTS RESERVED.</span>
        </div>
      </footer>
    </div>
  );
}
