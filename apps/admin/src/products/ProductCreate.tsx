import {
  AutocompleteInput,
  Create,
  ReferenceInput,
  SimpleForm,
  TextInput,
  TextareaInput,
  ImageInput,
} from "@/components";
import { required } from "ra-core";

export const ProductCreate = () => (
  <Create redirect="list">
    <SimpleForm className="border rounded-sm p-4 space-y-5">
      <TextInput
        source="name"
        className="text-left"
        label="Product Name"
        validate={required()}
      />

      <div className="flex gap-2 w-full">
        <TextInput
          source="price"
          type="number"
          label="Product Price"
          className="w-full text-left"
          validate={required()}
        />
        <TextInput
          source="stock"
          type="number"
          label="Product Stock"
          className="w-full text-left"
          validate={required()}
        />
      </div>

      <ReferenceInput source="category_id" reference="categories">
        <AutocompleteInput
          label="Product Category"
          validate={required()}
          className="text-left"
        />
      </ReferenceInput>
      <ImageInput
        source="thumbnail"
        label="Product Image"
        accept="image/*"
        validate={required()}
      />

      <ImageInput
        source="images"
        label="Gallery Images"
        accept="image/*"
        multiple
        maxFiles={3}
        validate={required()}
      />

      <TextareaInput
        className="text-left"
        source="description"
        label="Description"
        validate={required()}
      />
    </SimpleForm>
  </Create>
);
