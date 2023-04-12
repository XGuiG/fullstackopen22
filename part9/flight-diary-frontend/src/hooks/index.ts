import React, { useState } from "react";

const useField = (type: string) => {
  const [value, setValue] = useState("");

  const onChange = (event: React.FormEvent<HTMLInputElement>): void => {
    setValue(event.currentTarget.value);
  };

  const reset = () => {
    setValue("");
  };

  const input = { type, value, onChange };

  return { input, reset };
};

export default useField;
