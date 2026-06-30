import portrait from "../assets/tselot_b.png";

export default function HeroPortrait({
  imageX = 0,
  imageY = -280,
  imageScale = 1,
  imgId,
  className = "",
}) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <div
        className="absolute left-[50%] top-[50%] h-[100vh] w-[32vw] min-w-[360px] max-w-[520px] overflow-hidden"
        style={{
          transform: `translate(-50%, -50%) translate(${imageX}px, ${imageY}px) scale(${imageScale})`,
          transformOrigin: "center center",
        }}
      >
        <img
          id={imgId}
          src={portrait}
          alt="Portrait"
          className="h-full w-full object-cover object-center select-none pointer-events-none"
        />
      </div>
    </div>
  );
}
