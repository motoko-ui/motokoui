"use client"

import * as React from "react"
import { ChevronDownIcon } from "lucide-react"
import { createPortal } from "react-dom"

import { cn } from "@/lib/utils"

/* =============================================================================
 * Select — compound dropdown for Motoko UI
 *
 * Usage (compound):
 *   <Select value={v} onValueChange={setV} placeholder="Pick one">
 *     <SelectTrigger><SelectValue /></SelectTrigger>
 *     <SelectContent>
 *       <SelectItem value="a">Alpha</SelectItem>
 *     </SelectContent>
 *   </Select>
 *
 * Usage (options kit):
 *   <SelectKit options={[{ value: "a", label: "Alpha" }]} />
 * ============================================================================= */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type SelectSize = "sm" | "default"

export interface SelectProps {
  children: React.ReactNode
  /** Controlled selected value. */
  value?: string
  /** Initial value for uncontrolled mode. */
  defaultValue?: string
  /** Fires when the user picks an option. */
  onValueChange?: (value: string) => void
  /** Fallback text when nothing is selected. */
  placeholder?: React.ReactNode
  /** Extra classes on the root wrapper. */
  className?: string
  /** Disables the whole control (trigger + items). */
  disabled?: boolean
}

export interface SelectTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: SelectSize
}

export interface SelectValueProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Overrides the placeholder from `Select`. */
  placeholder?: React.ReactNode
}

export type SelectContentProps = React.HTMLAttributes<HTMLDivElement>

export interface SelectItemProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "onSelect"
> {
  value: string
  disabled?: boolean
}

export interface SelectKitOption {
  value: string
  label: React.ReactNode
}

export interface SelectKitProps {
  options: SelectKitOption[]
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  placeholder?: React.ReactNode
  disabled?: boolean
  /** Classes on the root wrapper. */
  className?: string
  /** Classes on the trigger button. */
  classNameTrigger?: string
  size?: SelectSize
}

interface SelectContextValue {
  open: boolean
  setOpen: (open: boolean) => void
  value: string
  selectValue: (next: string, label: React.ReactNode) => void
  placeholder: React.ReactNode
  disabled: boolean
  /** Label for the current value, pushed by SelectItem. */
  selectedLabel: React.ReactNode | null
  /** Sync trigger label when an item mounts already selected (e.g. defaultValue). */
  syncLabel: (value: string, label: React.ReactNode) => void
  triggerRef: React.RefObject<HTMLButtonElement | null>
  contentRef: React.RefObject<HTMLDivElement | null>
  contentId: string
}

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

const SelectContext = React.createContext<SelectContextValue | null>(null)

function useSelectContext(component: string): SelectContextValue {
  const ctx = React.useContext(SelectContext)
  if (!ctx) {
    throw new Error(`${component} must be used within <Select>`)
  }
  return ctx
}

// ---------------------------------------------------------------------------
// Utilities
// ---------------------------------------------------------------------------

/** Assign a node to both a forwarded ref and an internal ref. */
function assignRef<T>(
  node: T | null,
  ...refs: Array<React.Ref<T> | undefined>
) {
  for (const ref of refs) {
    if (typeof ref === "function") {
      ref(node)
    } else if (ref) {
      ;(ref as React.MutableRefObject<T | null>).current = node
    }
  }
}

/**
 * Close when the pointer lands outside the trigger *and* the portaled menu.
 * The menu lives in `document.body`, so a plain parent-ref check is not enough.
 */
function useClickOutside(
  triggerRef: React.RefObject<HTMLElement | null>,
  contentRef: React.RefObject<HTMLElement | null>,
  onOutside: () => void,
  enabled: boolean
) {
  React.useEffect(() => {
    if (!enabled) return

    const onPointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node | null
      if (!target) return

      const inTrigger = triggerRef.current?.contains(target)
      const inContent = contentRef.current?.contains(target)
      if (!inTrigger && !inContent) onOutside()
    }

    document.addEventListener("mousedown", onPointerDown)
    document.addEventListener("touchstart", onPointerDown)
    return () => {
      document.removeEventListener("mousedown", onPointerDown)
      document.removeEventListener("touchstart", onPointerDown)
    }
  }, [triggerRef, contentRef, onOutside, enabled])
}

// ---------------------------------------------------------------------------
// Root
// ---------------------------------------------------------------------------

function Select({
  children,
  value: valueProp,
  defaultValue = "",
  onValueChange,
  placeholder = "Select…",
  className,
  disabled = false,
}: SelectProps) {
  const [open, setOpen] = React.useState(false)
  const [uncontrolled, setUncontrolled] = React.useState(defaultValue)
  // Last known label for the selected value (set by SelectItem on mount / pick)
  const [selectedLabel, setSelectedLabel] =
    React.useState<React.ReactNode>(null)

  const triggerRef = React.useRef<HTMLButtonElement | null>(null)
  const contentRef = React.useRef<HTMLDivElement | null>(null)
  const contentId = React.useId()

  const isControlled = valueProp !== undefined
  const value = isControlled ? valueProp : uncontrolled

  const selectValue = React.useCallback(
    (next: string, label: React.ReactNode) => {
      setSelectedLabel(label)
      if (!isControlled) setUncontrolled(next)
      onValueChange?.(next)
      setOpen(false)
    },
    [isControlled, onValueChange]
  )

  const syncLabel = React.useCallback(
    (itemValue: string, label: React.ReactNode) => {
      if (itemValue === value) setSelectedLabel(label)
    },
    [value]
  )

  useClickOutside(triggerRef, contentRef, () => setOpen(false), open)

  // Escape closes the menu from anywhere while open
  React.useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault()
        setOpen(false)
        triggerRef.current?.focus()
      }
    }
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [open])

  // Close if the control becomes disabled while open
  React.useEffect(() => {
    if (disabled) setOpen(false)
  }, [disabled])

  // Clear the label when the value is cleared
  React.useEffect(() => {
    if (!value) setSelectedLabel(null)
  }, [value])

  return (
    <SelectContext.Provider
      value={{
        open,
        setOpen,
        value,
        selectValue,
        placeholder,
        disabled,
        selectedLabel,
        syncLabel,
        triggerRef,
        contentRef,
        contentId,
      }}
    >
      <div
        data-slot="select"
        data-state={open ? "open" : "closed"}
        className={cn("relative w-full min-w-40", className)}
      >
        {children}
      </div>
    </SelectContext.Provider>
  )
}

// ---------------------------------------------------------------------------
// Trigger
// ---------------------------------------------------------------------------

const SelectTrigger = React.forwardRef<HTMLButtonElement, SelectTriggerProps>(
  (
    { className, size = "default", children, disabled, onClick, ...props },
    ref
  ) => {
    const {
      open,
      setOpen,
      triggerRef,
      contentId,
      disabled: rootDisabled,
    } = useSelectContext("SelectTrigger")

    const isDisabled = disabled || rootDisabled

    return (
      <button
        ref={(node) => assignRef(node, ref, triggerRef)}
        type="button"
        role="combobox"
        aria-expanded={open}
        aria-controls={contentId}
        aria-haspopup="listbox"
        data-slot="select-trigger"
        data-size={size}
        data-state={open ? "open" : "closed"}
        disabled={isDisabled}
        onClick={(event) => {
          onClick?.(event)
          if (event.defaultPrevented || isDisabled) return
          setOpen(!open)
        }}
        className={cn(
          // Surface matches Input; open state squares the bottom so Content can dock flush
          "bg-b-surface2 group flex h-12 w-full cursor-pointer items-center justify-between rounded-2xl border-2 pr-3 pl-4.5 transition-[border-radius,border-color,opacity] duration-200 ease-[cubic-bezier(0.2,0,0,1)] outline-none",
          "hover:border-s-highlight data-[state=open]:hover:border-border data-[state=open]:rounded-b-none data-[state=open]:border-b-transparent",
          "focus-visible:border-s-highlight",
          "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
          size === "sm" && "h-10 text-sm",
          className
        )}
        {...props}
      >
        {children}
        <ChevronDownIcon
          aria-hidden
          className="size-4 shrink-0 opacity-50 transition-transform duration-200 ease-[cubic-bezier(0.2,0,0,1)] group-data-[state=open]:rotate-180"
        />
      </button>
    )
  }
)
SelectTrigger.displayName = "SelectTrigger"

// ---------------------------------------------------------------------------
// Value
// ---------------------------------------------------------------------------

function SelectValue({
  placeholder: placeholderProp,
  className,
  ...props
}: SelectValueProps) {
  const { selectedLabel, placeholder, value } = useSelectContext("SelectValue")
  const empty = !value
  const text = empty
    ? (placeholderProp ?? placeholder)
    : (selectedLabel ?? value)

  return (
    <span
      data-slot="select-value"
      data-placeholder={empty ? "" : undefined}
      className={cn(
        "truncate text-left",
        empty && "text-t-secondary/50",
        className
      )}
      {...props}
    >
      {text}
    </span>
  )
}

// ---------------------------------------------------------------------------
// Content (portaled under the trigger)
// ---------------------------------------------------------------------------

const SelectContent = React.forwardRef<HTMLDivElement, SelectContentProps>(
  ({ className, children, ...props }, ref) => {
    const { open, contentId, triggerRef, contentRef } =
      useSelectContext("SelectContent")
    const [coords, setCoords] = React.useState<{
      top: number
      left: number
      width: number
    } | null>(null)
    // Avoid createPortal during SSR
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
      setMounted(true)
    }, [])

    React.useLayoutEffect(() => {
      if (!open) return

      const updateCoords = () => {
        const trigger = triggerRef.current
        if (!trigger) return
        const rect = trigger.getBoundingClientRect()
        // Document-absolute coords so position:absolute under body tracks scroll
        setCoords({
          top: rect.bottom + window.scrollY,
          left: rect.left + window.scrollX,
          width: rect.width,
        })
      }

      updateCoords()
      window.addEventListener("resize", updateCoords)
      // capture: true — catch scroll on nested overflow containers too
      window.addEventListener("scroll", updateCoords, true)
      return () => {
        window.removeEventListener("resize", updateCoords)
        window.removeEventListener("scroll", updateCoords, true)
      }
    }, [open, triggerRef])

    // Keep items mounted while closed so their labels register for SelectValue
    if (!open) {
      return (
        <div hidden aria-hidden className="hidden">
          {children}
        </div>
      )
    }

    if (!mounted || !coords) return null

    return createPortal(
      <div
        data-slot="select-content-portal"
        // Zero-height anchor: panel grows downward from the trigger edge
        style={{
          position: "absolute",
          top: coords.top - 2,
          left: coords.left,
          width: coords.width,
          height: 0,
          zIndex: 50,
        }}
      >
        <div
          ref={(node) => assignRef(node, ref, contentRef)}
          id={contentId}
          role="listbox"
          data-slot="select-content"
          data-state="open"
          className={cn(
            "bg-b-surface2 absolute top-0 left-0 z-50 max-h-[300px] w-full origin-top overflow-y-auto rounded-b-2xl border-2 border-t-0 px-2.25 pb-2.25 outline-none",
            "dark:shadow-[0px_2.15px_0.5px_-2px_rgba(0,0,0,0.25),0px_5px_1.5px_-4px_rgba(8,8,8,0.2),0px_6px_4px_-4px_rgba(8,8,8,0.16),0px_6px_13px_0px_rgba(8,8,8,0.12),0px_24px_24px_-16px_rgba(8,8,8,0.08)]",
            "animate-in fade-in-0 zoom-in-95 duration-150",
            className
          )}
          {...props}
        >
          <div className="flex flex-col gap-1 py-1">{children}</div>
        </div>
      </div>,
      document.body
    )
  }
)
SelectContent.displayName = "SelectContent"

// ---------------------------------------------------------------------------
// Item
// ---------------------------------------------------------------------------

const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
  (
    { className, children, value, disabled = false, onClick, ...props },
    ref
  ) => {
    const {
      value: selected,
      selectValue,
      syncLabel,
      disabled: rootDisabled,
    } = useSelectContext("SelectItem")

    const isSelected = selected === value
    const isDisabled = disabled || rootDisabled

    // If this option is already selected on mount (defaultValue / controlled),
    // push its label into the trigger. Depend on value/isSelected only —
    // not `children` — to avoid re-render loops from new element identities.
    React.useLayoutEffect(() => {
      if (isSelected) syncLabel(value, children)
      // eslint-disable-next-line react-hooks/exhaustive-deps -- see comment above
    }, [isSelected, value, syncLabel])

    return (
      <div
        ref={ref}
        role="option"
        aria-selected={isSelected}
        aria-disabled={isDisabled || undefined}
        tabIndex={isDisabled ? undefined : -1}
        data-slot="select-item"
        data-state={isSelected ? "checked" : "unchecked"}
        data-disabled={isDisabled ? "" : undefined}
        onClick={(event) => {
          onClick?.(event)
          if (event.defaultPrevented || isDisabled) return
          selectValue(value, children)
        }}
        onKeyDown={(event) => {
          if (isDisabled) return
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault()
            selectValue(value, children)
          }
        }}
        className={cn(
          // Dot indicator via ::after when selected
          "text-t-secondary relative flex cursor-pointer items-center justify-between rounded-xl py-2 pr-5.5 pl-2.25 text-sm transition-colors select-none",
          "hover:text-t-primary",
          "after:bg-t-blue after:absolute after:top-1/2 after:right-2.5 after:size-2 after:-translate-y-1/2 after:rounded-full after:opacity-0 after:transition-opacity",
          "data-[state=checked]:text-t-primary data-[state=checked]:after:opacity-100",
          "data-disabled:pointer-events-none data-disabled:cursor-not-allowed data-disabled:opacity-50",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
SelectItem.displayName = "SelectItem"

// ---------------------------------------------------------------------------
// Kit — thin wrapper when you only have a flat options list
// ---------------------------------------------------------------------------

function SelectKit({
  options,
  value,
  defaultValue,
  onValueChange,
  placeholder,
  disabled,
  className,
  classNameTrigger,
  size,
}: SelectKitProps) {
  return (
    <Select
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      placeholder={placeholder}
      disabled={disabled}
      className={className}
    >
      <SelectTrigger className={classNameTrigger} size={size}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectKit,
}
