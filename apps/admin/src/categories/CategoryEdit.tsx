import {
  ArrayInput,
  Edit,
  ReferenceManyField,
  SimpleForm,
  SimpleFormIterator,
  TextareaInput,
  TextInput,
} from "@/components";
import { required, WithRecord } from "ra-core";
import { Link } from "react-router";

export const CategoryEdit = () => (
  <Edit>
    <div className="flex flex-col lg:flex-row items-start justify-between">
      <SimpleForm className="border rounded-sm p-4 space-y-5">
        <TextInput
          source="name"
          className="text-left"
          label="Category Name"
          validate={required()}
        />
        <WithRecord
          render={(record) => (
            <div className="space-y-2">
              <img
                src={record.image?.url}
                alt={record.name}
                className="w-full max-w-xs h-auto rounded-sm"
              />
              <p className="text-xs text-muted-foreground">
                Image can't be changed here yet — re-uploading requires the
                same Cloudinary flow as creating a category.
              </p>
            </div>
          )}
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
