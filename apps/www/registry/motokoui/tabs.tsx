"use client"

import * as React from "react"
import { LayoutGroup, motion } from "motion/react"

import { cn } from "@/lib/utils"

/* =============================================================================
 * Tabs — animated pill tabs for Motoko UI
 *
 * Same interaction language as Preview/Code in docs:
 * soft pill indicator + short content fade-in.
 *
 *   <Tabs defaultValue="account">
 *     <TabsList>
 *       <TabsTrigger value="account">Account</TabsTrigger>
 *       <TabsTrigger value="password">Password</TabsTrigger>
 *     </TabsList>
 *     <TabsContent value="account">…</TabsContent>
 *     <TabsContent value="password">…</TabsContent>
 *   </Tabs>
 * ============================================================================= */

type TabsContextValue = {
  value: string
  setValue: (value: string) => void
  layoutId: string
}

const TabsContext = React.createContext<TabsContextValue | null>(null)

function useTabs() {
  const ctx = React.useContext(TabsContext)
  if (!ctx) {
    throw new Error("Tabs components must be used within <Tabs>")
  }
  return ctx
}

const AnimationContext = React.createContext(false)

function useDisableAnimation() {
  return React.useContext(AnimationContext)
}

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Controlled active tab value. */
  value?: string
  /** Initial value for uncontrolled mode. */
  defaultValue?: string
  /** Fires when the active tab changes. */
  onValueChange?: (value: string) => void
  /** Disable content enter motion. */
  disableAnimation?: boolean
}

function Tabs({
  className,
  value: valueProp,
  defaultValue = "",
  onValueChange,
  disableAnimation = false,
  children,
  ...props
}: TabsProps) {
  const [uncontrolled, setUncontrolled] = React.useState(defaultValue)
  const isControlled = valueProp !== undefined
  const value = isControlled ? valueProp : uncontrolled
  const layoutId = React.useId()

  const setValue = React.useCallback(
    (next: string) => {
      if (!isControlled) {
        setUncontrolled(next)
      }
      onValueChange?.(next)
    },
    [isControlled, onValueChange]
  )

  const ctx = React.useMemo(
    () => ({ value, setValue, layoutId }),
    [value, setValue, layoutId]
  )

  return (
    <TabsContext.Provider value={ctx}>
      <AnimationContext.Provider value={disableAnimation}>
        <div
          data-slot="tabs"
          className={cn("flex flex-col gap-3", className)}
          {...props}
        >
          {children}
        </div>
      </AnimationContext.Provider>
    </TabsContext.Provider>
  )
}

export type TabsListProps = React.HTMLAttributes<HTMLDivElement>

function TabsList({ className, onKeyDown, children, ...props }: TabsListProps) {
  const { setValue, layoutId } = useTabs()

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(event)
    if (event.defaultPrevented) return

    const tabs = Array.from(
      event.currentTarget.querySelectorAll<HTMLButtonElement>(
        '[role="tab"]:not([disabled])'
      )
    )
    if (tabs.length === 0) return

    const currentIndex = tabs.findIndex((tab) => tab === document.activeElement)
    if (currentIndex < 0) return

    let nextIndex = currentIndex
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      nextIndex = (currentIndex + 1) % tabs.length
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      nextIndex = (currentIndex - 1 + tabs.length) % tabs.length
    } else if (event.key === "Home") {
      nextIndex = 0
    } else if (event.key === "End") {
      nextIndex = tabs.length - 1
    } else {
      return
    }

    event.preventDefault()
    const next = tabs[nextIndex]
    const nextValue = next.dataset.value
    if (nextValue) {
      setValue(nextValue)
      next.focus()
    }
  }

  return (
    <LayoutGroup id={layoutId}>
      <div
        data-slot="tabs-list"
        role="tablist"
        onKeyDown={handleKeyDown}
        className={cn(
          "relative inline-flex h-9 w-fit items-center rounded-xl p-1",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </LayoutGroup>
  )
}

export interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string
}

function TabsTrigger({
  className,
  value,
  disabled,
  children,
  ...props
}: TabsTriggerProps) {
  const { value: active, setValue, layoutId } = useTabs()
  const isActive = active === value

  return (
    <button
      type="button"
      role="tab"
      data-slot="tabs-trigger"
      data-value={value}
      data-state={isActive ? "active" : "inactive"}
      aria-selected={isActive}
      tabIndex={isActive ? 0 : -1}
      disabled={disabled}
      onClick={() => {
        if (!disabled) setValue(value)
      }}
      className={cn(
        "relative z-10 cursor-pointer rounded-xl px-3.5 py-1.5 text-sm font-medium transition-colors",
        "focus-visible:ring-ring/50 outline-none focus-visible:ring-2",
        "disabled:pointer-events-none disabled:opacity-50",
        isActive
          ? "text-foreground"
          : "text-muted-foreground hover:text-foreground",
        className
      )}
      {...props}
    >
      {isActive ? (
        <motion.span
          layoutId={`${layoutId}-pill`}
          className="bg-background absolute inset-0 rounded-xl shadow-sm ring-1 ring-black/5 dark:ring-white/10"
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 30,
          }}
        />
      ) : null}
      <span className="relative z-10">{children}</span>
    </button>
  )
}

export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
  /** Keep inactive panels mounted (hidden). */
  forceMount?: boolean
}

function TabsContent({
  className,
  value,
  forceMount = false,
  children,
  ...props
}: TabsContentProps) {
  const { value: active } = useTabs()
  const disableAnimation = useDisableAnimation()
  const isActive = active === value

  if (!forceMount && !isActive) {
    return null
  }

  if (disableAnimation || !isActive) {
    return (
      <div
        role="tabpanel"
        data-slot="tabs-content"
        data-state={isActive ? "active" : "inactive"}
        hidden={!isActive}
        className={cn("flex-1 outline-none", className)}
        {...props}
      >
        {children}
      </div>
    )
  }

  return (
    <div
      role="tabpanel"
      data-slot="tabs-content"
      data-state="active"
      className={cn("flex-1 outline-none", className)}
      {...props}
    >
      <motion.div
        key={value}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </div>
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
