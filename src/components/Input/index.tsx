import { cn } from "@/lib/utils";
import { useState } from "react";

interface InputProps {
  placeholder: string;
  pattern?: RegExp;
  name: string;
}

export function Input({ placeholder, pattern, name }: InputProps) {
  const [value, setValue] = useState("");
  const [isValid, setIsValid] = useState(true);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const inputValue = e.target.value;
    setValue(inputValue);

    if (pattern) {
      setIsValid(pattern.test(inputValue));
    } else {
      setIsValid(true);
    }
  }

  return (
    <input
      name={name}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      className={cn(
        "col-span-2 appearance-none bg-background px-6 h-16 rounded-sm outline-none border-2",
        isValid ? "border-input-border" : "border-red-500"
      )}
    />
  );
}
