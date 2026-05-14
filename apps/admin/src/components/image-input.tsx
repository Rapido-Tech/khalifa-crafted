import { useState, useEffect, ChangeEvent } from "react";
import { useInput, FieldTitle } from "ra-core";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2, Upload } from "lucide-react";

type ImageInputProps = {
  source: string;
  label?: string;
  multiple?: boolean;
  accept?: string;
  validate?: any;
  maxFiles?: number;
};

export const ImageInput = ({
  source,
  label,
  multiple = false,
  accept = "image/*",
  validate,
  maxFiles = 3,
}: ImageInputProps) => {
  const {
    field,
    fieldState: { error },
    isRequired,
  } = useInput({ source, validate });

  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  // 🔹 Prefill existing image on mount
  useEffect(() => {
    const value = field.value;
    if (!files.length && !previews.length) {
      if (value) {
        if (multiple && Array.isArray(value)) {
          setPreviews(
            value.map((v) => (typeof v === "string" ? v : v.url || ""))
          );
        } else if (typeof value === "string") {
          setPreviews([value]);
        } else if (value?.url) {
          setPreviews([value.url]);
        }
      }
    }
  }, [field.value]);

  const updatePreviews = (fileList: File[]) => {
    const urls = fileList.map((file) => URL.createObjectURL(file));
    setPreviews(urls);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newFiles = e.target.files ? Array.from(e.target.files) : [];

    if (multiple) {
      const combined = [...files, ...newFiles].slice(0, maxFiles);
      setFiles(combined);
      updatePreviews(combined);
      field.onChange(combined);
    } else {
      const singleFile = newFiles[0];
      if (singleFile) {
        setFiles([singleFile]);
        updatePreviews([singleFile]);
        field.onChange(singleFile);
      }
    }

    e.target.value = "";
  };

  const handleDelete = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
    const newPreviews = [...previews];
    newPreviews.splice(index, 1);
    setPreviews(newPreviews);
    field.onChange(multiple ? newFiles : null);
  };

  useEffect(() => {
    return () => {
      previews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previews]);

  return (
    <div className="grid gap-2">
      <Label htmlFor={source}>
        <FieldTitle label={label} source={source} isRequired={isRequired} />
      </Label>

      <Input
        id={source}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleChange}
      />

      <div className="cursor-pointer">
        <label className="flex size-16 flex-col items-center justify-center rounded-md border bg-gray-100 hover:bg-gray-200">
          <Upload className="mb-1 size-6 text-gray-400" />
          <span className="text-xs text-muted-foreground">Add</span>
        </label>
      </div>

      {error && <p className="text-sm text-destructive">{error.message}</p>}

      {previews.length > 0 && (
        <div className="flex gap-2 flex-wrap mt-2">
          {previews.map((src, index) => (
            <div key={index} className="relative w-24 h-24 group">
              <img
                src={src}
                alt={`Preview ${index}`}
                className="w-full h-full object-cover rounded border"
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                onClick={() => handleDelete(index)}
                className="absolute -top-2 -right-2 h-6 w-6 p-0"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
