import React, { useCallback } from 'react';
import styled, { css } from 'styled-components';

import { ITestObject } from 'domainTypes';
import { observer } from 'mobx-react-lite';
import { useStores } from 'providers/StoreProvider/useStores';
import { OBJECT_NAMES } from 'utils/objectsMap';

export interface ITestObjectButtonProps {
  item: ITestObject;
  disabled: boolean;
}

export const TestObjectButton = observer(
  ({ item, disabled }: ITestObjectButtonProps) => {
    const { testObjectsStore } = useStores();
    const handleClick = useCallback(() => {
      testObjectsStore.toggleSelection(item);
      if (item.meta?.isAloneOnOrbit) {
        testObjectsStore.removePlacedObjects();
      }
    }, [item, testObjectsStore]);

    return (
      <TestObjectButtonWrapper
        data-testid={`${item.id}-object-button`}
        isSelected={item.isSelected}
        disabled={disabled}
        onClick={handleClick}
        aria-pressed={item.isSelected}
        aria-label={`${OBJECT_NAMES[item.id]}, ${
          item.isSelected ? 'selected' : 'not selected'
        }`}
        title={OBJECT_NAMES[item.id]}
      >
        <img src={item.imgPath} alt="" aria-hidden="true" />
        {item.shortLabel ? <ShortLabel>{item.shortLabel}</ShortLabel> : null}
      </TestObjectButtonWrapper>
    );
  },
);

const TestObjectButtonWrapper = styled.button<{ isSelected: boolean }>`
  ${({ isSelected, theme: { Colors } }) => css`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    background-color: ${isSelected
      ? Colors.testObjectSelectedBackgroundColor
      : Colors.testObjectBackgroundColor};
    border-radius: 50%;
    border: 4px solid
      ${isSelected
        ? Colors.testObjectSelectedBorderColor
        : Colors.testObjectBorderColor};
    cursor: pointer;
    transition: border 0.25s, background-color 0.25s;

    :focus-visible {
      outline: 3px solid #ffffff;
      outline-offset: 3px;
    }

    :disabled {
      cursor: not-allowed;
      filter: grayscale(1);
      background-color: ${isSelected
        ? Colors.testObjectSelectedDisabledBackgroundColor
        : Colors.testObjectBackgroundColor};
      border: 4px solid
        ${isSelected
          ? Colors.testObjectSelectedDisabledBorderColor
          : Colors.testObjectBorderColor};
    }

    img {
      width: 32px;
      height: 32px;
    }

  `}
`;

const ShortLabel = styled.div`
  ${({ theme: { Colors } }) => css`
    position: absolute;
    bottom: 0;
    right: 0;
    font-size: 16px;
    font-weight: bold;
    color: ${Colors.testObjectShortLabelTextColor};
    background-color: ${Colors.testObjectShortLabelBackgroundColor};
    padding: 0 1px;
    box-shadow: 0px 0px 1px #00000099;
    border-radius: 2px;
  `}
`;
