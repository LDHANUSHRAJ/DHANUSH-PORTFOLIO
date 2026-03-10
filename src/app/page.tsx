import Hero from "@/components/sections/Hero";
import Story from "@/components/sections/Story";
import Track from "@/components/sections/Track";
import Skills from "@/components/sections/Skills";
import OffTrack from "@/components/sections/OffTrack";
import Contact from "@/components/sections/Contact";
import SocialLinks from "@/components/SocialLinks";

export default function Home() {
  return (
    <div className="relative bg-obsidian selection:bg-neon-green selection:text-black">
      {/* Fixed UI elements remaining on page */}
      <SocialLinks />

      {/* Content Layers */}
      <div className="relative z-10">
        <Hero />

        <section id="story">
          <Story />
        </section>

        <section id="track">
          <Track />
        </section>

        <section id="skills">
          <Skills />
        </section>

        <section id="off-track">
          <OffTrack />
        </section>

        <section id="contact">
          <Contact />
        </section>
      </div>

      {/* Global Bottom Frame - Professional Detail */}
      <footer className="py-20 bg-obsidian border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-6">
          <span className="font-outfit text-xl text-white font-bold tracking-tighter">L DHANUSH RAJ</span>
          <span className="font-jakarta text-[10px] font-bold tracking-[0.5em] uppercase text-white/20">© 2026 L DHANUSH RAJ. ALL RIGHTS RESERVED.</span>
        </div>
      </footer>
    </div>
  );
}
