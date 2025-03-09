"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

const fundraisingsData: {
  id: string;
  title: string;
  description: string;
  goal: number;
  current: number;
  category: string;
}[] = [
  {
    id: "1",
    title: "GetToTheChain",
    description: "Ayuda a nuestro videojuego a llegar a la blockchain",
    goal: 100,
    current: 50,
    category: "Proyecto",
  },
  {
    id: "2",
    title: "SaveTheOcean",
    description: "Campaña para limpiar los océanos",
    goal: 500,
    current: 200,
    category: "Medio Ambiente",
  },
  {
    id: "3",
    title: "EducationForAll",
    description: "Proveer educación a niños en áreas rurales",
    goal: 1000,
    current: 750,
    category: "Educación",
  },
  {
    id: "4",
    title: "HealthcareHeroes",
    description: "Apoyo a trabajadores de la salud durante la pandemia",
    goal: 2000,
    current: 1500,
    category: "Salud",
  },
  {
    id: "5",
    title: "AnimalRescue",
    description: "Rescate y cuidado de animales abandonados",
    goal: 300,
    current: 100,
    category: "Animales",
  },
];

const FundraisingsMainPage: React.FC = () => {
  const router = useRouter();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-8">Recaudaciones</h1>
      <p className="text-2xl text-center mb-8">Dona a las causas</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {fundraisingsData.map(fundraising => (
          <div key={fundraising.id} className="bg-base-100 shadow-md rounded-lg p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">{fundraising.title}</h2>
              <p className="text-white-700 mb-4">{fundraising.description}</p>
            </div>
            <div>
              <div className="mb-4">
                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200 text-[10px]">
                        Recaudado: {fundraising.current} ETH
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold inline-block text-blue-600">{fundraising.goal} ETH</span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                    <div
                      style={{ width: `${(fundraising.current / fundraising.goal) * 100}%` }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                    ></div>
                  </div>
                </div>
              </div>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                onClick={() => router.push(`fundraising/${fundraising.id}`)}
              >
                Ver más
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FundraisingsMainPage;
