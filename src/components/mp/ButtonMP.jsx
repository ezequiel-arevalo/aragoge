import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import { useState } from 'react';

export const ButtonMP = (props) => {
    const [preferenceId, setPreferenceId] = useState(null);

    // Inicializar MercadoPago
    initMercadoPago(import.meta.env.VITE_MP_PUBLIC_KEY, {
        locale: 'es-AR',
    });

    const createPreference = async () => {
        const accessToken = localStorage.getItem('accessToken');
        try {
            // Hacer la solicitud al backend
            const response = await fetch(`${import.meta.env.VITE_API_KEY}/payments/create_preference`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    planning: props.planningId,
                    payment_id: props.paymentId,
                }),
            });

            // Verificar si la respuesta es exitosa
            if (!response.ok) {
                const errorMessage = await response.text();
                console.error("Error en la respuesta del servidor:", errorMessage);
                return null;
            }

            // Procesar la respuesta
            const data = await response.json();
            console.log("Respuesta del servidor:", data);

            return data.id; // Asume que el backend devuelve { id: 'preferenceId' }
        } catch (error) {
            console.error("Error al crear la preferencia:", error.message);
            return null;
        }
    };

    // Manejar la compra
    const handleBuy = async () => {
        const preference_Id = await createPreference();
        if (preference_Id) {
            setPreferenceId(preference_Id);
        }
    };

    return (
        <div>
            <button onClick={handleBuy}>Pagar suscripción</button>
            {preferenceId && (
                <Wallet
                    initialization={{ preferenceId: preferenceId }}
                    customization={{ texts: { valueProp: 'smart_option' } }}
                />
            )}
        </div>
    );
};
