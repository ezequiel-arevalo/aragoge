import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSelector, useDispatch } from 'react-redux'
import { updateUserAction, deleteUserAction, logoutUserAction } from '@/redux/user/userActions'
import { fetchRolesAction } from '@/redux/role/roleActions'
import { selectRoles } from '@/redux/role/roleSelectors'
import { useUserData } from '@/hooks/useUserData'
import { useNavigate } from 'react-router-dom'
import Loader from '@/components/Loader'
import ProfileHeader from './components/ProfileHeader'
import NavigationTabs from './components/NavigationTabs'
import GeneralTab from './components/GeneralTab'
import SecurityTab from './components/SecurityTab'
import InformationTab from './components/InformationTab'
import PublicProfileTab from './components/PublicProfileTab'
import { useToast } from "@chakra-ui/react"

export const ProfilePage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const toast = useToast()
  const { user, accessToken } = useSelector((state) => state.user)
  const roles = useSelector(selectRoles)
  const { userData, error } = useUserData(user, accessToken)
  const [activeTab, setActiveTab] = useState('general')
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    description: '',
    synopsis: '',
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
        synopsis: userData.synopsis || '',
        rol_id: userData.rol_id || ''
      })
    }
  }, [userData])

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

      // Si el rol ha cambiado, cerrar sesión y redirigir a login
      if (formData.rol_id !== userData.rol_id) {
        await dispatch(logoutUserAction()).unwrap()
        toast({
          title: "Perfil actualizado",
          description: "Por favor, inicia sesión nuevamente para convertite en un profesional",
          status: "info",
          duration: 5000,
          isClosable: true,
          position: 'bottom-right',
        })
        navigate('/login')
      }
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
      navigate('/login')
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