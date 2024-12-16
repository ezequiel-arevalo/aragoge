import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import { useState } from 'react'

const [preferenceId, setPreferenceId] = useState(null)

const createPreference = async () => {
    const planning = {
        title: planificacion.title,
        quantity: 1,
        price: planificacion.price,
    }

    const {id} = planning.data

    return id
}

initMercadoPago(import.meta.env.VITE_MP_PUBLIC_KEY,{
    locale: 'es-AR',
});

const handleBuy = async () => {
    const preferenceId = await createPreference()
    setPreferenceId(preferenceId)
}
export const ButtonMP = (planificacion)=> {
    
    
    return (
        <Wallet initialization={{ preferenceId: '<PREFERENCE_ID>' }} customization={{ texts:{ valueProp: 'smart_option'}}} />
    )
}