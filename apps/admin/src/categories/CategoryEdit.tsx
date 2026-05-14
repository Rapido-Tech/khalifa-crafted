import {
  ArrayInput,
  Edit,
  ImageInput,
  ReferenceManyField,
  SimpleForm,
  SimpleFormIterator,
  TextareaInput,
  TextInput,
} from "@/components";
import { required } from "ra-core";
import { Link } from "react-router";

export const CategoryEdit = () => (
  <Edit>
    <div className="flex flex-col lg:flex-row items-start justify-between">
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

      <ReferenceManyField
        reference="products"
        target="category_id"
        perPage={100}
        render={({ data }) =>
          data && (
            <div>
              <h3 className="font-semibold text-sm mb-2">Products</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-lg">
                {data.map((product) => (
                  <Link
                    className="border"
                    key={product._id}
                    to={`/products/${product._id}`}
                  >
                    <img
                      src={product.thumbnail.url}
                      alt={product.name}
                      className="w-full h-32 object-cover"
                    />
                  </Link>
                ))}
              </div>
            </div>
          )
        }
      />
    </div>
  </Edit>
);
