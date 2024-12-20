import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, User } from "lucide-react";
const URL = import.meta.env.VITE_API_KEY;

export const ProfileHeader = ({ userData, onCoverChange }) => {
  const [imageHover, setImageHover] = useState(false);
  const [coverPreview, setCoverPreview] = useState(
    `${URL}/users/${userData.id}/cover` || "https://placehold.co/150x150"
  );

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
          <div className="w-[150px] h-[150px] rounded-full bg-gray-100 flex items-center justify-center mx-auto">
            {userData.image_id ? (
              <img
                src={`${URL}/users/${userData.id}/cover`}
                alt={`${userData.first_name} ${userData.last_name}`}
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <User size={64} className="text-gray-400" />
            )}
          </div>
          <AnimatePresence>
            {imageHover && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full"
              >
                <Camera size={64} className="text-white" />
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
