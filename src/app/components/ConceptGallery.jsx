import TiltedCard from "./TiltedCard";

const concepts = [
  {
    id: 1,
    title: "Atrium Light Study",
    subtitle: "Daylight choreography",
    img: "/img3.png",
  },
  {
    id: 2,
    title: "Courtyard Gradient",
    subtitle: "Soft indoor–outdoor edge",
    img: "/img2.jpg",
  },
  {
    id: 3,
    title: "Skybridge Volume",
    subtitle: "Floating connection",
    img: "/img1.jpg",
  },
];

export default function ConceptGallery() {
  return (
    <section className="relative">
      <div className="container flex flex-col gap-12">
        <div className="max-w-[40rem]">
          <p className="mb-3 text-[0.75rem] tracking-[0.25em] uppercase opacity-60">
            INTERACTIVE CONCEPT GALLERY
          </p>
          <h2 className="mb-4 text-[clamp(2rem,4vw,3.2rem)]">
            Spatial Studies in Motion
          </h2>
          <p className="max-w-[32rem] opacity-70">
            Hover and explore micro-studies of light, massing, and material.
            Each frame responds in 3D to your cursor.
          </p>
        </div>

        <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {concepts.map((concept) => (
            <div
              key={concept.id}
              className="h-[220px] md:h-[260px]"
            >
              <TiltedCard
                imageSrc={concept.img}
                altText={concept.title}
                captionTitle={concept.title}
                captionSubtitle={concept.subtitle}
                containerHeight="100%"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
