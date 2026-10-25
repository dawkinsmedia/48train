import Image from "next/image";

const photos = [
  {
    src: "/images/workout-lunges.jpg",
    alt: "Men of mixed ages in a kneeling lunge line on the asphalt, focused and working together",
    className: "md:col-span-7 md:row-span-2 min-h-[280px]",
  },
  {
    src: "/images/workout-plank-encouragement.jpg",
    alt: "A man smiles and steadies another during a forearm plank while others watch and cheer",
    className: "md:col-span-5 min-h-[220px]",
  },
  {
    src: "/images/workout-group-selfie.jpg",
    alt: "Five men grinning arm-in-arm after finishing a Saturday workout",
    className: "md:col-span-4 min-h-[220px]",
  },
  {
    src: "/images/workout-warmup-circle.jpg",
    alt: "Men in a circle stretching and laughing in the Heritage Preserve parking lot",
    className: "md:col-span-4 min-h-[220px]",
  },
  {
    src: "/images/workout-ethan-leading.jpg",
    alt: "Men gathered in a circle listening to the leader before the workout begins",
    className: "md:col-span-4 min-h-[220px]",
  },
] as const;

export function PhotoGallery() {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-12 md:auto-rows-[minmax(180px,auto)]">
      {photos.map((photo) => (
        <figure
          key={photo.src}
          className={`relative overflow-hidden rounded-sm bg-charcoal/5 shadow-md ${photo.className}`}
        >
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </figure>
      ))}
    </div>
  );
}
