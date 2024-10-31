import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera } from 'lucide-react';

const ProfileHeader = ({ userData }) => {
  const [imageHover, setImageHover] = useState(false);
  const [imagePreview, setImagePreview] = useState(userData.image_url || 'https://placehold.co/150x150');

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result); // Muestra la imagen seleccionada
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative h-48 rounded-t-2xl bg-gradient-to-r from-primary to-secondary">
      <div className="absolute -bottom-16 left-8 flex items-end">
        <div 
          className="relative"
          onMouseEnter={() => setImageHover(true)}
          onMouseLeave={() => setImageHover(false)}
          onClick={() => document.getElementById('imageUpload').click()} // Abre el input al hacer clic
        >
          <img
            src={imagePreview}
            alt="Profile"
            className="w-[150px] h-[150px] rounded-full border-4 border-bg-secondary object-cover"
          />
          <AnimatePresence>
            {imageHover && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full cursor-pointer"
              >
                <Camera className="w-6 h-6 text-white" />
              </motion.div>
            )}
          </AnimatePresence>
          <input
            type="file"
            id="imageUpload"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleImageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;