import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import "../auth/auth.css";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const LoginForm = ({ onSubmit, errorMessage }) => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    const storedPassword = localStorage.getItem("password");
    if (storedEmail && storedPassword) {
      setValue("email", storedEmail);
      setValue("password", storedPassword);
      setChecked(true);
    }
  }, [setValue]);

  const handleRememberMe = () => {
    const email = getValues("email") ?? "";
    const password = getValues("password") ?? "";

    if (checked && password && email) {
      localStorage.removeItem("email");
      localStorage.removeItem("password");
    } else {
      localStorage.setItem("email", email);
      localStorage.setItem("password", password);
    }
  };

  return (
    <div className="flex flex-row min-h-screen justify-center items-center">
      <div className="area">
        <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="w-96	mx-auto ">
        <h2 className="text-4xl text-white font-semibold mb-3 text-center">
          Blog Post App
        </h2>
        <div className="mb-3">
          <label className="block mb-2 text-base font-medium text-gray-900 text-white">
            Email
          </label>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-100 focus:ring-primary-100 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="example@gmail.com"
            required
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>
        <div className="mb-3">
          <label className="block mb-2 text-base font-medium text-gray-900 text-white">
            Password
          </label>
          <input
            type="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            {...register("password")}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>
        <div className="flex items-center mb-3">
          <input
            id="default-checkbox"
            type="checkbox"
            checked={checked}
            onClick={() => handleRememberMe()}
            onChange={(e) => setChecked(!checked)}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor="default-checkbox"
            className="ms-2 text-sm font-medium text-white"
          >
            Remember Me
          </label>
        </div>
        {errorMessage && (
          <p className="mb-3 text-red-500 text-sm">{errorMessage}</p>
        )}
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
