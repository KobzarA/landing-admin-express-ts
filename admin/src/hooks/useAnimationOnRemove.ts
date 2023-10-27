import { Dispatch, SetStateAction, useRef } from "react";

interface IhandleAnimation<T> {
  setState: Dispatch<SetStateAction<T>>;
  newState: T;
}

const useAnimationOnRemove = (): [
  React.MutableRefObject<HTMLDivElement | null>,
  <T>({ setState, newState }: IhandleAnimation<T>) => void,
] => {
  const ref = useRef<null | HTMLDivElement>(null);

  const handleAnimationBeforeStateChange = <T>({
    setState,
    newState,
  }: IhandleAnimation<T>) => {
    if (ref.current) {
      ref.current.classList.remove("animate-fade-in");
      ref.current.classList.add("animate-fade-out");
    }
    const timer = setTimeout(() => {
      setState(newState);
      clearTimeout(timer);
    }, 500);
  };

  return [ref, handleAnimationBeforeStateChange];
};

export default useAnimationOnRemove;
