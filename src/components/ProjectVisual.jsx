export default function ProjectVisual({ project }) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-white">
      <img
        src={project.screenshot}
        alt={`${project.title} website`}
        className="h-full w-full object-cover object-top"
        loading="lazy"
        draggable={false}
      />
    </div>
  );
}
