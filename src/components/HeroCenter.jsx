function HeroCenter() {
    return (
      <div className="absolute inset-0 z-0">
  
        {/* IMAGE */}
        <div className="absolute inset-0 bg-[#111111]" />
  
        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-black" />
  
        {/* LIGHT GLOW (optional for later) */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_40%,rgba(255,80,20,0.25),transparent_40%)]" />
  
      </div>
    )
  }
  
  export default HeroCenter