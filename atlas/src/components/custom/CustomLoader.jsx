import React, { useEffect } from 'react';
import {  useDisclosure, Modal,  ModalContent,  ModalHeader,  ModalBody,  ModalFooter} from "@nextui-org/modal";

function CustomLoader({isLoading}) {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    useEffect(()=>{
        onOpen();
    }, [])
    return (
        <div>
            { isLoading && <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                {(onClose) => (
                    <>
                    <ModalBody>
                    <img
                        src='/create-trip-icons/create-trip.gif'
                        alt='create-trip'
                        className="w-96 h-96 mx-auto"
                    />
                    <h2 className="text-center text-2xl font-bold text-gray-800">Planning Your Trip</h2>
                    <h4 className="text-center text-lg text-gray-600">This usually takes about 2 minutes</h4>
                    </ModalBody>
                    </>
                )}
                </ModalContent>
            </Modal> }
        </div>
  )
}

export default CustomLoader