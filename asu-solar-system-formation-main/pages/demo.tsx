import type { NextPage } from 'next';
import styled from 'styled-components';

import { SolarSystemFormation } from 'containers/SolarSystemFormation/SolarSystemFormation';
import { StoreProvider } from 'providers/StoreProvider/StoreProvider';
import { DemoStoreActions } from 'containers/demo/DemoStoreActions';

const Demo: NextPage = () => {
  return (
    <StoreProvider>
      <SolarSystemFormationWrapper>
        <SolarSystemFormation />
        <DemoStoreActions />
      </SolarSystemFormationWrapper>
    </StoreProvider>
  );
};

const SolarSystemFormationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 1000px;
  min-height: calc(100vh - 64px);
  margin: 32px auto;
`;

export default Demo;
