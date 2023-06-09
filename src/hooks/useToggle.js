import { useState } from "react";

export const useToggle = (initialValue = false) => {
  // if parameter is not given then default value (false) will be considered
  const [state, setState] = useState(initialValue);

  const toggle = () => {
    setState((prev) => !prev);
  };

  return [state, toggle];
};
