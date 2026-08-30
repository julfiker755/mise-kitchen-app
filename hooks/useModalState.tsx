import { useState } from 'react';

type StateShape = Record<string, boolean | string>;
type StateUpdater<T extends StateShape> = <K extends keyof T>(
  key: K,
  value: T[K]
) => void;

export function useGlobalState<T extends StateShape>(
  initialState: T
): [T, StateUpdater<T>] {
  const [state, setState_] = useState<T>(initialState);

  const setState: StateUpdater<T> = (key, value) => {
    setState_((prev) => ({ ...prev, [key]: value }));
  };

  return [state, setState];
}