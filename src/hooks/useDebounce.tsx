/* eslint-disable prefer-spread */
import { useEffect, DependencyList } from "react";

export function useDebounceEffect(
  fn: () => void,
  waitTime: number,
  deps?: DependencyList
) {
  useEffect(() => {
    const t = setTimeout(() => {
      return fn.apply(undefined, deps as []);
    }, waitTime);

    return () => {
      clearTimeout(t);
    };
  }, deps as []);
}
