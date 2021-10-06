import { useContext } from 'react';

import { IRootStore } from 'stores/RootStore';

import { StoreContext } from './StoreProvider';

export function useStores(): IRootStore {
  const globalStore = useContext(StoreContext);

  if (!globalStore) {
    throw new Error('useStore must be used within a StoreProvider.');
  }

  return globalStore;
}
