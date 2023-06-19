import { ComponentProps } from "react";

interface Props extends ComponentProps<'fieldset'> {
  title: string;
}
export default function Fieldset(props: Props) {
  const { children, title, className, ...restOfProps } = props;
  return (
    <fieldset
      {...restOfProps}
      className={`min-w-[500px] border border-slate-400 p-6 rounded-md gap-6 ${className || ''}`}
    >
      <legend>{title}</legend>
      {children}
    </fieldset>
  )
}