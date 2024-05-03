import { useState } from "react";
import "./tasksFom.css";
import { Controller, useForm } from "react-hook-form";
import { api } from "../../service/api";

type Task = {
  name: string;
  description: string;
};

export const TasksFom = () => {
  const { handleSubmit, control, reset } = useForm<Task>();

  const [tasks, setTasks] = useState([]);

  const handleForm = async (data: Task) => {
    try {
      await api.post("/task", data);
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = (itemId: any) => {
    const newTasks = tasks.filter((task: any) => task.name !== itemId);
    setTasks(newTasks);
  };

  const handleUpdate = () => {};

  return (
    <div className="container__tasks">
      <form className="form__tasks" onSubmit={handleSubmit(handleForm)}>
        <Controller
          name="name"
          control={control}
          render={({ field: { onChange, value } }) => (
            <input
              type="text"
              name="name"
              value={value}
              onChange={onChange}
              placeholder="Nome da Tarefa"
              required
            />
          )}
        />

        <Controller
          name="description"
          control={control}
          render={({ field: { onChange, value } }) => (
            <input
              type="text"
              name="description"
              value={value}
              onChange={onChange}
              placeholder="descrição da Tarefa"
              required
            />
          )}
        />
        <button type="submit">Salvar</button>
      </form>
      {tasks && (
        <div>
          <h2>Lista de Tarefas</h2>
          <ul className="container__task">
            {tasks.map((item: any, index: number) => (
              <li key={index} className="task__item">
                <div>
                  <h3>Nome: {item.name}</h3>
                  <p>Descrição: {item.description}</p>
                </div>
                <div>
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(item.name)}
                  >
                    Deletar
                  </button>
                  <button className="btn-update" onClick={() => handleUpdate()}>
                    Atualizar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
