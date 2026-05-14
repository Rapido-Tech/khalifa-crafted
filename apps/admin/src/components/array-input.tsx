// components/ArrayInput.tsx
import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

interface ArrayInputProps {
  source: string;
  label?: string;
  children: (fields: any[], fieldMethods: any) => React.ReactNode;
}

export const ArrayInput: React.FC<ArrayInputProps> = ({
  source,
  label,
  children,
}) => {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({ control, name: source });

  return (
    <div className="space-y-2 text-left">
      {label && <label className="font-semibold block">{label}</label>}
      {children(fields, { append, remove })}
    </div>
  );
};
