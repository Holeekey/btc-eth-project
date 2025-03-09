"use client";

import { useState } from "react";
import { InputBase } from "~~/components/scaffold-eth";

const Create = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [goal, setGoal] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí puedes manejar el envío del formulario, por ejemplo, enviando los datos a una API
    console.log({ title, description, category, goal });
  };

  return (
    <div className="flex items-center flex-col flex-grow pt-10">
      <h2 className="text-center">
        <span className="block text-4xl font-bold">Crear recaudación</span>
      </h2>
      <form onSubmit={handleSubmit} className="w-full max-w-lg mt-10">
        <div className="mb-4">
          <label className="block text-white-700 text-sm font-bold mb-2" htmlFor="title">
            Título de la recaudación
          </label>
          <InputBase name="title" value={title} onChange={setTitle} />
        </div>
        <div className="mb-4">
          <label className="block text-white-700 text-sm font-bold mb-2" htmlFor="description">
            Descripción
          </label>
          <InputBase name="description" value={description} onChange={setDescription} />
        </div>
        <div className="mb-4">
          <label className="block text-white-700 text-sm font-bold mb-2" htmlFor="category">
            Categoría
          </label>
          <InputBase name="category" value={category} onChange={setCategory} />
        </div>
        <div className="mb-4">
          <label className="block text-white-700 text-sm font-bold mb-2" htmlFor="goal">
            Meta de recaudación
          </label>
          <InputBase name="goal" value={goal} onChange={setGoal} />
        </div>
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Crear
          </button>
        </div>
      </form>
    </div>
  );
};

export default Create;
