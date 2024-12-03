import { Mail, User, Calendar, Briefcase, Award, FileText } from 'lucide-react'

export const Information = ({ user, isProfessional }) => {
    return (
        <div className="p-6 md:p-8">
            <div className="grid md:grid-cols-2 gap-8">
                {/* Columna de información del usuario */}
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Perfil de Usuario</h2>
                    <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                            <div className="bg-blue-100 p-2 rounded-full">
                                <Mail className="h-5 w-5 text-blue-600" />
                            </div>
                            <span className="text-gray-600">{user.email || 'No disponible'}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="bg-green-100 p-2 rounded-full">
                                <User className="h-5 w-5 text-green-600" />
                            </div>
                            <span className="text-gray-600">{user.rol_name || 'No disponible'}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="bg-purple-100 p-2 rounded-full">
                                <Calendar className="h-5 w-5 text-purple-600" />
                            </div>
                            <span className="text-gray-600">
                                Miembro desde {new Date(user.created_at).toLocaleDateString() || 'No disponible'}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Columna de información profesional o mensaje de usuario no profesional */}
                <div className="space-y-6">
                    {isProfessional ? (
                        <>
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">Información Profesional</h2>
                            <div className="space-y-4">
                                <div>
                                    <div className="flex items-center space-x-2 mb-2">
                                        <Award className="h-5 w-5 text-yellow-500" />
                                        <span className="font-semibold text-gray-700">Especialidad</span>
                                    </div>
                                    <p className="text-gray-600 ml-7">{user.professional_data.specialty_name || 'No especificada'}</p>
                                </div>
                                <div>
                                    <div className="flex items-center space-x-2 mb-2">
                                        <FileText className="h-5 w-5 text-indigo-500" />
                                        <span className="font-semibold text-gray-700">Descripción</span>
                                    </div>
                                    <p className="text-gray-600 ml-7">{user.professional_data.description || 'No disponible'}</p>
                                </div>
                                <div>
                                    <div className="flex items-center space-x-2 mb-2">
                                        <Briefcase className="h-5 w-5 text-red-500" />
                                        <span className="font-semibold text-gray-700">Resumen</span>
                                    </div>
                                    <p className="text-gray-600 ml-7">{user.professional_data.synopsis || 'No disponible'}</p>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="flex items-center justify-center h-full">
                            <div className="text-center">
                                <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                <p className="text-gray-500">Este usuario no ofrece servicios profesionales.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
