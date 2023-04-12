import { useState } from "react";

export const useField = (type: string) => {
  const [value, setValue] = useState<string>('');

  const onChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const reset = () => {
    setValue("");
  };

  const input = { type, value, onChange };

  return { input, reset };
};
