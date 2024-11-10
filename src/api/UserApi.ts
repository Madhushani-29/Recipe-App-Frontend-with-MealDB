import { useMutation } from "react-query";
import { toast } from "sonner";

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useRegister = () => {
  const registerUserRequest = async (formData: FormData) => {
    // convert a FormData object into a plain JavaScript object
    const formDataObj = Object.fromEntries(formData.entries());
    const response = await fetch(`${VITE_API_BASE_URL}/api/user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formDataObj),
    });

    if (!response.ok) {
      throw new Error(
        "Failed to register user. Check there is an existing account."
      );
    }

    return response.json();
  };

  const {
    mutateAsync: registerUser,
    isLoading,
    isSuccess,
    error,
    reset,
  } = useMutation(registerUserRequest);

  if (isSuccess) {
    toast.success("User registered successfully!");
  }

  if (error) {
    toast.error(error.toString());
    reset();
  }

  return { registerUser, isLoading };
};

export const useLogin = () => {
  const loginUserRequest = async (formData: FormData) => {
    const formDataObj = Object.fromEntries(formData.entries());
    const response = await fetch(`${VITE_API_BASE_URL}/api/user/log-in`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formDataObj),
    });

    if (!response.ok) {
      throw new Error("Please check email and papssword");
    }
    return response.json();
  };

  const {
    mutateAsync: loginUser,
    isLoading,
    isSuccess,
    error,
    reset,
  } = useMutation(loginUserRequest);

  if (isSuccess) {
    toast.success("User logged in successfully!");
  }

  if (error) {
    toast.error(error.toString());
    reset();
  }

  return { loginUser, isLoading };
};
