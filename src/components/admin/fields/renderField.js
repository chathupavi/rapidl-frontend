import TextField from "./TextField";
import TextAreaField from "./TextAreaField";
import ImageField from "./ImageField";
import SelectField from "./SelectField";
import NumberField from "./NumberField";
import EmojiField from "./EmojiField";
import BooleanField from "./BooleanField";

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
      return <TextAreaField {...commonProps} />;

    case "image":
      return <ImageField {...commonProps} />;

    case "select":
      return <SelectField {...commonProps} />;

    case "number":
      return <NumberField {...commonProps} />;

    case "emoji":
      return (
        <EmojiField
          label={field.label}
          value={value ?? ""}
          onChange={onChange}
        />
      );
    case "boolean":
      return (
        <BooleanField
          field={field}
          value={value}
          onChange={onChange}
        />
      );
    case "text":
    default:
      return <TextField {...commonProps} />;
  }
}