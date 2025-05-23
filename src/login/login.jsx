import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import * as yup from "yup";
import ErrorBoundary from "../hooks/errorBoundery";
import { useAuth } from "../context/useAuth";

const loginSchema = yup.object({
  email: yup
    .string()
    .matches(
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      "Utilize los simbolos correctos en el campo."
    )
    .required("El correo es requerido.")
    .typeError("email must be a string."),
  password: yup.string().required("Constraseña es requerida."),
});

export default function Login() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const [error, setErrorState] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { login_user } = useAuth();

  const onSubmit = async (data) => {
    setLoading(true);
    setErrorState("");
    try {
      await loginSchema.validate(data, { abortEarly: false });
      await login_user(data.email, data.password);
    } catch (err) {
      if (err.name === "ValidationError") {
        err.inner.forEach((validationError) => {
          setError(validationError.path, {
            type: "manual",
            message: validationError.message,
          });
        });
      } else {
        setErrorState("Correo o constraña incorrecta.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <ErrorBoundary>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            {error && <div className="text-red-500 text-sm">{error}</div>}

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <input
                      {...field}
                      id="email"
                      type="email"
                      autoComplete="email"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                    />
                  )}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-900"
                >
                  Password
                </label>
              </div>

              <div className="mt-2 relative">
                <Controller
                  name="password"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <input
                      {...field}
                      id="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      className="block w-full rounded-md bg-white px-3 py-1.5 pr-10 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                    />
                  )}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-2 flex items-center text-sm text-gray-600 hover:text-indigo-600"
                >
                  <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                </button>
                {errors.password && (
                  <p className="absolute text-red-500 text-sm mt-1 top-full">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-12">
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow hover:bg-indigo-500 focus:outline-indigo-600"
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </ErrorBoundary>
  );
}
