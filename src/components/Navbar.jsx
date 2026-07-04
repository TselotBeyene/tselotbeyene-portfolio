function Navbar({ onNavigateHome, onNavigateProjects, isProjectPage = false }) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-6 text-sm text-white/70 md:px-10 lg:px-14">
      <button
        type="button"
        onClick={onNavigateHome}
        className="bg-transparent text-[2rem] font-semibold tracking-tight md:text-[2.3rem]"
      >
        Tselot<span className="text-white/25">Beyene</span>
      </button>

      <div className="hidden items-center gap-3 md:flex">
        <span className="font-medium text-white">Profiles</span>
        <span className="text-white/30">/</span>
        <a
          href="https://github.com/TselotBeyene/"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors hover:text-white"
        >
          gh
        </a>
        <span className="text-white/30">/</span>
        <a
          href="mailto:tselotbeyene70@gmail.com"
          className="transition-colors hover:text-white"
        >
          mail
        </a>
      </div>

      <nav className="flex items-center gap-3">
        <button
          type="button"
          onClick={onNavigateHome}
          className="hidden bg-transparent transition-colors hover:text-white md:inline"
        >
          Index
        </button>
        <span className="hidden text-white/30 md:inline">/</span>
        <button
          type="button"
          onClick={onNavigateHome}
          className="hidden bg-transparent transition-colors hover:text-white md:inline"
        >
          About
        </button>
        <span className="hidden text-white/30 md:inline">/</span>
        <button
          type="button"
          onClick={isProjectPage ? onNavigateHome : onNavigateProjects}
          className="hidden bg-transparent transition-colors hover:text-white md:inline"
        >
          Projects
        </button>
        <a
          href="mailto:tselotbeyene70@gmail.com"
          className="ml-2 text-white underline underline-offset-4 transition-colors hover:text-[var(--color-accent-bright)]"
        >
          Let&apos;s talk!
        </a>
      </nav>
    </header>
  );
}

export default Navbar;