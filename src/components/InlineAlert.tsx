import { ComponentProps } from "react";

export function InlineAlert ({children}: ComponentProps<'div'>) {
  return (
    <div className="flex flex-col justify-center items-center p-6">
      <span className="text-red-600">{children}</span>
    </div>
  )
}