"use client";

import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAccount } from "wagmi";
import { EtherInput, InputBase } from "~~/components/scaffold-eth";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

const Create = () => {
  const [title, setTitle] = useState("");
  const [user, setUser] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [category, setCategory] = useState("");
  const [goal, setGoal] = useState("");

  const { isConnected, address } = useAccount();

  const { writeContractAsync } = useScaffoldWriteContract({ contractName: "CreateFunding" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isConnected) {
      toast.error("Por favor, conecta tu wallet para crear una recaudación.");
      return;
    }
    // VALIDACIONES DEL TITULO
    if (!title) {
      toast.error("Por favor, introduce un título.");
      return;
    }
    if (title.length > 30) {
      toast.error("El título no puede tener más de 30 caracteres.");
      return;
    }
    // VALIDACIONES DEL USUARIO
    if (!user) {
      toast.error("Por favor, introduce un alias de creador.");
      return;
    }
    if (user.length > 15) {
      toast.error("El alias no puede tener más de 15 caracteres.");
      return;
    }
    // VALIDACIONES DE LA DESCRIPCION CORTA
    if (!shortDescription) {
      toast.error("Por favor, introduce una descripción corta.");
      return;
    }
    if (shortDescription.length > 70) {
      toast.error("La descripción no puede tener más de 50 caracteres.");
      return;
    }
    // VALIDACIONES DE LA DESCRIPCION COMPLETA
    if (!longDescription) {
      toast.error("Por favor, introduce una descripción completa.");
      return;
    }
    if (longDescription.length > 200) {
      toast.error("La descripción no puede tener más de 100 caracteres.");
      return;
    }
    // VALIDACIONES DE LA CATEGORIA
    if (!category) {
      toast.error("Por favor, introduce una categoría.");
      return;
    }
    if (category.length > 15) {
      toast.error("La categoría no puede tener más de 20 caracteres.");
      return;
    }
    // VALIDACIONES DE LA META
    if (parseFloat(goal) <= 0) {
      toast.error("La meta de recaudación debe ser mayor a cero (0)");
      return;
    }

    writeContractAsync({
      functionName: "createFunding",
      args: [title, user, shortDescription, longDescription, category, BigInt(parseInt(goal)), address],
    })
      .then(() => {
        toast.success("Recaudación creada con éxito!");
      })
      .catch(e => {
        toast.error("Error al crear la recaudación.");
        console.error(e);
      });
  };

  return (
    <div className="flex items-center flex-col flex-grow pt-10">
      <ToastContainer aria-label={""} />
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
          <label className="block text-white-700 text-sm font-bold mb-2" htmlFor="title">
            Alias del creador
          </label>
          <InputBase name="title" value={user} onChange={setUser} />
        </div>
        <div className="mb-4">
          <label className="block text-white-700 text-sm font-bold mb-2" htmlFor="description">
            Descripción corta
          </label>
          <InputBase name="description" value={shortDescription} onChange={setShortDescription} />
        </div>
        <div className="mb-4">
          <label className="block text-white-700 text-sm font-bold mb-2" htmlFor="description">
            Descripción completa
          </label>
          <InputBase name="description" value={longDescription} onChange={setLongDescription} />
        </div>
        <div className="mb-4">
          <label className="block text-white-700 text-sm font-bold mb-2" htmlFor="category">
            Categoría
          </label>
          <InputBase name="category" value={category} onChange={setCategory} />
        </div>
        <div className="mb-4">
          <label className="block text-white-700 text-sm font-bold mb-2" htmlFor="goal">
            Meta de recaudación (ETH)
          </label>
          <EtherInput name="goal" value={goal} onChange={setGoal} />
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
