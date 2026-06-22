function BannerRow({ items, reverse = false }) {
    const loop = [...items, ...items, ...items];
  
    return (
      <div className="absolute left-1/2 w-[200vw] -translate-x-1/2 overflow-hidden">
        <div
          className={`flex w-max whitespace-nowrap ${
            reverse
              ? "animate-[bannerRight_20s_linear_infinite]"
              : "animate-[bannerLeft_20s_linear_infinite]"
          }`}
        >
          {loop.map((item, i) => (
            <span
              key={i}
              className="flex items-center px-10 text-[3.2rem] font-semibold tracking-[-0.05em] text-white"
            >
              {item}
              <span className="ml-10 text-[0.6em]">✳</span>
            </span>
          ))}
        </div>
      </div>
    );
  }
  
  const topItems = [
    "PRODUCT DESIGN",
    "BRAND DESIGN & STRATEGY",
    "VISUAL IDENTITY",
    "ART DIRECTION",
    "DIGITAL EXPERIENCE",
  ];
  
  const bottomItems = [
    "OVER 100 CUSTOMERS",
    "8 YEARS OF EXPERIENCE",
    "INTERFACES",
    "MOTION",
    "CREATIVE DEVELOPMENT",
  ];
  
  export default function CrossBannerSection() {
    return (
      <section className="relative h-[90vh] overflow-hidden bg-[#050505]">
        {/* RED GLOW BACKGROUND */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(120,20,10,0.45)_0%,rgba(120,20,10,0.18)_25%,transparent_60%)] blur-2xl" />
  
        {/* TOP ORANGE STRIP */}
        <div className="absolute top-[45%] left-1/2 z-20 h-[120px] w-[200vw] -translate-x-1/2 -translate-y-1/2 rotate-[8deg] overflow-hidden bg-[#ff4d0a] shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
          <BannerRow items={topItems} />
        </div>
  
        {/* BOTTOM DARK STRIP */}
        <div className="absolute top-[52%] left-1/2 z-10 h-[120px] w-[200vw] -translate-x-1/2 -translate-y-1/2 -rotate-[6deg] overflow-hidden bg-black/95 blur-[1.5px]">
          <BannerRow items={bottomItems} reverse />
        </div>
      </section>
    );
  }