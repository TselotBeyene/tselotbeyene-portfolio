import portrait from "../assets/tselot_b.png";

export default function HeroPortrait({
  panRef,
  scaleRef,
  imageX = 0,
  imageY = -280,
  imageScale = 1,
  imgId,
  frameId,
  className = "",
}) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Outer: position + pan only (stable centering). */}
      <div
        ref={panRef}
        id={frameId}
        className="absolute left-[50%] top-[50%] h-[100dvh] w-[min(70vw,340px)] bg-transparent max-sm:w-[min(112vw,520px)] sm:w-[min(48vw,460px)] lg:h-[100vh] lg:w-[38vw] lg:min-w-[420px] lg:max-w-[600px]"
        style={{
          transform: `translate3d(-50%, -50%, 0) translate3d(${imageX}px, ${imageY}px, 0)`,
          willChange: "transform",
        }}
      >
        {/* Inner: zoom only, origin locked to center — avoids pan/zoom fighting. */}
        <div
          ref={scaleRef}
          className="flex h-full w-full items-center justify-center bg-transparent"
          style={{
            transform: `scale(${imageScale})`,
            transformOrigin: "center center",
            willChange: "transform",
          }}
        >
          <img
            id={imgId}
            src={portrait}
            alt="Portrait"
            // object-contain keeps the cutout natural; lighten drops near-black
            // pixels from the PNG into the page so the opaque image "box" disappears.
            className="pointer-events-none h-full w-full select-none object-contain object-[center_20%] mix-blend-lighten lg:object-center"
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
}
