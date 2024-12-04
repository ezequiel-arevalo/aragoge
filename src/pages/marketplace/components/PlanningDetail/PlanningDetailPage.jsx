import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPlanning } from '@/redux/plannings/planningsThunks'
import { selectPlanningDetail, selectLoading, selectError } from '@/redux/plannings/planningsSelectors'
import { ArrowLeft } from 'lucide-react'
import Loader from '@/components/Loader'
import { PlanningHero } from './PlanningHero'
import { PlanningDescription } from './PlanningDescription'

export const PlanningDetailPage = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const planning = useSelector(selectPlanningDetail)
  const loading = useSelector(selectLoading)
  const error = useSelector(selectError)

  useEffect(() => {
    dispatch(fetchPlanning(id))
  }, [dispatch, id])

  if (loading) {
    return <Loader />
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-red-500 text-xl">Error: {error}</p>
      </div>
    )
  }

  if (!planning) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-gray-500 text-xl">No se encontró la planificación.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <Link to="/marketplace" className="text-[#da1641] hover:text-[#b81235] underline flex items-center mb-6">
          <ArrowLeft className="h-5 w-5 mr-2" />
          Volver al Marketplace
        </Link>

        <PlanningHero planning={planning} />
        <PlanningDescription description={planning.description} />
      </div>
    </div>
  )
}