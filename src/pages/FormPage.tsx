import { useForm, SubmitHandler } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorMessage from "../components/ErrorMessage";
import myImage from "../assets/react.svg";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const formSchema = z.object({
  email: z.string().email({
    message: "Invalid email",
  }),
  password: z.string(),
});

const FormPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (data) => {
    console.log(data);
    // const response = await fetch("http://localhost:3000/api/login", {
    //   method: "POST",
    //   body: JSON.stringify(data),
    // });
    const payload = {
      email: data.email,
      password: data.password,
    };
    try {
      const res = await axios.post(
        "https://mock-api.arikmpt.com/api/user/login",
        payload
      );
      console.log(res);

      localStorage.setItem("token", res.data.data.token);
      navigate("/about");
    } catch (error: any) {
      console.log(error);
      alert(error.response.data.errors);
    }
  };

  return (
    <>
      <div>
        <button onClick={() => navigate(-1)}>Back</button>
        <img src={myImage} alt="" />
        <ErrorMessage message="This is an error message" />
        <form onSubmit={handleSubmit(onSubmit)} action="">
          <div className="space-x-2">
            <input className="border" {...register("email")} type="text" />
            {errors.email && (
              <span style={{ color: "red" }}>{errors.email.message}</span>
            )}

            <input
              className="border"
              {...register("password")}
              type="password"
            />
            {errors.password && (
              <span style={{ color: "red" }}>{errors.password.message}</span>
            )}

            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default FormPage;
