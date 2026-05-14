import {
  type InputProps,
  useInput,
  useResourceContext,
  FieldTitle,
} from "ra-core";
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { FormError } from "@/components/form-error";

export type TextareaInputProps = InputProps & React.ComponentProps<"textarea">;

export const TextareaInput = (props: TextareaInputProps) => {
  const resource = useResourceContext(props);
  const {
    label,
    source,
    className,
    validate: _validateProp,
    format: _formatProp,
    ...rest
  } = props;
  const { field, fieldState, isRequired } = useInput(props);

  return (
    <FormItem className={className}>
      {label !== false && (
        <FormLabel>
          <FieldTitle
            label={label}
            source={source}
            resource={resource}
            isRequired={isRequired}
          />
        </FormLabel>
      )}
      <FormControl>
        <Textarea {...rest} {...field} />
      </FormControl>
      {props.helperText && (
        <FormDescription>{props.helperText}</FormDescription>
      )}
      <FormError fieldState={fieldState} />
    </FormItem>
  );
};
