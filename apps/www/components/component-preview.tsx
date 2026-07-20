import { Suspense } from "react"
import { ButtonDemo } from "@/registry/example/button-demo"
import { InputDemo } from "@/registry/example/input-demo"
import { ModalDemo } from "@/registry/example/modal-demo"
import { NotchDemo } from "@/registry/example/notch-demo"
import { RainbowButtonDemo } from "@/registry/example/rainbow-button-demo"
import { SelectDemo } from "@/registry/example/select-demo"
import { TabsDemo } from "@/registry/example/tabs-demo"
import { TooltipDemo } from "@/registry/example/tooltip-demo"

import { readDemoCode, type DemoName } from "@/lib/demo-source"
import { ComponentPreviewTabs } from "@/components/component-preview-tabs"
import { ComponentSource } from "@/components/component-source"

const demos = {
  "button-demo": ButtonDemo,
  "rainbow-button-demo": RainbowButtonDemo,
  "input-demo": InputDemo,
  "select-demo": SelectDemo,
  "tabs-demo": TabsDemo,
  "notch-demo": NotchDemo,
  "modal-demo": ModalDemo,
  "tooltip-demo": TooltipDemo,
} as const satisfies Record<DemoName, React.ComponentType>

export async function ComponentPreview({
  name,
  className,
  align = "center",
  hideCode = false,
  ...props
}: React.ComponentProps<"div"> & {
  name: DemoName
  align?: "center" | "start" | "end"
  hideCode?: boolean
}) {
  const Demo = demos[name]

  if (!Demo) {
    return (
      <p className="text-muted-foreground text-sm">
        Component{" "}
        <code className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm">
          {name}
        </code>{" "}
        not found in registry.
      </p>
    )
  }

  const code = await readDemoCode(name)

  return (
    <ComponentPreviewTabs
      className={className}
      align={align}
      hideCode={hideCode}
      code={code}
      component={<Demo />}
      source={
        <Suspense
          fallback={
            <div className="text-muted-foreground flex min-h-[350px] items-center justify-center p-4 text-sm">
              Loading code…
            </div>
          }
        >
          <ComponentSource code={code} />
        </Suspense>
      }
      {...props}
    />
  )
}
