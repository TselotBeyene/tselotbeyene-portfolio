function HeroRight() {
    return (
<aside className="flex h-full flex-col justify-between px-6 py-28 md:px-10 lg:px-12">        
        <div className="flex flex-col justify-between h-full">
          
        <div className="mt-30">
            <div className="mb-10">
              
            <div className="space-y-4 text-base  text-gray-400 font-thin">
               <div className="border-t border-white/10 pt-9">Website Design</div>
                <div className="">Product Design</div>
                <div className="border-white/10 pt-1">Branding &amp; Strategy</div>
              </div>
            </div>

            <div className="border-t border-white/10 pt-6">
            <a 
              href="#" 
              className="inline-block text-white text-xl hover:text-[#ff5a1f] transition-colors underline underline-offset-4"
            >
              How can I help?
            </a>
            </div>
          </div>
  
          <div className="mt-auto pt-16">
            <p className="text-white/70 leading-relaxed max-w-xs">
              I craft digital experiences that blend elegant design with modern technology, specializing in finance and web3 projects.
            </p>
  
            <div className="border-t border-white/10 pt-5 mt-12">
              <p className="uppercase text-xs tracking-[2px] text-white/40 mb-4">Featured In</p>
              <div className="flex gap-6 text-white/30 text-sm">
                <div>AWWWARDS</div>
                <div>FWA</div>
                <div>CSSDA</div>
              </div>
            </div>
          </div>
  
        </div>
      </aside>
    )
  }
  
  export default HeroRight