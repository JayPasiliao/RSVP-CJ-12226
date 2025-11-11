import InfinitePhotoReel from "../../components/InfinitePhotoReel";
import { proposalImages } from "../../lib/galleryData";

export default function ProposalGalleryPage() {
  return (
    <InfinitePhotoReel
      title={<>The Proposal</>}
      subtitle="Our special moment captured forever"
      images={proposalImages}
      cardWidth={360}
      cardRatio={0.9}
    />
  );
}

