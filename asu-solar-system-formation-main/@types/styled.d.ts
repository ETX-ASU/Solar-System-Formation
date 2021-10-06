import 'styled-components';

import { TThemeType } from '../styles/themeLight';

declare module 'styled-components' {
  export interface DefaultTheme extends TThemeType {}
}
