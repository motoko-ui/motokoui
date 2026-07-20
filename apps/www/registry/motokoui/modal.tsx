"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"

import { cn } from "@/lib/utils"

/* =============================================================================
 * Modal — Motoko dialog surface
 *
 *   <Modal>
 *     <ModalTrigger asChild><Button>Open</Button></ModalTrigger>
 *     <ModalContent>
 *       <ModalHeader>
 *         <ModalTitle>Title</ModalTitle>
 *         <ModalDescription>…</ModalDescription>
 *       </ModalHeader>
 *       <ModalFooter>
 *         <ModalClose asChild><Button variant="secondary">Cancel</Button></ModalClose>
 *         <Button>Confirm</Button>
 *       </ModalFooter>
 *     </ModalContent>
 *   </Modal>
 * ============================================================================= */

type ModalContextValue = {
  open: boolean
}

const ModalContext = React.createContext<ModalContextValue>({ open: false })

function useModalContext() {
  return React.useContext(ModalContext)
}

export type ModalProps = React.ComponentProps<typeof DialogPrimitive.Root>

function Modal({
  open: openProp,
  defaultOpen,
  onOpenChange,
  ...props
}: ModalProps) {
  const [uncontrolled, setUncontrolled] = React.useState(defaultOpen ?? false)
  const isControlled = openProp !== undefined
  const open = isControlled ? Boolean(openProp) : uncontrolled

  const handleOpenChange = React.useCallback(
    (next: boolean) => {
      if (!isControlled) setUncontrolled(next)
      onOpenChange?.(next)
    },
    [isControlled, onOpenChange]
  )

  return (
    <ModalContext.Provider value={{ open }}>
      <DialogPrimitive.Root
        data-slot="modal"
        open={open}
        onOpenChange={handleOpenChange}
        {...props}
      />
    </ModalContext.Provider>
  )
}

function ModalTrigger({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="modal-trigger" {...props} />
}

function ModalPortal({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="modal-portal" {...props} />
}

function ModalClose({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="modal-close" {...props} />
}

const CONTENT_SPRING = {
  type: "spring" as const,
  duration: 0.35,
  bounce: 0,
}

export type ModalContentProps = Omit<
  React.ComponentProps<typeof DialogPrimitive.Content>,
  "asChild"
> & {
  showCloseButton?: boolean
}

function ModalContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: ModalContentProps) {
  const { open } = useModalContext()

  return (
    <AnimatePresence>
      {open ? (
        <ModalPortal forceMount>
          <DialogPrimitive.Overlay asChild forceMount>
            <motion.div
              data-slot="modal-overlay"
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            />
          </DialogPrimitive.Overlay>

          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <DialogPrimitive.Content asChild forceMount {...props}>
              <motion.div
                data-slot="modal-content"
                className={cn(
                  "bg-background relative grid w-full max-w-md gap-5 rounded-2xl p-6 outline-none",
                  "shadow-[0_24px_64px_-12px_rgba(0,0,0,0.28),0_0_0_1px_rgba(0,0,0,0.06)]",
                  "dark:shadow-[0_24px_64px_-12px_rgba(0,0,0,0.55),0_0_0_1px_rgba(255,255,255,0.08)]",
                  className
                )}
                initial={{
                  opacity: 0,
                  y: 12,
                  scale: 0.97,
                  filter: "blur(4px)",
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  filter: "blur(0px)",
                }}
                exit={{
                  opacity: 0,
                  y: 8,
                  scale: 0.98,
                  filter: "blur(4px)",
                }}
                transition={CONTENT_SPRING}
              >
                {children}
                {showCloseButton ? (
                  <DialogPrimitive.Close
                    data-slot="modal-close-icon"
                    className={cn(
                      "absolute top-4 right-4 inline-flex size-8 cursor-pointer items-center justify-center rounded-[10px]",
                      "text-muted-foreground outline-none",
                      "transition-[background-color,color,transform] duration-200 ease-[cubic-bezier(0.2,0,0,1)]",
                      "hover:text-foreground hover:bg-black/5 active:scale-[0.96]",
                      "focus-visible:ring-ring/50 focus-visible:ring-2",
                      "dark:hover:bg-white/10"
                    )}
                  >
                    <X className="size-4" />
                    <span className="sr-only">Close</span>
                  </DialogPrimitive.Close>
                ) : null}
              </motion.div>
            </DialogPrimitive.Content>
          </div>
        </ModalPortal>
      ) : null}
    </AnimatePresence>
  )
}

export type ModalHeaderProps = React.HTMLAttributes<HTMLDivElement>

function ModalHeader({ className, ...props }: ModalHeaderProps) {
  return (
    <div
      data-slot="modal-header"
      className={cn("flex flex-col gap-1.5 pr-8 text-left", className)}
      {...props}
    />
  )
}

export type ModalFooterProps = React.HTMLAttributes<HTMLDivElement>

function ModalFooter({ className, ...props }: ModalFooterProps) {
  return (
    <div
      data-slot="modal-footer"
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    />
  )
}

export type ModalTitleProps = React.ComponentProps<typeof DialogPrimitive.Title>

function ModalTitle({ className, ...props }: ModalTitleProps) {
  return (
    <DialogPrimitive.Title
      data-slot="modal-title"
      className={cn(
        "text-lg leading-none font-semibold tracking-tight text-balance",
        className
      )}
      {...props}
    />
  )
}

export type ModalDescriptionProps = React.ComponentProps<
  typeof DialogPrimitive.Description
>

function ModalDescription({ className, ...props }: ModalDescriptionProps) {
  return (
    <DialogPrimitive.Description
      data-slot="modal-description"
      className={cn(
        "text-muted-foreground text-sm leading-relaxed text-pretty",
        className
      )}
      {...props}
    />
  )
}

export {
  Modal,
  ModalTrigger,
  ModalPortal,
  ModalClose,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalTitle,
  ModalDescription,
}
