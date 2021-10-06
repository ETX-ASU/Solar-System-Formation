import React from 'react';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';

import {
  LayoutSectionTitle,
  LayoutTestObjects,
} from 'components/Layout/Layout';
import { useStores } from 'providers/StoreProvider/useStores';
import { ITestObject } from 'domainTypes';
import { TestObjectButton } from 'components/TestObjectButton/TestObjectButton';

export const TestObjectsContainer = observer(() => {
  const { testObjectsStore, settingsStore } = useStores();

  return settingsStore.bankVisible ? (
    <LayoutTestObjects>
      <LayoutSectionTitle>Test Objects</LayoutSectionTitle>
      <TestObjectsList>
        {testObjectsStore.visibleInBankObjects.map((object: ITestObject) => (
          <TestObjectButton
            key={object.id}
            item={object}
            disabled={!settingsStore.bankEnabled}
          />
        ))}
      </TestObjectsList>
    </LayoutTestObjects>
  ) : null;
});

const TestObjectsList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 48px;
`;
