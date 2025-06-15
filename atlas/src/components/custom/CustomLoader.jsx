import React, { useEffect } from "react";
import {
  useDisclosure,
  Modal,
  ModalContent,
  ModalBody,
} from "@nextui-org/modal";

function CustomLoader({ isLoading }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    if (isLoading) {
      onOpen();
    }
  }, [isLoading]);

  return (
    <div>
      {isLoading && (
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          isDismissable={false}
          closeOnEsc={false}
          backdrop="blur"
          hideCloseButton
        >
          <ModalContent>
            {() => (
              <>
                <ModalBody className="flex flex-col items-center space-y-4 p-4">
                  <img
                    src="/create-trip-icons/create-trip.gif"
                    alt="create-trip"
                    className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 mx-auto"
                  />
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800 text-center">
                    Planning Your Trip
                  </h2>
                  <h4 className="text-base sm:text-lg text-gray-600 text-center">
                    This usually takes about 2 minutes
                  </h4>
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
      )}
    </div>
  );
}

export default CustomLoader;
