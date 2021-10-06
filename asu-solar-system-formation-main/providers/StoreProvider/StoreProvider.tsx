import React, {
  createContext,
  FunctionComponent,
  useEffect,
  useState,
} from 'react';

import { IS_DEBUG } from 'utils/consts';
import { IRootStore, RootStore } from 'stores/RootStore';

export interface IPackageStoreProvider {}

export const StoreContext = createContext<IRootStore | null>(null);

export const StoreProvider: FunctionComponent<IPackageStoreProvider> = ({
  children,
}) => {
  const [rootStore, setRootStore] = useState<IRootStore | null>(null);

  useEffect(() => {
    setRootStore(new RootStore());
  }, []);

  if (IS_DEBUG && typeof window !== 'undefined') {
    (window as any).rootStore = rootStore;
  }

  return rootStore ? (
    <StoreContext.Provider value={rootStore}>{children}</StoreContext.Provider>
  ) : (
    <div>Loading...</div>
  );
};
