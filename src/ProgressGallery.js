
import React, { useState, useEffect } from "react";

const ProgressGallery = ({ user }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem(`progressImages_${user}`);
    if (saved) setImages(JSON.parse(saved));
  }, [user]);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const updated = [...images, { date: new Date().toISOString().split("T")[0], src: reader.result }];
      setImages(updated);
      localStorage.setItem(`progressImages_${user}`, JSON.stringify(updated));
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-4 rounded-xl shadow space-y-4">
      <h2 className="text-xl font-bold text-center">Progress Gallery</h2>
      <input type="file" accept="image/*" onChange={handleUpload} className="w-full p-2 border rounded" />
      <div className="grid grid-cols-2 gap-2">
        {images.map((img, i) => (
          <div key={i} className="text-center text-xs">
            <img src={img.src} alt={`Week ${i * 6}`} className="rounded border mb-1" />
            <p>{img.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressGallery;
