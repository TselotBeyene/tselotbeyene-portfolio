function Navbar() {
    return (
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-6 text-sm text-white/70 md:px-10 lg:px-14">
        <div className="text-[2rem] font-semibold tracking-tight md:text-[2.3rem]">
          Tselot<span className="text-white/25">Beyene</span>
        </div>
  
        <div className="hidden items-center gap-3 md:flex">
          <span className="font-medium text-white">Socials</span>
          <span className="text-white/30">/</span>
          <a href="#" className="transition-colors hover:text-white">
            li
          </a>
          <span className="text-white/30">/</span>
          <a href="#" className="transition-colors hover:text-white">
            dr
          </a>
          <span className="text-white/30">/</span>
          <a href="#" className="transition-colors hover:text-white">
            tw
          </a>
        </div>
  
        <nav className="flex items-center gap-3">
          <a href="#" className="hidden transition-colors hover:text-white md:inline">
            Index
          </a>
          <span className="hidden text-white/30 md:inline">/</span>
          <a href="#" className="hidden transition-colors hover:text-white md:inline">
            About
          </a>
          <span className="hidden text-white/30 md:inline">/</span>
          <a href="#" className="hidden transition-colors hover:text-white md:inline">
            Projects
          </a>
          <a
            href="#"
            className="ml-2 text-white underline underline-offset-4 transition-colors hover:text-[#ff5a1f]"
          >
            Let&apos;s talk!
          </a>
        </nav>
      </header>
    );
  }
  
  export default Navbar;