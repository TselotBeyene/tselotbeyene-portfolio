function Navbar({
  onNavigateHome,
  onNavigateProjects,
  onNavigateAsk,
  onNavigateTalk,
  isProjectPage = false,
  isAskPage = false,
}) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between gap-3 px-4 py-4 text-[0.8125rem] text-white/70 sm:px-6 sm:text-sm md:px-10 md:py-6 lg:px-14">
      <button
        type="button"
        onClick={onNavigateHome}
        className="min-h-11 shrink-0 bg-transparent text-left text-[1.15rem] font-semibold tracking-tight sm:text-[1.75rem] md:text-[2.3rem]"
        data-cursor-label="Home"
      >
        Tselot
        <span className="text-white/25 max-[380px]:hidden">Beyene</span>
      </button>

      <div className="hidden items-center gap-3 lg:flex">
        <span className="font-medium text-white">Profiles</span>
        <span className="text-white/30">/</span>
        <a
          href="https://github.com/TselotBeyene/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center transition-colors hover:text-white"
        >
          gh
        </a>
        <span className="text-white/30">/</span>
        <a
          href="mailto:tselotbeyene70@gmail.com"
          className="inline-flex min-h-11 items-center transition-colors hover:text-white"
          onClick={(event) => {
            if (onNavigateTalk) {
              event.preventDefault();
              onNavigateTalk();
            }
          }}
        >
          mail
        </a>
      </div>

      <nav className="flex min-w-0 shrink items-center gap-2 sm:gap-3">
        <button
          type="button"
          onClick={onNavigateHome}
          className={`hidden min-h-11 bg-transparent px-1 transition-colors hover:text-white md:inline ${
            !isProjectPage && !isAskPage ? "text-white" : ""
          }`}
        >
          Index
        </button>
        <span className="hidden text-white/30 md:inline">/</span>
        <button
          type="button"
          onClick={onNavigateProjects}
          className={`hidden min-h-11 bg-transparent px-1 transition-colors hover:text-white md:inline ${
            isProjectPage ? "text-white" : ""
          }`}
        >
          Projects
        </button>
        <span className="hidden text-white/30 md:inline">/</span>
        <button
          type="button"
          onClick={onNavigateAsk}
          className={`inline-flex min-h-11 items-center bg-transparent px-1 transition-colors hover:text-white ${
            isAskPage ? "text-white" : ""
          }`}
          data-cursor-label="Ask"
        >
          <span className="md:hidden">Ask</span>
          <span className="hidden md:inline">Ask Me Anything</span>
        </button>
        <button
          type="button"
          onClick={onNavigateTalk}
          className="ml-1 inline-flex min-h-11 items-center bg-transparent text-white underline underline-offset-4 transition-colors hover:text-[var(--color-accent-bright)] sm:ml-2"
          data-cursor-label="Talk"
        >
          <span className="sm:hidden">Talk</span>
          <span className="hidden sm:inline">Let&apos;s talk!</span>
        </button>
      </nav>
    </header>
  );
}

export default Navbar;
