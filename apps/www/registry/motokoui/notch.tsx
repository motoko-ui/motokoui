"use client"

import * as React from "react"
import { AnimatePresence, motion } from "motion/react"

import { cn } from "@/lib/utils"

/* =============================================================================
 * Notch — morphing bottom toolbar for Motoko UI
 *
 * The shell itself expands via layout animation. Opening a group swaps the
 * trigger row for a staggered options list (AnimatePresence popLayout) —
 * no detached dropdown, nothing clipped by the bar width.
 * ============================================================================= */

export type NotchOption = {
  /** Stable identifier passed back in callbacks. */
  id: string
  /** What renders for this option. */
  label: React.ReactNode
  /** Optional leading node (icon, swatch, etc.). */
  icon?: React.ReactNode
}

export type NotchItem = {
  /** Stable identifier for the group. */
  id: string
  /** Trigger label shown in the bar. */
  label: React.ReactNode
  /** Optional leading icon for the trigger. */
  icon?: React.ReactNode
  /** The choices revealed when the group is opened. */
  options: NotchOption[]
  /** Uncontrolled initial selected option id. */
  defaultValue?: string
  /** Controlled selected option id. */
  value?: string
  /** Show the selected value next to the trigger label. */
  showValue?: boolean
  /** Fires with the selected option whenever it changes. */
  onChange?: (optionId: string, option: NotchOption) => void
}

export interface NotchProps {
  /** The groups shown inside the notch. */
  items: NotchItem[]
  /**
   * `bottom` / `top` pin to the viewport.
   * `inline` keeps the shell in normal flow (docs previews).
   */
  position?: "top" | "bottom" | "inline"
  /** Horizontal alignment when pinned. */
  align?: "start" | "center" | "end"
  /** Fired for any group change, in addition to the per-item callback. */
  onItemChange?: (itemId: string, optionId: string, option: NotchOption) => void
  /** Close the panel after selecting an option. */
  closeOnSelect?: boolean
  /** Show each group's selected value next to its trigger label. */
  showSelectedValue?: boolean
  /** Render dividers between groups. */
  showDividers?: boolean
  /** Distance from the pinned edge, in pixels. */
  offset?: number
  /** Play the entrance animation on mount. */
  reveal?: boolean
  /** Classes applied to the floating shell. */
  className?: string
  /** Classes applied to every trigger. */
  itemClassName?: string
  /** Classes applied to the options panel. */
  panelClassName?: string
}

const SHELL_SPRING = { type: "spring" as const, stiffness: 380, damping: 34 }

const LIST_VARIANTS = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.045, delayChildren: 0.08 } },
}

const OPTION_VARIANTS = {
  hidden: { opacity: 0, y: -10, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring" as const, stiffness: 420, damping: 30 },
  },
}

function NotchDivider() {
  return (
    <span
      aria-hidden
      data-slot="notch-divider"
      className="mx-0.5 h-5 w-px shrink-0 self-center bg-white/15"
    />
  )
}

function Notch({
  items,
  position = "bottom",
  align = "center",
  onItemChange,
  closeOnSelect = true,
  showSelectedValue = true,
  showDividers = true,
  offset = 24,
  reveal = true,
  className,
  itemClassName,
  panelClassName,
}: NotchProps) {
  const shellRef = React.useRef<HTMLDivElement>(null)
  const shellLayoutId = React.useId()
  const [openItemId, setOpenItemId] = React.useState<string | null>(null)
  const [internalSelected, setInternalSelected] = React.useState<
    Record<string, string>
  >(() => {
    const map: Record<string, string> = {}
    for (const item of items) {
      if (item.value === undefined) {
        map[item.id] = item.defaultValue ?? item.options[0]?.id ?? ""
      }
    }
    return map
  })

  React.useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenItemId(null)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  React.useEffect(() => {
    if (!openItemId) return
    function onPointerDown(e: PointerEvent) {
      if (!shellRef.current?.contains(e.target as Node)) setOpenItemId(null)
    }
    document.addEventListener("pointerdown", onPointerDown)
    return () => document.removeEventListener("pointerdown", onPointerDown)
  }, [openItemId])

  const getSelectedId = (item: NotchItem) =>
    item.value ?? internalSelected[item.id] ?? item.options[0]?.id

  const getSelectedOption = (item: NotchItem) =>
    item.options.find((o) => o.id === getSelectedId(item))

  const handleSelect = (item: NotchItem, option: NotchOption) => {
    if (item.value === undefined) {
      setInternalSelected((prev) => ({ ...prev, [item.id]: option.id }))
    }
    item.onChange?.(option.id, option)
    onItemChange?.(item.id, option.id, option)
    if (closeOnSelect) setOpenItemId(null)
  }

  const alignClass =
    align === "start"
      ? "justify-start"
      : align === "end"
        ? "justify-end"
        : "justify-center"

  const edgeOffset = (offset + 20) * (position === "top" ? -1 : 1)
  const openItem = items.find((i) => i.id === openItemId) ?? null

  const optionsPanel = openItem ? (
    <motion.div
      key={openItem.id}
      role="listbox"
      aria-label={
        typeof openItem.label === "string" ? openItem.label : openItem.id
      }
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className={cn("w-fit", panelClassName)}
    >
      <motion.div
        className="flex flex-col gap-1 p-1.5"
        variants={LIST_VARIANTS}
        initial="hidden"
        animate="visible"
      >
        {openItem.options.map((option) => {
          const active = option.id === getSelectedId(openItem)
          return (
            <motion.button
              key={option.id}
              role="option"
              aria-selected={active}
              type="button"
              variants={OPTION_VARIANTS}
              onClick={() => handleSelect(openItem, option)}
              className={cn(
                "flex w-full items-center justify-between gap-6 rounded-[10px] px-3 py-2 text-left text-sm font-medium whitespace-nowrap transition-colors",
                active
                  ? "bg-white/14 text-white"
                  : "text-white/70 hover:bg-white/8 hover:text-white"
              )}
            >
              <span className="flex items-center gap-2.5">
                {option.icon ? (
                  <span className="flex shrink-0 items-center justify-center [&_svg:not([class*='size-'])]:size-4">
                    {option.icon}
                  </span>
                ) : null}
                <span>{option.label}</span>
              </span>
              {active ? (
                <span className="size-1.5 shrink-0 rounded-full bg-white" />
              ) : null}
            </motion.button>
          )
        })}
      </motion.div>
    </motion.div>
  ) : (
    <motion.div
      key="__notch-triggers"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className="flex w-fit items-center gap-0.5 p-1.5"
    >
      {items.map((item, index) => {
        const selected = getSelectedOption(item)
        const isLast = index === items.length - 1

        return (
          <React.Fragment key={item.id}>
            <button
              type="button"
              aria-haspopup="listbox"
              aria-expanded={false}
              onClick={() => setOpenItemId(item.id)}
              className={cn(
                "group inline-flex items-center gap-2 rounded-[10px] px-3 py-2 text-sm font-medium whitespace-nowrap text-white/90 transition-colors hover:bg-white/12 hover:text-white",
                "active:scale-[0.96]",
                itemClassName
              )}
            >
              {item.icon ? (
                <span className="flex shrink-0 items-center justify-center [&_svg:not([class*='size-'])]:size-4">
                  {item.icon}
                </span>
              ) : null}
              <span>{item.label}</span>
              {(item.showValue ?? showSelectedValue) && selected ? (
                <span className="text-white/45">{selected.label}</span>
              ) : null}
            </button>
            {showDividers && !isLast ? <NotchDivider /> : null}
          </React.Fragment>
        )
      })}
    </motion.div>
  )

  const shell = (
    <motion.div
      ref={shellRef}
      layoutId={shellLayoutId}
      layout
      data-slot="notch"
      role="toolbar"
      initial={
        reveal ? { opacity: 0, y: edgeOffset, filter: "blur(6px)" } : false
      }
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={SHELL_SPRING}
      className={cn(
        "flex w-fit flex-col overflow-hidden rounded-2xl",
        "bg-[#141414] text-white",
        "shadow-[0_8px_30px_rgba(0,0,0,0.28),0_0_0_1px_rgba(255,255,255,0.06)]",
        className
      )}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        {optionsPanel}
      </AnimatePresence>
    </motion.div>
  )

  if (position === "inline") {
    return shell
  }

  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-x-0 z-50 flex px-4",
        position === "top" ? "top-0" : "bottom-0",
        alignClass
      )}
      style={
        position === "top"
          ? { paddingTop: `max(${offset}px, env(safe-area-inset-top))` }
          : {
              paddingBottom: `max(${offset}px, env(safe-area-inset-bottom))`,
            }
      }
    >
      <div className="pointer-events-auto">{shell}</div>
    </div>
  )
}

export { Notch, NotchDivider }
