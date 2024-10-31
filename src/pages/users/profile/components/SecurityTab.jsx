import { Trash2 } from 'lucide-react'

const SecurityTab = ({ handleDelete }) => {
  return (
    <div className="space-y-6">
      <div className="p-4 bg-bg-primary rounded-lg">
        <h3 className="font-font-title text-h5 text-text-primary mb-2">
          Eliminar cuenta
        </h3>
        <p className="text-text-disable font-font-text mb-4">
          Advertencia: Esta acción es irreversible. Todos tus datos serán eliminados permanentemente.
        </p>
        <button onClick={handleDelete} className="flex items-center gap-2 px-4 py-2 bg-destructive text-white rounded-lg hover:bg-destructive-dark transition-colors">
          <Trash2 className="w-4 h-4" />
          Eliminar cuenta
        </button>
      </div>
    </div>
  )
}

export default SecurityTab