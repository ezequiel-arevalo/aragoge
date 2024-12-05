import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera } from "lucide-react";

export const ProfileHeader = ({ userData, onCoverChange }) => {
  const [imageHover, setImageHover] = useState(false);
  const [coverPreview, setCoverPreview] = useState(`http://127.0.0.1:8000/api/users/${userData.id}/cover` || "https://placehold.co/150x150");

  const handleCoverImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setCoverPreview(reader.result); // Actualiza la vista previa
      };
      reader.readAsDataURL(file);
      onCoverChange(file); // Pasa la imagen al componente padre
    }
  };

  const triggerFileInput = () => {
    document.getElementById("coverUpload").click();
  };

  return (
    <div className="relative h-48 rounded-t-2xl bg-gradient-to-r from-primary to-secondary">
      <div className="absolute -bottom-16 left-8 flex items-end">
        <div
          className="relative cursor-pointer"
          onMouseEnter={() => setImageHover(true)}
          onMouseLeave={() => setImageHover(false)}
          onClick={triggerFileInput}
        >
          <img
            src={coverPreview}
            alt="Profile"
            className="w-[150px] h-[150px] rounded-full border-4 border-bg-secondary object-cover"
          />
          <AnimatePresence>
            {imageHover && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full"
              >
                <Camera className="w-6 h-6 text-white" />
              </motion.div>
            )}
          </AnimatePresence>
          <input
            type="file"
            id="coverUpload"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleCoverImageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;