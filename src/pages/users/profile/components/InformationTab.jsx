import { Link } from "react-router-dom";

const InformationTab = () => {
  return (
    <div className="space-y-6">
      <Link
        to={`/subscriptions/`}
        className="inline-block px-6 py-3 bg-primary text-white hover:text-white rounded-lg hover:bg-secondary transition-colors"
      >
        Mis Subscripciones
      </Link>
    </div>
  )
}

export default InformationTab