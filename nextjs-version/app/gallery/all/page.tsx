import InfinitePhotoReel from "../../components/InfinitePhotoReel";
import { allImages } from "../../lib/galleryData";

export default function AllGalleryPage() {
  return (
    <InfinitePhotoReel
      title={<>All Photos</>}
      subtitle="Everything in one place"
      images={allImages}
      cardWidth={360}
      cardRatio={0.9}
    />
  );
}

