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
    <LayoutTestObjects aria-labelledby="test-objects-title">
      <LayoutSectionTitle id="test-objects-title">Test Objects</LayoutSectionTitle>
      <TestObjectsList role="list" aria-label="Objects available to place">
        {testObjectsStore.visibleInBankObjects.map((object: ITestObject) => (
          <li key={object.id}>
            <TestObjectButton
              item={object}
              disabled={!settingsStore.bankEnabled}
            />
          </li>
        ))}
      </TestObjectsList>
    </LayoutTestObjects>
  ) : null;
});

const TestObjectsList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 10px;
  margin: 0;
  list-style: none;

  @media (max-width: 900px) {
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
  }
`;
