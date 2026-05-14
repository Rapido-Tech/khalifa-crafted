import {
  ArrayInput,
  Create,
  ImageInput,
  SimpleForm,
  SimpleFormIterator,
  TextareaInput,
  TextInput,
} from "@/components";
import { required } from "ra-core";

export const CategoryCreate = () => (
  <Create redirect="list">
    <SimpleForm
      className="border rounded-sm p-4 space-y-5"
      // onSubmit={(data: any) => console.log("Submitting", data)}
    >
      <TextInput
        source="name"
        className="text-left"
        label="Category Name"
        validate={required()}
      />
      <ImageInput
        source="categoryImg"
        label="Category Image"
        accept="image/*"
        validate={required()}
      />
      <ArrayInput source="subcategories" label="Sub-categories">
        {(fields, fieldMethods) => (
          <SimpleFormIterator fields={fields} fieldMethods={fieldMethods}>
            <TextInput
              source="name"
              label="Sub-category Name"
              validate={required()}
            />
          </SimpleFormIterator>
        )}
      </ArrayInput>
      <TextareaInput
        className="text-left"
        source="description"
        label="Description"
      />
    </SimpleForm>
  </Create>
);
