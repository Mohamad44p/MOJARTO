import { useState, useEffect } from "react";

interface ImageData {
  secure_url: string;
}

interface ImageGalleryProps {
  images: ImageData[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  const [bigImage, setBigImage] = useState<ImageData | null>(null);

  useEffect(() => {
    // Check if images array is not empty or undefined
    if (images && images.length > 0) {
      setBigImage(images[0]);
    }
  }, [images]);

  const handleSmallImageClick = (image: ImageData) => {
    setBigImage(image);
  };

  return (
    <div className="grid gap-4 lg:grid-cols-5">
      <div className="order-last flex gap-4 lg:order-none lg:flex-col">
        {images.map((image: ImageData, idx: number) => (
          <div key={idx} className="overflow-hidden rounded-lg bg-gray-100 shadow-2xl shadow-gray-300">
            <img
              src={image.secure_url}
              alt="Small Photo"
              loading="lazy"
              className="h-full w-full object-cover object-center cursor-pointer"
              width={200}
              height={200}
              onClick={() => handleSmallImageClick(image)}
            />
          </div>
        ))}
      </div>

      <div className="relative overflow-hidden rounded-lg bg-gray-100 lg:col-span-4 dark:shadow-2xl dark:shadow-gray-300">
        <img
          src={bigImage?.secure_url || ''}
          alt="Big Photo"
          loading="lazy"
          className="h-full w-full object-cover object-center"
          width={500}
          height={500}
        />

        <span className="absolute left-0 top-0 rounded-br-lg bg-red-500 px-3 py-1.5 text-sm tracking-wider text-white">SALE</span>
      </div>
    </div>
  );
};

export default ImageGallery;
