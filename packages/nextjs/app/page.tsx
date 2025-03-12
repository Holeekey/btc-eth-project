"use client";

import Link from "next/link";
import type { NextPage } from "next";
import { MagnifyingGlassIcon, RocketLaunchIcon } from "@heroicons/react/24/outline";

const Home: NextPage = () => {
  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center">
            {/* <span className="block text-2xl mb-2">Welcome to</span> */}
            <span className="block text-4xl font-bold">FundingChain</span>
          </h1>

          <p className="text-center text-lg">Conecta tu ayuda al cambio. Dona, construye, transforma.</p>
          <p className="text-center text-lg">La red de recaudación de fondos de Ethereum</p>
        </div>

        <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12">
          <div className="flex justify-center items-center gap-12 flex-col sm:flex-row">
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <RocketLaunchIcon className="h-8 w-8 fill-secondary" />
              <p>
                <Link href="/create" passHref className="link">
                  Lanza
                </Link>{" "}
                tu propia recaudación de fondos en Ethereum
              </p>
            </div>
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <MagnifyingGlassIcon className="h-8 w-8 fill-secondary" />
              <p>
                <Link href="/fundraising" passHref className="link">
                  Explora
                </Link>{" "}
                las recaudaciones activas y marca la diferencia{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
