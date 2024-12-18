import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useUserData } from "@/hooks/useUserData";

export const useContactForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const { user, accessToken } = useSelector((state) => ({
    user: state.user.user,
    accessToken: state.user.accessToken,
  }));

  const { userData } = useUserData(user, accessToken);

  useEffect(() => {
    if (userData) {
      setValue("name", `${userData.first_name} ${userData.last_name}`, {
        shouldValidate: true,
      });
      setValue("email", userData.email, { shouldValidate: true });
    }
  }, [userData, setValue]);

  return {
    register,
    handleSubmit,
    errors,
    submitted,
    userData,
    reset,
  };
};
