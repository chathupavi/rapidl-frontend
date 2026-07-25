import TextField from "./TextField";
import TextAreaField from "./TextAreaField";
import ImageField from "./ImageField";
import SelectField from "./SelectField";
import NumberField from "./NumberField";
import EmojiField from "./EmojiField";


export default function renderField(field, value, onChange) {
  if (!field) {
    return null;
  }

  const commonProps = {
    field,
    value: value ?? "",
    onChange,
  };

  switch (field.type) {
    case "textarea":
      return (
        <TextAreaField
          key={field.name}
          {...commonProps}
        />
      );

    case "image":
      return (
        <ImageField
          key={field.name}
          {...commonProps}
        />
      );

    case "select":
      return (
        <SelectField
          key={field.name}
          {...commonProps}
        />
      );

    case "number":
      return (
        <NumberField
          key={field.name}
          {...commonProps}
        />
      );

    case "emoji":
      return (
        <EmojiField
          key={field.name}
          label={field.label}
          value={value ?? ""}
          onChange={onChange}
        />
      );

    case "text":
    default:
      return (
        <TextField
          key={field.name}
          {...commonProps}
        />
      );
  }
}