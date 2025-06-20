import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/react";
import React from "react";

export const AddUser = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div>
      <>
        <Button
          onPress={onOpen}
          className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
        >
          Tambah User
        </Button>
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          placement="top-center"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Add User
                </ModalHeader>
                <ModalBody>
                  <Input label="Email" variant="bordered" />
                  <Input label="First Name" variant="bordered" />
                  <Input label="Last Name" variant="bordered" />
                  <Input label="Phone Number" variant="bordered" />

                  <Input label="Password" type="password" variant="bordered" />
                  <Input
                    label="Confirm Password"
                    type="password"
                    variant="bordered"
                  />
                </ModalBody>
                <ModalFooter>
                  <Button
                    variant="flat"
                    onPress={onClose}
                    className="bg-gradient-to-r from-red-100 to-red-200 hover:from-red-200 hover:to-red-300 text-red-700 font-semibold"
                  >
                    Close
                  </Button>
                  <Button
                    onPress={onClose}
                    className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Add User
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    </div>
  );
};
