import React from 'react';
import styled from 'styled-components';

import { PrimaryButton } from 'components/Buttons/PrimaryButton';
import { useStores } from 'providers/StoreProvider/useStores';
import { observer } from 'mobx-react-lite';

export const PlotPointButtonContainer = observer(() => {
  const { testObjectsStore, addSelectedToGraph, settingsStore } = useStores();

  return settingsStore.graphButtonVisible ? (
    <ButtonWrapper>
      <PrimaryButton
        disabled={
          !settingsStore.graphButtonEnabled ||
          !testObjectsStore.selectedObject?.isPlaced
        }
        onClick={addSelectedToGraph}
      >
        Plot Point
      </PrimaryButton>
    </ButtonWrapper>
  ) : null;
});

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  height: 84px;
`;
