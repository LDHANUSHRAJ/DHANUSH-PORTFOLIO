"use client";



export default function Header() {
    return (
        <header className="fixed top-0 left-0 w-full h-[80px] px-8 md:px-16 flex items-center justify-between z-[100] bg-white/10 backdrop-blur-sm border-b border-[#333333]/5">
            {/* Left Branding - Technical & Minimalist */}
            <div className="flex items-center gap-6">
                <span className="text-[#333333] font-black tracking-[0.3em] text-xs uppercase cursor-pointer luxury-text">
                    L_DHANUSH_<span className="text-primary italic">RAJ</span>
                </span>
                <div className="w-[1px] h-3 bg-[#333333]/10 hidden lg:block" />
                <span className="text-[8px] font-bold tracking-[0.4em] text-primary/40 uppercase hidden lg:block">
                    SYSTEM_ARCHITECT_V2.0
                </span>
            </div>

            {/* Right Navigation */}
            <nav className="flex items-center gap-12">
                <div className="hidden lg:flex gap-12 text-[9px] font-black tracking-[0.5em] uppercase text-[#333333]">
                    <a
                        href="#about"
                        onClick={(e) => { e.preventDefault(); document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }); }}
                        className="magnetic-item opacity-40 hover:opacity-100 hover:text-primary transition-all"
                    >CORE_VISION</a>
                    <a
                        href="#projects"
                        onClick={(e) => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); }}
                        className="magnetic-item opacity-40 hover:opacity-100 hover:text-primary transition-all"
                    >SYSTEM_DEPLOYS</a>
                </div>

                <button
                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                    className="magnetic-item px-8 py-3 bg-[#333333] text-white text-[9px] font-black tracking-[0.5em] uppercase hover:bg-primary transition-all duration-500 rounded-lg shadow-lg shadow-primary/5"
                >
                    INITIALIZE_PORT
                </button>
            </nav>
        </header>
    );
}
