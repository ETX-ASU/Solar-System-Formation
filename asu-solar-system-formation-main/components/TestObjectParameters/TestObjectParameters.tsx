import React, { FunctionComponent } from 'react';
import { observer } from 'mobx-react-lite';
import styled, { css } from 'styled-components';

import { useStores } from 'providers/StoreProvider/useStores';
import { CondensedIcon } from 'components/Icons/CondensedIcon';
import { OBJECT_PARAMETERS } from 'domainTypes';

export const TestObjectParameters = observer(() => {
  const { testObjectsStore, settingsStore } = useStores();

  return settingsStore.parametersVisible ? (
    <TestObjectParametersWrapper>
      {settingsStore.isVisibleParameter(
        OBJECT_PARAMETERS.DISTANCE_FROM_THE_SUN,
      ) ? (
        <Field>
          <Label>Distance</Label>
          <Value unit="AU" data-testid="param-distance-value">
            {testObjectsStore.selectedObject?.distance}
          </Value>
        </Field>
      ) : null}
      {settingsStore.isVisibleParameter(OBJECT_PARAMETERS.TEMPERATURE) ? (
        <Field>
          <Label>Temperature</Label>
          <Value unit="K" data-testid="param-temperature-value">
            {testObjectsStore.selectedObject?.temperature}
          </Value>
        </Field>
      ) : null}
      {settingsStore.isVisibleParameter(OBJECT_PARAMETERS.CONDENSED) ? (
        <Field>
          <Label>Condensed</Label>
          <Value data-testid="param-condensed-value">
            {testObjectsStore.selectedObject == null ||
            !testObjectsStore.selectedObject.isPlaced ? null : (
              <CondensedValueWrapper>
                <CondensedIcon
                  condensed={testObjectsStore.selectedObject.condensed}
                />
                <span>
                  {testObjectsStore.selectedObject.condensed ? 'Yes' : 'No'}
                </span>
              </CondensedValueWrapper>
            )}
          </Value>
        </Field>
      ) : null}
      {settingsStore.isVisibleParameter(OBJECT_PARAMETERS.SOLID_MATERIALS) ? (
        <Field>
          <Label>Solid Materials</Label>
          <Value data-testid="param-condensed-value">
            {testObjectsStore.selectedObject == null ||
            !testObjectsStore.selectedObject.isPlaced
              ? null
              : testObjectsStore.selectedObject.solidMaterials ===
                'rock-and-ice'
              ? 'Rock and ice'
              : 'Rock'}
          </Value>
        </Field>
      ) : null}
    </TestObjectParametersWrapper>
  ) : null;
});

const TestObjectParametersWrapper = styled.div`
  ${({ theme: { Colors } }) => css`
    display: flex;
    background-color: ${Colors.testObjectParametersBackgroundColor};
    padding: 10px 20px;
  `}
`;

const Field = styled.div`
  ${({ theme: { Colors } }) => css`
    display: flex;
    flex-direction: column;
    width: 33%;
    color: ${Colors.testObjectParametersTextColor};
    font-size: 16px;
    line-height: 22px;
    margin-left: 12px;

    :first-child {
      margin-left: 0%;
    }
  `}
`;

const Label = styled.div`
  font-weight: bold;
  margin-bottom: 8px;
`;

const Value: FunctionComponent<{ unit?: string }> = ({
  children,
  unit,
  ...rest
}) => (
  <div {...rest}>
    {children || '--'} {unit}
  </div>
);

const CondensedValueWrapper = styled.div`
  display: flex;
  align-items: center;

  img {
    margin-right: 4px;
  }
`;
