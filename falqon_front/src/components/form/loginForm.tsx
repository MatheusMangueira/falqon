import { useState } from "react";
import "./loginForm.css";
import { api } from "../../service/api";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";

type Login = {
  email: string;
  password: string;
};

export const LoginForm = () => {
  const { handleSubmit, control } = useForm<Login>();

  const navigate = useNavigate();

  const handleSubmitLogin = async (data: Login) => {
    const { email, password } = data;

    console.log("data", data);

    console.log(email, password);
    try {
      const response = await api.post("/login", { email, password });

      if (response.status === 200) {
        console.log("Login bem-sucedido!", response.data);

        const token = response.data.token;

        localStorage.setItem("token", token);
        navigate("/tasks");
      }
    } catch (error) {
      console.log("Erro ao tentar fazer login", error);
    }
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit(handleSubmitLogin)}>
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <Controller
            name="email"
            control={control}
            render={({ field: { onChange, value } }) => (
              <input
                type="text"
                id="email"
                value={value}
                onChange={onChange}
                required
              />
            )}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>

          <Controller
            name="password"
            control={control}
            render={({ field: { onChange, value } }) => (
              <input
                type="password"
                id="password"
                value={value}
                onChange={onChange}
                required
              />
            )}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
