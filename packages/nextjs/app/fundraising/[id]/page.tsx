"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { ToastContainer } from "react-toastify";
import { useAccount } from "wagmi";
import { EtherInput } from "~~/components/scaffold-eth";
import { useScaffoldReadContract, useScaffoldWriteContract, useWatchBalance } from "~~/hooks/scaffold-eth";

export default function FundraisingPage({ params }: { params: { id: string } }) {
  const [isLoading, setIsLoading] = useState(true);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [donationAmount, setDonationAmount] = useState("");

  const { isConnected, address } = useAccount();

  const router = useRouter();

  const { data: balance } = useWatchBalance({
    address,
  });

  useEffect(() => {
    const fetchFundraising = async () => {
      if (!params.id || isNaN(parseInt(params.id))) {
        router.push("/fundraising");
        return;
      }
    };

    fetchFundraising();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  const { data } = useScaffoldReadContract({
    contractName: "CreateFunding",
    functionName: "retrieveById",
    args: [BigInt(params.id)],
  });

  const [currentFunding, setCurrentFunding] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (data) {
      setCurrentFunding(weiToEth(data?.totalEarned));
      setIsLoading(false);
    }
  }, [data]);

  const { writeContractAsync } = useScaffoldWriteContract({ contractName: "CreateFunding" });

  const weiToEth = (wei: bigint) => {
    return parseFloat(wei.toString()) / 10 ** 18;
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 text-center">
        <p style={{ marginTop: "3em" }} className="text-2xl font-bold">
          Cargando...
        </p>
      </div>
    );
  }

  if (!isLoading && (!data || parseInt(data.id.toString()) === 0)) {
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

  const ethToWei = (eth: string) => {
    return BigInt(parseFloat(eth) * 10 ** 18);
  };

  const handleDonationSubmit = () => {
    if (!isConnected) {
      toast.error("Conéctate a tu wallet para donar.");
      return;
    }
    if (isNaN(parseFloat(donationAmount))) {
      toast.error("Introduce un monto válido.");
      return;
    }
    const donationAmountFloat = parseFloat(donationAmount);
    if (donationAmountFloat <= 0) {
      toast.error("El monto de la donación debe ser mayor a cero (0)");
      return;
    }
    if (balance && ethToWei(donationAmount) > balance.value) {
      toast.error("No tienes suficientes fondos para realizar esta donación.");
      return;
    }

    writeContractAsync({
      functionName: "fundFunding",
      args: [BigInt(params.id)],
      value: ethToWei(donationAmount),
    })
      .then(() => {
        setIsPopupOpen(false);
        setCurrentFunding(prev => prev ?? 0 + parseFloat(donationAmount));
        toast.success("Donación realizada con éxito!");
      })
      .catch(e => {
        setIsPopupOpen(false);
        toast.error("Error al realizar la donación.");
        console.error(e);
      });
  };

  return (
    <div className="container mx-auto p-4">
      <ToastContainer aria-label={""} />
      <div style={{ marginTop: "3em" }} className="bg-base-100 shadow-md rounded-lg p-6 max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">{data?.title}</h1>
        <p className="text-white-700 mb-4">{data?.longDescription}</p>
        <div className="mb-4">
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200 text-[10px]">
                  Recaudado: {(currentFunding ?? 0).toString()} ETH
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold inline-block text-blue-600">
                  {weiToEth(data?.goal as bigint).toString()} ETH
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
              <div
                style={{
                  width: `${(parseInt((currentFunding ?? 0).toString()) / parseInt(weiToEth(data?.goal as bigint).toString())) * 100}%`,
                }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
              ></div>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center", marginTop: "1.5em" }}>
          <button
            style={{ fontSize: "1.5em", width: "6em" }}
            className={`${data?.isFundingComplete ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-700"}   text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
            onClick={handleDonateClick}
            disabled={data?.isFundingComplete}
          >
            Donar
          </button>
        </div>
        {isPopupOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-base-100 p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-4">Introduce el monto a donar</h2>
              <EtherInput
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
