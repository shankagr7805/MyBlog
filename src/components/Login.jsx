import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState("");

  const login = async (data) => {
    setError(""); //& Basic functionality that after submit errors should be cleared.
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin(data));
        navigate("/");
      }
    } catch (error) {
      setError(error.message); //& error.message isliye likhte hain kyunki error object ke andar message property hoti hai jo error ka reason batati hai.
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="w-full inline-block max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign in to your account.
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have an account?&nbsp;
          <Link className="font-medium text-primary transition-all duration-200 hover:underline">
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)} className="mt-8">
          {" "}
          {/* //& handleSubmit() is an event and treated as a keyword so always use handleSubmit here. */}
          <div className="space-y-5">
            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              {...register("email", {  //& Now, give options.
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
                      value
                    ) || "Email address must be a valid address",
                },
              })} //& Always use register like this and keep the parameter unique like here it is email.
            />
            {errors.email && <p className="text-red-600">{errors.email.message}</p>}
            <Input 
            label="Password" 
            type="password"
            placeholder="Enter your password"
            {...register("password" , {
                required:true,
                validate: {
                  matchPattern: (value) =>
                    /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})/.test(
                      value
                    ) || "Password must contain 8 to 64 characters long and contains a mix of upper and lower case characters, one numeric and one special character",
                },
            })}
            />
            {errors.password && <p className="text-red-600">{errors.password.message}</p>}
            <Button 
            className='w-full'
            >Sign in</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
