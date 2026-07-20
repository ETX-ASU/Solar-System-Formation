import * as React from 'react';
import { alpha } from '@material-ui/system';
import SliderUnstyled from '@material-ui/unstyled/SliderUnstyled';
import styled, { css } from 'styled-components';
import { observer } from 'mobx-react-lite';

import { useStores } from 'providers/StoreProvider/useStores';
import { runInAction } from 'mobx';

export const RadiusSlider = observer(() => {
  const { settingsStore } = useStores();
  const increase = () => settingsStore.setRadius(settingsStore.radius + 1);
  const decrease = () => settingsStore.setRadius(settingsStore.radius - 1);

  return settingsStore.radiusVisible ? (
    <RadiusSliderWrapper role="group" aria-labelledby="zoom-title">
      <Title id="zoom-title">Zoom</Title>
      <SliderWrapper>
        <Label
          type="button"
          disabled={!settingsStore.radiusEnabled}
          onClick={decrease}
          aria-label="Zoom in"
        >
          +
        </Label>
        <StyledSliderWrapper>
          <StyledSliderObserver />
        </StyledSliderWrapper>
        <Label
          type="button"
          disabled={!settingsStore.radiusEnabled}
          onClick={increase}
          aria-label="Zoom out"
        >
          -
        </Label>
      </SliderWrapper>
    </RadiusSliderWrapper>
  ) : null;
});

const StyledSliderObserver = observer(() => {
  const { settingsStore } = useStores();
  const handleChange = React.useCallback(
    (_event: any, newValue: number | number[]) => {
      if (settingsStore.radiusEnabled) {
        settingsStore.setRadius(newValue as number);
      }
    },
    [settingsStore],
  );

  const startDragging = React.useCallback(
    () =>
      runInAction(() => {
        settingsStore.pullingRadius = true;
      }),
    [settingsStore],
  );

  const stopDragging = React.useCallback(
    () =>
      runInAction(() => {
        settingsStore.pullingRadius = false;
      }),
    [settingsStore],
  );

  return (
    <StyledSlider
      data-testid="radius-slider"
      value={settingsStore.radius}
      aria-label="Solar system radius in astronomical units"
      getAriaValueText={(value: number) => `${value} astronomical units`}
      onChange={handleChange}
      valueLabelDisplay="off"
      disabled={!settingsStore.radiusEnabled}
      min={settingsStore.minRadius}
      max={settingsStore.maxRadius}
      valueLabelFormat={(value: number) => `${value} AU`}
      onPointerDown={startDragging}
      onChangeCommitted={stopDragging}
    />
  );
});

const StyledSlider = styled(SliderUnstyled)`
  ${({ theme: { Colors } }) => css`
    color: ${Colors.radiusSliderRailColor};
    height: 4px;
    width: 100%;
    padding: 13px 0;
    display: inline-block;
    position: relative;
    cursor: pointer;
    touch-action: none;
    -webkit-tap-highlight-color: transparent;

    & .MuiSlider-rail {
      display: block;
      position: absolute;
      width: 100%;
      height: 4px;
      border-radius: 2px;
      background-color: currentColor;
    }

    & .MuiSlider-track {
      display: block;
      position: absolute;
      height: 4px;
      border-radius: 2px;
      background-color: currentColor;
    }

    & .MuiSlider-thumb {
      position: absolute;
      width: 14px;
      height: 14px;
      margin-left: -6px;
      margin-top: -5px;
      box-sizing: border-box;
      border-radius: 50%;
      outline: 0;
      border: 2px solid ${Colors.radiusSliderThumbColor};
      background-color: ${Colors.radiusSliderThumbColor};

      :focus-visible {
        outline: 3px solid #ffffff;
        outline-offset: 3px;
      }

      :hover {
        box-shadow: 0 0 0 0.25rem ${alpha(Colors.radiusSliderThumbColor, 0.15)};
      }

      &.Mui-active {
        box-shadow: 0 0 0 0.25rem ${alpha(Colors.radiusSliderThumbColor, 0.3)};
      }
    }

    & .MuiSlider-valueLabel {
      width: 54px;
      margin-left: 4px;
      z-index: 1;
      white-space: nowrap;
      font-size: 16px;
      line-height: 1.43;
      letter-spacing: 0.01071em;
      top: -10px;
      transform-origin: bottom center;
      transform: translate(-40%, -100%) scale(0);
      position: absolute;
      background-color: ${Colors.radiusSliderValueLabelBackgroundColor};
      border-radius: 3px;
      color: ${Colors.radiusSliderValueLabelColor};
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0.25rem 0.75rem;
      box-shadow: 3px 3px 0px #00000066;

      &.MuiSlider-valueLabelOpen {
        transform: translate(-50%, -100%);
      }

      &:before {
        position: absolute;
        content: '';
        width: 8px;
        height: 8px;
        bottom: 0;
        left: 50%;
        transform: translate(-50%, 50%) rotate(45deg);
        background-color: inherit;
      }
    }

    &.Mui-disabled {
      cursor: not-allowed;

      .MuiSlider-thumb {
        border: 2px solid ${Colors.radiusSliderThumbDisabledColor};
        background-color: ${Colors.radiusSliderThumbDisabledColor};

        :hover {
          box-shadow: none;
        }

        &.Mui-active {
          box-shadow: none;
        }
      }

      .MuiSlider-valueLabel {
        background-color: ${Colors.radiusSliderValueLabelDisabledBackgroundColor};
      }
    }
  `}
`;

const RadiusSliderWrapper = styled.div`
  ${({ theme: { Colors } }) => css`
    width: 100%;
    min-height: 84px;
    background-color: ${Colors.radiusSliderBackgroundColor};
    padding: 10px 20px;
    flex: 1;
  `}
`;

const StyledSliderWrapper = styled.div`
  ${({ theme: { Colors } }) => css`
    width: min(180px, 34vw);
    margin: 0 16px;
    border-radius: 4px;

    :focus-within {
      outline: 3px solid ${Colors.radiusSliderThumbColor};
      outline-offset: 4px;
    }
  `}
`;

const Label = styled.button<{ disabled?: boolean }>`
  ${({ disabled = false, theme: { Colors } }) => css`
    color: ${disabled
      ? Colors.radiusSliderLabelDisabledColor
      : Colors.radiusSliderLabelColor};
    font-size: 18px;
    margin: 0;
    padding: 8px;
    min-width: 44px;
    min-height: 44px;
    border: none;
    background: transparent;
    cursor: ${disabled ? 'not-allowed' : 'pointer'};

    :focus-visible {
      outline: 3px solid #ffffff;
      outline-offset: 2px;
    }
  `}
`;

const Title = styled.div`
  ${({ theme: { Colors } }) => css`
    font-weight: 500;
    color: ${Colors.radiusSliderLabelColor};
    font-size: 16px;
  `}
`;

const SliderWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 2px;
`;
