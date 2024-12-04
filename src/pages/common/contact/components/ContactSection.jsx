import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { useToast } from '@chakra-ui/react';
import { Input } from '@/components/form/Input';
import { Textarea } from '@/components/form/Textarea';
import { useContactForm } from '@/hooks/useContactForm';

export const ContactSection = () => {
  const toast = useToast();
  const { register, handleSubmit, errors, userData } = useContactForm();

  const onSubmit = async (data) => {
    try {
      toast({
        title: "Mensaje enviado",
        description: "¡Gracias por tu mensaje! Te responderemos pronto.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: 'bottom-right'
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Hubo un problema al enviar tu mensaje. Por favor, inténtalo nuevamente.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: 'bottom-right'
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-xl shadow-lg p-8 sm:p-12"
      >
        <h2 className="text-h2 font-title font-bold text-center text-gray-900 mb-6">
          Envíanos un mensaje
        </h2>
        <p className="text-p text-center text-gray-600 mb-8">
          Llena el formulario y nos pondremos en contacto contigo lo más pronto posible.
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Input
            label="Nombre"
            name="name"
            type="text"
            register={register}
            errors={errors}
            disabled={!!userData}
            inputProps={{
              placeholder: 'Tu nombre completo',
              className: "border-gray-300 rounded-lg shadow-sm focus:ring-[#da1641] focus:border-[#da1641]",
            }}
          />
          <Input
            label="Correo electrónico"
            name="email"
            type="email"
            register={register}
            errors={errors}
            disabled={!!userData}
            inputProps={{
              placeholder: 'Tu correo electrónico',
              className: "border-gray-300 rounded-lg shadow-sm focus:ring-[#da1641] focus:border-[#da1641]",
            }}
          />
          <Textarea
            label="Mensaje"
            name="message"
            register={register}
            errors={errors}
            textareaProps={{
              placeholder: 'Escribe tu mensaje...',
              rows: 6,
              className: "border-gray-300 rounded-lg shadow-sm focus:ring-[#da1641] focus:border-[#da1641]",
            }}
          />
          <div className="flex justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full max-w-xs px-6 py-2 bg-[#da1641] text-white text-base font-semibold rounded-lg shadow-md hover:bg-[#b81235] transition-all duration-300 ease-in-out focus:outline-none"
            >
              <Send className="inline-block mr-2 h-4 w-4" />
              Enviar mensaje
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};