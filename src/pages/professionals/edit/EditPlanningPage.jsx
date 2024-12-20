import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchPlanning,
  updatePlanning,
  fetchInitialData,
} from "@/redux/plannings/planningsThunks";
import {
  selectPlanningDetail,
  selectCategories,
  selectLoading,
  selectError,
} from "@/redux/plannings/planningsSelectors";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Input } from "@/components/form/Input";
import { Textarea } from "@/components/form/TextArea";
import { Select } from "@/components/form/Select";
import { useToast } from "@chakra-ui/react";

export const EditPlanningPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const planningDetail = useSelector(selectPlanningDetail);
  const categories = useSelector(selectCategories);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchPlanning(id));
    dispatch(fetchInitialData());
  }, [dispatch, id]);

  useEffect(() => {
    if (planningDetail) {
      setValue("title", planningDetail.title);
      setValue("description", planningDetail.description);
      setValue("synopsis", planningDetail.synopsis);
      setValue("price", planningDetail.price);
      setValue("category_id", planningDetail.category_id);
      setValue("cover_alt", planningDetail.cover_alt);
    }
  }, [planningDetail, setValue]);

  const onSubmit = async (data) => {
    const payload = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      payload.append(key, value);
    });

    if (data.cover && data.cover[0]) {
      payload.append("cover", data.cover[0]);
    }

    try {
      await dispatch(updatePlanning({ id, planningData: payload })).unwrap();
      toast({
        title: "Planificación actualizada",
        description: "La planificación se actualizó correctamente.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
      });
      navigate("/professional");
    } catch (error) {
      // console.error("Error al actualizar la planificación:", error);
      toast({
        title: "Error al actualizar la planificación",
        description: error.message || "No se pudo actualizar la planificación.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
      });
    }
  };

  if (loading) {
    return <div className="text-center py-12">Cargando...</div>;
  }

  if (error) {
    return <div className="text-center py-12 text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate("/professional")}
            className="flex items-center text-white mb-4 hover:underline bg-transparent hover:bg-transparent"
            aria-label="Volver al Panel"
          >
            <ArrowLeft size={20} className="mr-2" />
            Volver al Panel
          </button>
          <h1 className="text-h1 font-title font-bold">Editar planificación</h1>
        </div>
      </div>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow-xl overflow-hidden max-w-3xl mx-auto my-12 p-8"
      >
        <h2 className="text-h2 font-semibold text-gray-800 text-center mb-6">
          Actualiza los detalles de tu planificación
        </h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Input
            register={register}
            name="title"
            label="Título"
            errors={errors}
            inputProps={{
              placeholder: "Ingresa el título de la planificación",
            }}
          />
          <Textarea
            register={register}
            name="description"
            label="Descripción"
            errors={errors}
            textareaProps={{
              placeholder: "Ingresa la descripción de la planificación",
              rows: 4,
            }}
          />
          <Input
            register={register}
            name="synopsis"
            label="Sinopsis"
            errors={errors}
            inputProps={{
              placeholder: "Ingresa la sinopsis",
            }}
          />
          <Input
            register={register}
            name="price"
            label="Precio"
            type="number"
            errors={errors}
            inputProps={{
              placeholder: "Ingresa el precio",
            }}
          />
          <Select
            register={register}
            name="category_id"
            label="Categoría"
            errors={errors}
            options={categories.map((category) => ({
              value: category.id,
              label: category.name,
            }))}
          />

          <div>
            <label
              htmlFor="cover"
              className="block text-sm font-medium text-gray-700"
            >
              Portada
            </label>
            <input
              id="cover"
              type="file"
              name="cover"
              {...register("cover")}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#da1641] focus:border-[#da1641]"
              accept="image/*"
            />
          </div>

          <Input
            register={register}
            id="cover_alt"
            name="cover_alt"
            label="Texto Alternativo de la Portada"
            errors={errors}
            value={planningDetail?.cover_alt || ""}
            inputProps={{
              placeholder: "Texto Alternativo de la Portada",
            }}
          />

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="bg-[#da1641] text-white px-6 py-2 rounded-full hover:bg-[#c30d35] transition duration-300 disabled:opacity-50"
            >
              {loading ? "Actualizando..." : "Actualizar Planificación"}
            </button>
          </div>
        </form>
      </motion.section>
    </div>
  );
};
