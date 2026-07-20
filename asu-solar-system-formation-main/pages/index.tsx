import type { NextPage } from 'next';

import { SolarSystemFormation } from 'containers/SolarSystemFormation/SolarSystemFormation';
import { StoreProvider } from 'providers/StoreProvider/StoreProvider';
import Head from 'next/head';

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>Solar System Formation Simulation</title>
        <meta
          name="description"
          content="An interactive simulation exploring temperature and distance during solar system formation."
        />
      </Head>
      <StoreProvider>
        <SolarSystemFormation />
      </StoreProvider>
    </>
  );
};

export default Index;
