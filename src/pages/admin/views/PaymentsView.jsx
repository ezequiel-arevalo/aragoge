import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPayments } from "@/redux/payment/paymentActions";
import Loader from "@/components/Loader";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export const PaymentsView = () => {
  const dispatch = useDispatch();

  // Selecciona los datos de Redux
  const { payments, loading, error } = useSelector((state) => state.payment);
  // Obtiene el token desde localStorage
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    if (token) {
      dispatch(getAllPayments(token)); // Llama a la acción con el token
    }
  }, [dispatch, token]);

  if (loading) return <Loader />;

  if (error)
    return <div className="text-red-500 text-center">Error: {error}</div>;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link
        to="/admin"
        className="text-secondary hover:text-secondary underline flex items-center mb-6"
        aria-label="Volver al panel"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Volver al panel
      </Link>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h1 className="text-3xl font-bold text-gray-800">Lista de Pagos</h1>
          <p className="text-sm text-gray-600 mt-1">
            Consulta y gestiona todos los pagos registrados en la plataforma.
          </p>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID de Pago
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Monto
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID de Subscripción
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {payments.length > 0 ? (
                  payments.map((payment) => (
                    <tr key={payment.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {payment.id}
                      </td>
                      {/* Columna de payment_id */}
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        #{payment.payment_id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${payment.total_price} {/* Ajustado a total_price */}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(payment.created_at).toLocaleDateString()}{" "}
                        {/* Ajustado a created_at */}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span
                          className={`px-2 py-1 rounded-full text-sm font-medium ${
                            payment.payment_status === "Success"
                              ? "bg-green-500 text-white hover:text-white"
                              : "bg-red-500 text-white hover:text-white"
                          }`}
                        >
                          {payment.payment_status}
                        </span>
                      </td>
                      {/* Columna de subscription_id */}
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {payment.subscription_id}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-6 py-4 text-center text-sm text-gray-500"
                    >
                      No hay pagos registrados.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
