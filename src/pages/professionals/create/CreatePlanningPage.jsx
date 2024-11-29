import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { ArrowLeft } from "lucide-react";
import { useForm } from 'react-hook-form';
import { motion } from "framer-motion";
import { fetchInitialData } from "@/redux/plannings/planningsActions";
import { selectPlanningLoading, selectPlanningError } from "@/redux/plannings/planningsSelectors";
import { createPlanning } from "@/redux/plannings/planningsActions";
import { Input } from '@/components/form/Input';
import { Textarea } from '@/components/form/Textarea';

export const CreatePlanningPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const categories = useSelector((state) => state.plannings.categories);
  const loading = useSelector(selectPlanningLoading);
  const error = useSelector(selectPlanningError);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    synopsis: "",
    cover: null,
    cover_alt: "",
    price: "",
    category_id: "",
  });

  useEffect(() => {
    // Fetch categories if not already loaded
    if (categories.length === 0) {
      dispatch(fetchInitialData());
    }
  }, [dispatch, categories.length]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? files[0] : value, // Correctly handle file input
    }));
  };

  // Correct onSubmit function to handle form data and files
  const onSubmit = async (data) => {
    // Create a new FormData object to handle both text and file data
    const payload = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      payload.append(key, value); // Append text data
    });

    // Add file data manually (if exists)
    if (formData.cover) {
      payload.append("cover", formData.cover); // Append the image file
    }

    try {
      await dispatch(createPlanning(payload)).unwrap();
      toast({
        title: "Planificación creada",
        description: "La planificación se creó correctamente.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
      });
      navigate("/professional");
    } catch (err) {
      console.error("Error al crear la planificación:", err);
      toast({
        title: "Error al crear la planificación",
        description: err.message || "No se pudo crear la planificación.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#da1641] to-[#ff6b6b] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate("/professional")}
            className="flex items-center text-white mb-4 hover:underline bg-transparent hover:bg-transparent"
            aria-label="Volver al Panel de Profesional"
          >
            <ArrowLeft size={20} className="mr-2" />
            Volver al Panel
          </button>
          <h1 className="text-h1 font-title font-bold">Crear Nueva Planificación</h1>
        </div>
      </div>

      {/* Form Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow-xl overflow-hidden p-8 max-w-3xl mx-auto mt-8"
      >
        <h2 className="text-h2 font-semibold text-gray-800 text-center mb-6">
          Ingresa los detalles de tu nueva planificación
        </h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Input
            register={register}
            name="title"
            label="Título"
            errors={errors}
            inputProps={{
              placeholder: 'Ingresa el título de la planificación'
            }}
          />
          <Textarea
            register={register}
            name="description"
            label="Descripción"
            errors={errors}
            textareaProps={{
              placeholder: 'Ingresa la descripción de la planificación',
              rows: 4
            }}
          />
          <Input
            register={register}
            name="synopsis"
            label="Sinopsis"
            errors={errors}
            inputProps={{
              placeholder: 'Ingresa la sinopsis'
            }}
          />
          <Input
            register={register}
            name="price"
            label="Precio"
            type="number"
            errors={errors}
            inputProps={{
              placeholder: 'Ingresa el precio'
            }}
          />

          {/* Categoría: Usando un select estándar */}
          <div>
            <label htmlFor="category_id" className="block text-sm font-medium text-gray-700">
              Categoría
            </label>
            <select
              id="category_id"
              {...register('category_id', { required: 'La categoría es obligatoria' })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#da1641] focus:border-[#da1641]"
            >
              <option value="">Selecciona una categoría</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.category_id && <p className="text-red-500">{errors.category_id.message}</p>}
          </div>

          {/* Portada */}
          <div>
            <label htmlFor="cover" className="block text-sm font-medium text-gray-700">
              Portada
            </label>
            <input
              id="cover"
              type="file"
              name="cover"
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#da1641] focus:border-[#da1641]"
              accept="image/*"
            />
          </div>

          {/* Texto alternativo de la portada */}
          <Input
            register={register}
            id="cover_alt"
            name="cover_alt"
            label="Alt de imagen"
            errors={errors}
            value={formData.cover_alt}
            onChange={handleChange}
            inputProps={{
              placeholder: 'Texto Alternativo de la Portada'
            }}
          />

          {/* Botón de envío */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="bg-[#da1641] text-white px-6 py-2 rounded-full hover:bg-[#c30d35] transition duration-300 disabled:opacity-50"
            >
              {loading ? "Creando..." : "Crear Planificación"}
            </button>
          </div>
        </form>
      </motion.section>
    </div>
  );
};