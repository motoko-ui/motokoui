import type * as React from "react"
import type { MDXComponents } from "mdx/types"

import { cn } from "@/lib/utils"
import { Callout } from "@/components/callout"
import { CodeBlockCommand } from "@/components/code-block-command"
import { ComponentPreview } from "@/components/component-preview"
import { ComponentsList } from "@/components/components-list"
import { CopyButton } from "@/components/copy-button"

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    Callout,
    ComponentPreview,
    ComponentsList,
    Step: ({ className, ...props }: React.ComponentProps<"h3">) => (
      <h3
        className={cn(
          "mt-8 scroll-m-32 text-xl font-medium tracking-tight",
          className
        )}
        {...props}
      />
    ),
    Steps: ({ className, ...props }: React.ComponentProps<"div">) => (
      <div
        className={cn(
          "[&>h3]:step steps mb-12 [counter-reset:step]",
          className
        )}
        {...props}
      />
    ),
    pre: ({ className, children, ...props }: React.ComponentProps<"pre">) => (
      <pre
        className={cn(
          "no-scrollbar min-w-0 overflow-x-auto px-4 py-3.5 outline-none has-data-highlighted-line:px-0 has-data-line-numbers:px-0 has-data-[slot=tabs]:p-0",
          className
        )}
        {...props}
      >
        {children}
      </pre>
    ),
    code: ({
      className,
      __raw__,
      __npm__,
      __yarn__,
      __pnpm__,
      __bun__,
      ...props
    }: React.ComponentProps<"code"> & {
      __raw__?: string
      __npm__?: string
      __yarn__?: string
      __pnpm__?: string
      __bun__?: string
    }) => {
      if (typeof props.children === "string") {
        return (
          <code
            className={cn(
              "bg-muted relative rounded-md px-[0.3rem] py-[0.2rem] font-mono text-[0.8rem] wrap-break-word outline-none",
              className
            )}
            {...props}
          />
        )
      }

      const isNpmCommand = __npm__ && __yarn__ && __pnpm__ && __bun__
      if (isNpmCommand) {
        return (
          <CodeBlockCommand
            __npm__={__npm__}
            __yarn__={__yarn__}
            __pnpm__={__pnpm__}
            __bun__={__bun__}
          />
        )
      }

      return (
        <>
          {__raw__ ? (
            <CopyButton
              value={__raw__}
              className="absolute top-3 right-2 z-10"
            />
          ) : null}
          <code {...props} />
        </>
      )
    },
    ...components,
  }
}

export const mdxComponents = getMDXComponents()

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return getMDXComponents(components)
}
