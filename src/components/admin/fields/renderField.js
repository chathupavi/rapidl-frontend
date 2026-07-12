import TextField from "./TextField";
import TextAreaField from "./TextAreaField";
import ImageField from "./ImageField";
import SelectField from "./SelectField";
import NumberField from "./NumberField";

// Shared switch used by both SectionForm (top-level fields)
// and RepeaterField (nested fields inside each repeater item).
export default function renderField(field, value, onChange) {
  switch (field.type) {
    case "textarea":
      return (
        <TextAreaField
          key={field.name}
          field={field}
          value={value}
          onChange={onChange}
        />
      );
    case "image":
      return (
        <ImageField
          key={field.name}
          field={field}
          value={value}
          onChange={onChange}
        />
      );
    case "select":
      return (
        <SelectField
          key={field.name}
          field={field}
          value={value}
          onChange={onChange}
        />
      );
    case "number":
      return (
        <NumberField
          key={field.name}
          field={field}
          value={value}
          onChange={onChange}
        />
      );
    case "text":
    default:
      return (
        <TextField
          key={field.name}
          field={field}
          value={value}
          onChange={onChange}
        />
      );
  }
}