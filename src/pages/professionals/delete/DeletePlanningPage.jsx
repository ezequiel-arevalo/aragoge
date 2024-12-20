import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchPlanning,
  deletePlanning,
} from "@/redux/plannings/planningsThunks";
import {
  selectPlanningDetail,
  selectLoading,
} from "@/redux/plannings/planningsSelectors";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@chakra-ui/react";
import Loader from "@/components/Loader";
import { Input } from "@/components/form/Input";
import { Textarea } from "@/components/form/TextArea";
const URL = import.meta.env.VITE_API_KEY;

export const DeletePlanningPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const planningDetail = useSelector(selectPlanningDetail);
  const loading = useSelector(selectLoading);
  const toast = useToast();

  useEffect(() => {
    dispatch(fetchPlanning(id));
  }, [dispatch, id]);

  const handleDelete = async () => {
    try {
      await dispatch(deletePlanning(id)).unwrap();
      toast({
        title: "Planificación eliminada",
        description: "La planificación se eliminó correctamente.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
      });
      navigate("/professional");
    } catch (err) {
      // console.log(err);
      toast({
        title: "Error al eliminar",
        description: err || "No se pudo eliminar la planificación.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
      });
    }
  };

  if (loading) {
    return <Loader aria-label="Cargando planificación..." />;
  }

  if (!planningDetail) {
    return (
      <div className="text-center py-12 text-red-500">
        No se encontraron detalles para esta planificación.
      </div>
    );
  }

  const imageUrl = planningDetail.image_id
    ? `${URL}/plannings/${planningDetail.id}/image`
    : "./default-aragoge.jpg";

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
          <h1 className="text-h1 font-title font-bold">
            Eliminar planificación
          </h1>
        </div>
      </div>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow-xl overflow-hidden p-8 max-w-3xl mx-auto my-12"
      >
        <h2 className="text-h2 font-semibold text-gray-800 text-center mb-4">
          ¿Estás seguro de que deseas eliminar esta planificación?
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Esta acción no se puede deshacer.
        </p>

        <div className="space-y-6">
          <Input
            name="title"
            label="Título"
            errors={{}}
            register={() => {}}
            inputProps={{
              placeholder: "Título de la planificación",
              defaultValue: planningDetail?.title,
              disabled: true,
            }}
          />
          <Textarea
            name="description"
            label="Descripción"
            errors={{}}
            register={() => {}}
            textareaProps={{
              placeholder: "Descripción de la planificación",
              defaultValue: planningDetail?.description,
              rows: 4,
              disabled: true,
            }}
          />
          <Input
            name="synopsis"
            label="Sinopsis"
            errors={{}}
            register={() => {}}
            inputProps={{
              placeholder: "Sinopsis",
              defaultValue: planningDetail?.synopsis,
              disabled: true,
            }}
          />
          <Input
            name="price"
            label="Precio"
            type="number"
            errors={{}}
            register={() => {}}
            inputProps={{
              placeholder: "Precio",
              defaultValue: planningDetail?.price,
              disabled: true,
            }}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 text-left">
              Categoría
            </label>
            <input
              type="text"
              value={planningDetail?.category_name || "Sin categoría"}
              disabled
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#da1641] focus:border-[#da1641]"
            />
          </div>

          <div className="relative w-[280px] h-[210px] mx-auto text-center">
            <img
              src={
                planningDetail.image_id
                  ? `${URL}/plannings/${planningDetail.id}/image`
                  : "./default-aragoge.jpg"
              }
              alt={planningDetail.title}
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 text-left">
              Texto Alternativo de la Portada
            </label>
            <input
              type="text"
              value={
                planningDetail.cover_alt || "Texto alternativo no proporcionado"
              }
              disabled
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#da1641] focus:border-[#da1641]"
            />
          </div>
        </div>

        <div className="flex justify-center space-x-4 mt-8">
          <button
            onClick={() => navigate("/professional")}
            className="bg-gray-300 text-gray-800 px-6 py-2 rounded-full hover:bg-gray-400 transition duration-300"
            aria-label="Cancelar eliminación de la planificación"
          >
            Cancelar
          </button>
          <button
            onClick={handleDelete}
            className="bg-[#da1641] text-white px-6 py-2 rounded-full hover:bg-[#c30d35] transition duration-300"
            aria-label="Confirmar eliminación de la planificación"
          >
            Confirmar Eliminación
          </button>
        </div>
      </motion.section>
    </div>
  );
};
