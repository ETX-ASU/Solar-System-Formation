import React, { FunctionComponent, memo } from 'react';
import { BASE_PATH } from 'utils/consts';

export interface ICondensedIconProps {
  className?: string;
  condensed?: boolean;
}

export const CondensedIcon: FunctionComponent<ICondensedIconProps> = memo(
  ({ className, condensed }: ICondensedIconProps) => {
    return (
      <img
        data-testid={`${condensed ? '' : 'no-'}condensed-icon`}
        className={className}
        src={`${BASE_PATH}/assets/test-objects/mode-2/${
          condensed ? 'point-o' : 'point-x'
        }.svg`}
        alt={`${condensed ? '' : 'no '}condensed icon`}
        width="18"
        height="18"
      />
    );
  },
);
