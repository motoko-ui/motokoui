"use client"

import * as React from "react"
import { Button } from "@/registry/motokoui/button"
import {
  Modal,
  ModalClose,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
} from "@/registry/motokoui/modal"

export function ModalDemo() {
  const [open, setOpen] = React.useState(false)

  return (
    <Modal open={open} onOpenChange={setOpen}>
      <ModalTrigger asChild>
        <Button>Open modal</Button>
      </ModalTrigger>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Confirm changes</ModalTitle>
          <ModalDescription>
            This will update your workspace settings. You can undo this later
            from the activity log.
          </ModalDescription>
        </ModalHeader>
        <ModalFooter>
          <ModalClose asChild>
            <Button variant="secondary">Cancel</Button>
          </ModalClose>
          <Button onClick={() => setOpen(false)}>Save changes</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
