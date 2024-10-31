import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSelector, useDispatch } from 'react-redux'
import { updateUserAction, deleteUserAction, fetchRolesAction } from '@/redux/user/userSlice'
import { useUserData } from '@/hooks/useUserData'
import Loader from '@/components/Loader'
import ProfileHeader from './components/ProfileHeader'
import NavigationTabs from './components/NavigationTabs'
import GeneralTab from './components/GeneralTab'
import SecurityTab from './components/SecurityTab'
import InformationTab from './components/InformationTab'
import PublicProfileTab from './components/PublicProfileTab'
import { useToast } from "@chakra-ui/react";
import ConnectionError from '@/components/ui/ConnectionError'

export const ProfilePage = () => {
  const dispatch = useDispatch()
  const toast = useToast();
  const { user, accessToken, roles } = useSelector((state) => state.user)
  const { userData, error } = useUserData(user, accessToken)
  const [activeTab, setActiveTab] = useState('general')
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    description: '',
    rol_id: ''
  })

  useEffect(() => {
    dispatch(fetchRolesAction())
  }, [dispatch])

  useEffect(() => {
    if (userData) {
      setFormData({
        first_name: userData.first_name || '',
        last_name: userData.last_name || '',
        email: userData.email || '',
        description: userData.description || '',
        rol_id: userData.rol_id || ''
      })
    }
  }, [userData])

  console.log('userData:', userData)
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSave = async () => {
    try {
      await dispatch(updateUserAction(formData)).unwrap()
      toast({
        title: "Perfil actualizado",
        description: "Tus datos han sido actualizados correctamente.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: 'bottom-right',
      })
    } catch (error) {
      toast({
        title: "Error al actualizar el perfil",
        description: "No se pudo actualizar el perfil. Por favor, intenta de nuevo.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: 'bottom-right',
      })
    }
  }

  const handleDelete = async () => {
    if (window.confirm("¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.")) {
      try {
        await dispatch(deleteUserAction()).unwrap()
        toast({
          title: "Cuenta eliminada",
          description: "Tu cuenta ha sido eliminada correctamente.",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: 'bottom-right',
        })
        // Redirigir al usuario a la página de inicio o de login
      } catch (error) {
        toast({
          title: "Error al eliminar la cuenta",
          description: "No se pudo eliminar la cuenta. Por favor, intenta de nuevo.",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: 'bottom-right',
        })
      }
    }
  }

  if (error) {
    return (
      <div className='max-w-[500px] mx-auto mt-5'>
        <ConnectionError />
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-bg-primary p-4 md:p-8">
      <div className="max-w-4xl mx-auto bg-bg-secondary rounded-2xl shadow-lg">
        <ProfileHeader userData={userData} />
        <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'general' && (
                <GeneralTab
                  formData={formData}
                  handleInputChange={handleInputChange}
                  handleSave={handleSave}
                  userData={userData}
                  roles={roles}
                />
              )}
              {activeTab === 'security' && (
                <SecurityTab handleDelete={handleDelete} />
              )}
              {activeTab === 'information' && (
                <InformationTab
                  formData={formData}
                  handleInputChange={handleInputChange}
                  handleSave={handleSave}
                />
              )}
              {activeTab === 'public' && (
                <PublicProfileTab userId={userData.id} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}