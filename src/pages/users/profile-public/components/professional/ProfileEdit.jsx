import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    updateProfessionalProfileAction,
} from "@/redux/professional/professionalActions";
import {
    selectProfessionalLoading,
    selectProfessionalError,
} from "@/redux/professional/professionalSelectors";
import {
    fetchSpecialities,
} from "@/redux/speciality/specialityActions";
import {
    selectAllSpecialities,
    selectSpecialityLoading,
    selectSpecialityError,
} from "@/redux/speciality/specialitySelectors";
import { FileText, Edit3, UserCheck, Loader } from "lucide-react";

export const ProfileEdit = ({ user }) => {
    const dispatch = useDispatch();

    // Estado de Redux
    const specialities = useSelector(selectAllSpecialities);
    const specialityLoading = useSelector(selectSpecialityLoading);
    const specialityError = useSelector(selectSpecialityError);
    const loading = useSelector(selectProfessionalLoading);
    const error = useSelector(selectProfessionalError);

    // Inicializar datos con los valores actuales del perfil
    const [formData, setFormData] = useState({
        description: user?.professional_data?.description || "",
        synopsis: user?.professional_data?.synopsis || "",
        specialty_id: user?.professional_data?.specialty_id || "",
    });

    // Cargar especialidades al montar el componente
    useEffect(() => {
        dispatch(fetchSpecialities());
    }, [dispatch]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateProfessionalProfileAction(formData));
    };

    return (
        <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                <Edit3 className="w-6 h-6 text-indigo-600" />
                Editar Perfil Profesional
            </h1>
            {loading && <p className="text-blue-600">Guardando...</p>}
            {error && <p className="text-red-600">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Campo Especialidad */}
                <div>
                    <label
                        htmlFor="specialty_id"
                        className="block text-sm font-medium text-gray-700"
                    >
                        <span className="flex items-center gap-2">
                            <UserCheck className="w-5 h-5 text-gray-500" />
                            Especialidad:
                        </span>
                    </label>
                    {specialityLoading ? (
                        <div className="mt-2 flex items-center gap-2 text-gray-600">
                            <Loader className="w-5 h-5 animate-spin" />
                            Cargando especialidades...
                        </div>
                    ) : specialityError ? (
                        <p className="text-red-600 mt-2">
                            Error al cargar especialidades.
                        </p>
                    ) : (
                        <select
                            id="specialty_id"
                            name="specialty_id"
                            value={formData.specialty_id}
                            onChange={handleInputChange}
                            className="mt-1 block w-full border border-gray-300 bg-white rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
                            required
                        >
                            <option value="" disabled>
                                Selecciona una especialidad
                            </option>
                            {specialities.map((speciality) => (
                                <option key={speciality.id} value={speciality.id}>
                                    {speciality.name}
                                </option>
                            ))}
                        </select>
                    )}
                </div>

                {/* Campo Descripción */}
                <div>
                    <label
                        htmlFor="description"
                        className="block text-sm font-medium text-gray-700"
                    >
                        <span className="flex items-center gap-2">
                            <FileText className="w-5 h-5 text-gray-500" />
                            Descripción:
                        </span>
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Describe el perfil profesional"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
                        rows="4"
                        required
                    ></textarea>
                </div>

                {/* Campo Sinopsis */}
                <div>
                    <label
                        htmlFor="synopsis"
                        className="block text-sm font-medium text-gray-700"
                    >
                        <span className="flex items-center gap-2">
                            <Edit3 className="w-5 h-5 text-gray-500" />
                            Sinopsis:
                        </span>
                    </label>
                    <textarea
                        id="synopsis"
                        name="synopsis"
                        value={formData.synopsis}
                        onChange={handleInputChange}
                        placeholder="Descripción resumida del perfil profesional"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
                        rows="3"
                        required
                    ></textarea>
                </div>

                {/* Botón Enviar */}
                <div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex justify-center items-center gap-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400"
                    >
                        {loading ? "Guardando..." : "Actualizar Perfil"}
                    </button>
                </div>
            </form>
        </div>
    );
};
