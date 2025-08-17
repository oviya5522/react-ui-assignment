import { useState } from "react";
import {InputField} from "../components/InputField";
import type { InputFieldProps } from "../components/InputField";
import type { Meta } from "@storybook/react";

const meta: Meta<typeof InputField> = {
  title: "Assignment/InputField",
  component: InputField,
};

export default meta;

const InteractiveInput = (args: InputFieldProps) => {
  const [value, setValue] = useState(args.value || "");
  return (
    <InputField
      {...args}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onClear={() => setValue("")}
    />
  );
};


export const Default = {
  render: (args: InputFieldProps) => <InteractiveInput {...args} />,
  args: {
    placeholder: "Enter text here",
  },
};

export const Disabled = {
  render: (args: InputFieldProps) => <InteractiveInput {...args} />,
  args: {
    placeholder: "Cannot type",
    disabled: true,
  },
};

export const WithLabel = {
  render: (args: InputFieldProps) => <InteractiveInput {...args} />,
  args: {
    label: "Name",
    placeholder: "Enter your name",
  },
};

export const WithHelperText = {
  render: (args: InputFieldProps) => <InteractiveInput {...args} />,
  args: {
    label: "Email",
    placeholder: "Enter email",
    helperText: "We'll never share your email",
  },
};

export const WithError = {
  render: (args: InputFieldProps) => <InteractiveInput {...args} />,
  args: {
    label: "Username",
    placeholder: "Enter username",
    invalid: true,
    errorMessage: "Username is required",
  },
};

export const PasswordField = {
  render: (args: InputFieldProps) => <InteractiveInput {...args} />,
  args: {
    label: "Password",
    placeholder: "Enter password",
    type: "password",
  },
};