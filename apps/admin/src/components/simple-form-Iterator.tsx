import React from "react";
import { Button } from "./ui/button";

interface SimpleFormIteratorProps {
  fields: any[];
  fieldMethods: {
    append: () => void;
    remove: (index: number) => void;
  };
  children: React.ReactNode;
}

export const SimpleFormIterator: React.FC<SimpleFormIteratorProps> = ({
  fields,
  fieldMethods,
  children,
}) => {
  const { append, remove } = fieldMethods;

  return (
    <div className="space-y-4">
      {fields.map((item, index) => (
        <div key={item.id} className="border p-3 rounded space-y-2 relative">
          {React.Children.map(children, (child: any) =>
            React.cloneElement(child, {
              source: `${child.props.source && `${child.props.source}`}`,
              label: child.props.label,
              name: `${
                child.props.source &&
                `subcategories.${index}.${child.props.source}`
              }`,
            })
          )}
          <button
            type="button"
            onClick={() => remove(index)}
            className="text-red-500 text-sm absolute top-2 right-2"
          >
            Remove
          </button>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        className=" px-3 py-1 rounded text-sm"
        onClick={() => append()}
      >
        Add Sub-category
      </Button>
    </div>
  );
};
