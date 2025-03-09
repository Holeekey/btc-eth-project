export interface Fundraising {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  goal: number;
  current: number;
  category: string;
}

export const fundraisingsData: Fundraising[] = [
  {
    id: "1",
    title: "GetToTheChain",
    description: "Ayuda a nuestro videojuego a llegar a la blockchain",
    longDescription:
      "Nuestro proyecto de videojuego necesita fondos para integrarse con la tecnología blockchain. Con tu ayuda, podremos implementar características innovadoras y asegurar la transparencia y seguridad de las transacciones dentro del juego. ¡Únete a nosotros en esta aventura tecnológica!",
    goal: 100,
    current: 50,
    category: "Proyecto",
  },
  {
    id: "2",
    title: "SaveTheOcean",
    description: "Campaña para limpiar los océanos",
    longDescription:
      "Los océanos están en peligro debido a la contaminación plástica y otros desechos. Nuestra campaña se dedica a limpiar las playas y los océanos, y a educar a las comunidades sobre la importancia de mantener nuestros mares limpios. Tu donación ayudará a financiar equipos de limpieza y programas educativos.",
    goal: 500,
    current: 200,
    category: "Medio Ambiente",
  },
  {
    id: "3",
    title: "EducationForAll",
    description: "Proveer educación a niños en áreas rurales",
    longDescription:
      "La educación es un derecho fundamental, pero muchos niños en áreas rurales no tienen acceso a ella. Nuestro proyecto busca construir escuelas, proporcionar materiales educativos y capacitar a maestros en comunidades rurales. Con tu apoyo, podemos cambiar el futuro de estos niños y darles la oportunidad de un mejor porvenir.",
    goal: 1000,
    current: 750,
    category: "Educación",
  },
  {
    id: "4",
    title: "HealthcareHeroes",
    description: "Apoyo a trabajadores de la salud durante la pandemia",
    longDescription:
      "Los trabajadores de la salud han estado en la primera línea de la lucha contra la pandemia, arriesgando sus vidas para salvar a otros. Esta recaudación de fondos está destinada a proporcionarles equipos de protección personal, apoyo psicológico y otros recursos necesarios para que puedan continuar su valiente labor.",
    goal: 2000,
    current: 1500,
    category: "Salud",
  },
  {
    id: "5",
    title: "AnimalRescue",
    description: "Rescate y cuidado de animales abandonados",
    longDescription:
      "Miles de animales son abandonados cada año y necesitan nuestra ayuda. Nuestro proyecto se dedica al rescate, cuidado y adopción de animales abandonados. Con tu donación, podremos proporcionarles refugio, atención médica y encontrarles hogares amorosos donde puedan vivir felices.",
    goal: 300,
    current: 100,
    category: "Animales",
  },
];
