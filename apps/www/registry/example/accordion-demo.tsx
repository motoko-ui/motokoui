import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/registry/motokoui/accordion"

export function AccordionDemo() {
  return (
    <Accordion
      type="single"
      collapsible
      defaultValue="item-1"
      className="w-full max-w-md"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger>What is Motoko UI?</AccordionTrigger>
        <AccordionContent>
          A polished React component registry — Motoko surfaces, soft motion,
          and copy-paste installs via the shadcn CLI.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>How do I install a component?</AccordionTrigger>
        <AccordionContent>
          Run{" "}
          <code className="bg-muted rounded px-1.5 py-0.5 font-mono text-[0.8rem]">
            npx shadcn@latest add @motokoui/accordion
          </code>{" "}
          and the files land in your project with dependencies resolved.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Can more than one panel be open?</AccordionTrigger>
        <AccordionContent>
          Yes — set{" "}
          <code className="bg-muted rounded px-1.5 py-0.5 font-mono text-[0.8rem]">
            type=&quot;multiple&quot;
          </code>{" "}
          on the root to keep several items expanded at once.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
