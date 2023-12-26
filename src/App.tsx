import "./App.css";
import { useForm, SubmitHandler } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorMessage from "./components/ErrorMessage";
import myImage from "./assets/react.svg";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2",
  }),
  email: z.string().email({
    message: "Invalid email",
  }),
});

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = (data) =>
    console.log(data);

  return (
    <>
      <div>
        <img src={myImage} alt="" />
        <ErrorMessage message="This is an error message" />
        <form onSubmit={handleSubmit(onSubmit)} action="">
          <div className="space-x-2">
            <input className="border" {...register("name")} type="text" />
            {errors.name && (
              <span style={{ color: "red" }}>{errors.name.message}</span>
            )}

            <input className="border" {...register("email")} type="text" />
            {errors.email && (
              <span style={{ color: "red" }}>{errors.email.message}</span>
            )}

            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default App;
