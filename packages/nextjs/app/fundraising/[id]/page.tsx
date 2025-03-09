"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Fundraising, fundraisingsData } from "../data/fundraisings.data";
import { InputBase } from "~~/components/scaffold-eth";

export default function FundraisingPage({ params }: { params: { id: string } }) {
  const [fundraising, setFundraising] = useState<Fundraising | undefined>(undefined);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [donationAmount, setDonationAmount] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const fetchFundraising = async () => {
      const { id } = params;
      const foundFundraising = fundraisingsData.find(f => f.id === id);
      setFundraising(foundFundraising);
      setIsLoading(false);
    };

    fetchFundraising();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 text-center">
        <p style={{ marginTop: "3em" }} className="text-2xl font-bold">
          Cargando...
        </p>
      </div>
    );
  }

  if (!fundraising) {
    return (
      <div className="container mx-auto p-4">
        <div style={{ marginTop: "3em" }} className="bg-base-100 shadow-md rounded-lg p-6 text-center max-w-md mx-auto">
          <h1 className="text-2xl font-bold mb-4">Recaudación no encontrada</h1>
          <p className="mb-4">No se ha encontrado la recaudación con el ID proporcionado.</p>
          <Link className="link" href={"/fundraising"}>
            Volver a Recaudaciones
          </Link>
        </div>
      </div>
    );
  }

  const handleDonateClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleDonationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDonationAmount(e.target.value);
  };

  const handleDonationSubmit = () => {
    // Aquí puedes manejar la lógica de la donación, por ejemplo, enviando los datos a una API
    console.log(`Donación de ${donationAmount} ETH a la recaudación ${fundraising.title}`);
    setIsPopupOpen(false);
  };

  return (
    <div className="container mx-auto p-4">
      <div style={{ marginTop: "3em" }} className="bg-base-100 shadow-md rounded-lg p-6 max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">{fundraising.title}</h1>
        <p className="text-white-700 mb-4">{fundraising.longDescription}</p>
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
        <div style={{ display: "flex", justifyContent: "center", marginTop: "1.5em" }}>
          <button
            style={{ fontSize: "1.5em", width: "6em" }}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleDonateClick}
          >
            Donar
          </button>
        </div>
        {isPopupOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-base-100 p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-4">Introduce el monto a donar</h2>
              <InputBase
                name="donation"
                value={donationAmount}
                onChange={setDonationAmount}
                placeholder="Monto en ETH..."
              />
              <br />
              <div className="flex justify-end">
                <button
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                  onClick={handleClosePopup}
                >
                  Cancelar
                </button>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={handleDonationSubmit}
                >
                  Donar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
