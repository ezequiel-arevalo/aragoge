/**
 * @file Textarea.jsx
 * Componente personalizado de área de texto que utiliza Chakra UI y `react-hook-form` para manejar formularios.
 */

import { Textarea as ChakraTextarea, FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/react';

/**
 * Componente `Textarea` personalizado que utiliza Chakra UI para la presentación y `react-hook-form` para la validación.
 * 
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {Function} props.register - Función de `react-hook-form` para registrar el campo de formulario.
 * @param {string} props.name - El nombre del campo de área de texto.
 * @param {Object} props.errors - Objeto de errores proveniente de `react-hook-form`.
 * @param {string} [props.label] - Etiqueta para el campo de área de texto.
 * @param {Object} [props.textareaProps={}] - Propiedades adicionales para el área de texto.
 * @param {boolean} [props.disabled=false] - Indica si el campo de área de texto está deshabilitado.
 * 
 * @returns {JSX.Element} El componente de área de texto personalizado con validación de formularios.
 * 
 * @example
 * return (
 *   <Textarea 
 *     register={register} 
 *     name="description" 
 *     errors={errors} 
 *     label="Descripción" 
 *   />
 * )
 */
export const Textarea = ({ register, name, errors, label, textareaProps = {}, disabled = false }) => {
    return (
      <FormControl isInvalid={!!errors[name]} className="mb-4">
        {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
        <ChakraTextarea
          disabled={disabled}
          id={name}
          {...register(name, { required: `El ${label} es obligatorio!` })}
          {...textareaProps}
          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md min-h-[100px] max-h-[200px]"
        />
        {errors[name] && <FormErrorMessage>{errors[name].message}</FormErrorMessage>}
      </FormControl>
    );
};
