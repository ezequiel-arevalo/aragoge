import { Save } from 'lucide-react'

const InformationTab = ({ formData, handleInputChange, handleSave }) => {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-text-primary font-font-title text-h6 mb-2">
          Descripción
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          className="w-full px-4 py-2 rounded-lg border border-bg-primary focus:outline-none focus:border-primary"
          rows={4}
        />
      </div>
      <button onClick={handleSave} className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition-colors">
        <Save className="w-4 h-4" />
        Guardar cambios
      </button>
    </div>
  )
}

export default InformationTab