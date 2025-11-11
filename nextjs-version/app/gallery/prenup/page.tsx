import InfinitePhotoReel from "../../components/InfinitePhotoReel";
import { prenupImages } from "../../lib/galleryData";

export default function PrenupGalleryPage() {
  return (
    <InfinitePhotoReel
      title={<>Pre-Nup Session</>}
      subtitle="Beautiful moments before the big day"
      images={prenupImages}
      cardWidth={360}
      cardRatio={0.9}
    />
  );
}

