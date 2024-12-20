import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserDetails } from "@/services/userService";
import ConnectionError from "@/components/ui/ConnectionError";
import HeaderSection from "./components/HeaderSection";
import TabsSection from "./components/TabsSection";
import ContentSection from "./components/ContentSection";
import Loader from "@/components/Loader";

export const ProfilePublicPage = () => {
  const { id } = useParams(); // Obtener el parámetro "id" de la URL
  const [user, setUser] = useState(null); // Estado para almacenar los datos del usuario
  const [error, setError] = useState(null); // Estado para manejar errores
  const [activeTab, setActiveTab] = useState("info"); // Estado para la pestaña activa

  // Efecto para obtener los detalles del usuario al cargar el componente o cambiar el ID
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUserDetails(id); // Llamada al servicio para obtener los detalles del usuario
        setUser(data.data); // Actualizar el estado con los datos del usuario
      } catch (err) {
        setError(err.message); // Manejar errores
      }
    };
    fetchUser();
  }, [id]);

  // Mostrar mensaje de error si ocurre un problema de conexión
  if (error) {
    return (
      <div className="max-w-[500px] mx-auto mt-5">
        <ConnectionError />
      </div>
    );
  }

  // Mostrar un indicador de carga mientras se obtienen los datos del usuario
  if (!user) return <Loader />;

  // Verificar si el usuario tiene el rol de profesional basado en el "rol_id"
  const isProfessional = user.rol_id === 3;

  return (
    <>
      {/* Sección de encabezado */}
      <HeaderSection user={user} />

      {/* Sección principal con las pestañas y el contenido */}
      <div className="container mx-auto px-4 py-8">
        <TabsSection
          activeTab={activeTab}
          user={user}
          setActiveTab={setActiveTab}
          isProfessional={isProfessional}
        />
        <ContentSection
          activeTab={activeTab}
          user={user}
          isProfessional={isProfessional}
        />
      </div>
    </>
  );
};
