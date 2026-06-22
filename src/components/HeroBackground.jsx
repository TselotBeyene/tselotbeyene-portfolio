import tselot from "../assets/tselot.jpg";
function HeroBackground() {
  return (
    <div className="absolute inset-0 z-0">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${tselot}})`,
          backgroundPosition: "center top",
        }}
      />

      <div className="absolute inset-0 bg-[rgba(0,0,0,0.45)]" />

      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,5,5,0.92)_0%,rgba(5,5,5,0.58)_23%,rgba(5,5,5,0.18)_50%,rgba(5,5,5,0.55)_78%,rgba(5,5,5,0.92)_100%)]" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_18%,rgba(255,91,32,0.28),transparent_18%),radial-gradient(circle_at_63%_52%,rgba(255,35,0,0.12),transparent_25%)]" />

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.18)_0%,rgba(0,0,0,0.08)_30%,rgba(0,0,0,0.35)_100%)]" />
    </div>
  );
}

export default HeroBackground;