import type { NextPage } from 'next';

import { SolarSystemFormation } from 'containers/SolarSystemFormation/SolarSystemFormation';
import { StoreProvider } from 'providers/StoreProvider/StoreProvider';

const Index: NextPage = () => {
  return (
    <StoreProvider>
      <SolarSystemFormation />
    </StoreProvider>
  );
};

export default Index;
