# FundingChain

🧪 Es una DAPP enfocada en la recaudación de fondos y financiamiento de proyectos de software y distintas causas.
El usuario, a través de una wallet, podrá crear y donar a las recaudaciones activas. El movimiento de los fondos es completamente transparente gracias a la naturaleza de la Blockchain de Ethereum.

## Requisitos

Antes de comenzar, necesitas instalar las siguientes herramientas:

- [Node (>= v20.18.3)](https://nodejs.org/en/download/)
- Yarn ([v1](https://classic.yarnpkg.com/en/docs/install/) o [v2+](https://yarnpkg.com/getting-started/install))
- [Git](https://git-scm.com/downloads)

## Correr la aplicación en local

Para comenzar a utilizar la aplicación, sigue los pasos a continuación:

1. Instala las dependencias:

```
yarn install
```

2. Ejecuta una red local en el primer terminal:

```
yarn chain
```

Este comando inicia una red local de Ethereum usando Hardhat. La red se ejecuta en tu máquina local y puede ser utilizada para pruebas y desarrollo. Puedes personalizar la configuración de la red en `packages/hardhat/hardhat.config.ts`.

3. En un segundo terminal, despliega el contrato de prueba:

```
yarn deploy --tags CreateFunding
```

Este comando despliega el smart contract que se encarga de gestionar las recaudaciones de fondos.

4. Inicia tu aplicación NextJS:

```
yarn start
```

Visita la aplicación en: `http://localhost:3000`.

## Funcionalidades

Esta aplicación forma parte de un MVP, por lo cual se implementaron las siguientes vistas y funcionalidades:

### Landing Page

Página principal del proyecto, de aquí se puede navegar a la vista de crear recaudación y explorar recaudaciones

![Landing Page](/docs/langing_page.png)

### Crear Recaudación

Introduce los datos requeridos para lanzar tu propia recaudación. **Recuerda conectar tu billetera** y conseguir fondos del faucet para pagar el gas requerido para hacer la operación con el contrato.

![Crear Recaudación](/docs/create.png)

### Explorar Recaudaciones

En esta vista puedes navegar por las distintas recaudaciones creadas y entrar en el detalle de cada una para donar.

![Ver Recaudaciones](/docs/explore.png)

### Detalles de Recaudación

Aquí se puede ver una descripción más detallada del proyecto que dará más información y contexto a sus posibles donantes.

![Detalles de Recaudación](/docs/fundraising_detail.png)

### Donar a recaudación

Para ayudar a la causa puedes donar una cierta cantidad de ETH que no exceda la meta de recaudación. Una vez que sea alcanzada la meta, los fondos serán transferidos en su totalidad a la cuenta del creador de la recaudación.

![Donar a recaudación](/docs/donate.png)
