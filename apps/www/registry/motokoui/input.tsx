import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps {
  /** Leading icon inside the field (left side). */
  icon?: React.ReactNode
  /** Label rendered above the field. Linked to the input via `htmlFor` / `id`. */
  label?: string
  /** Minimum text length. */
  minLength?: number
  /** Maximum text length. */
  maxLength?: number
  /** Controlled value. */
  value?: string
  /** Placeholder text shown when the field is empty. */
  placeholder?: string
  /** Disables the field and skips hover border styles. */
  disabled?: boolean
  /** Field name for form submission. */
  name?: string
  /** Extra classes for the container. */
  className?: string
  /** Extra classes on the `<input>`. */
  classNameInput?: string
  /** Extra classes on the `<label>`. */
  classNameLabel?: string
  /** Called when the value changes. Required when using controlled `value`. */
  onChange?: React.ChangeEventHandler<HTMLInputElement>
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      icon,
      label,
      minLength,
      maxLength,
      value,
      placeholder,
      disabled,
      name,
      className,
      classNameInput,
      classNameLabel,
      onChange,
    },
    ref
  ) => {
    const inputId = React.useId()

    return (
      <div className={cn("flex w-full flex-col gap-2", className)}>
        {label ? (
          <label
            htmlFor={inputId}
            className={cn(
              "text-t-primary text-sm font-semibold tracking-tight",
              classNameLabel
            )}
          >
            {label}
          </label>
        ) : null}
        <div className="relative w-full">
          {icon ? (
            <span
              aria-hidden
              className="text-t-secondary pointer-events-none absolute top-1/2 left-3.5 z-10 flex size-4 -translate-y-1/2 items-center justify-center [&_svg]:size-4 [&_svg]:shrink-0"
            >
              {icon}
            </span>
          ) : null}
          <input
            id={inputId}
            ref={ref}
            data-slot="input"
            type="text"
            name={name}
            value={value}
            placeholder={placeholder}
            disabled={disabled}
            minLength={minLength}
            maxLength={maxLength}
            onChange={onChange}
            className={cn(
              "bg-b-surface2 placeholder:text-t-secondary/50 focus:border-s-highlight enabled:hover:border-s-highlight h-12 w-full rounded-2xl border-2 px-3 transition-colors outline-none disabled:cursor-not-allowed disabled:opacity-50",
              icon && "pl-10",
              classNameInput
            )}
          />
        </div>
      </div>
    )
  }
)

Input.displayName = "Input"

export { Input }
