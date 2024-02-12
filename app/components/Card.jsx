/* eslint-disable @next/next/no-img-element */
"use client";
import { Chip, Link } from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import axios from "axios";
export default function Card({ id, title, description, tags, link }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const handleClose = async () => {
    try {
      const requestBody = { id: id };
      const response = await axios.delete("/api/posts", {
        data: requestBody,
      });
      console.log(response);
      onClose();
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div
      href="#"
      className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow min-w-unit-8xl md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
    >
      <img
        className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
        src="https://flowbite.com/docs/images/blog/image-4.jpg"
        alt="hey not working image"
      />

      <div className="flex flex-col justify-between p-4 leading-normal ">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-[#F59E0B] ">
          {title}
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {description}
        </p>
        <div className="flex flex-wrap gap-1">
          {tags.map((tag, index) => (
            <Chip key={index} color="warning" variant="flat" size="sm">
              {tag}
            </Chip>
          ))}
        </div>
        <Link
          className="p-1 pt-3"
          color="warning"
          isExternal
          showAnchorIcon
          href={link}
          // anchorIcon={<AnchorIcon />}
        >
          Custom Icon
        </Link>
        <Button color="warning" onPress={onOpen}>
          Open Modal
        </Button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Delete Link
                </ModalHeader>
                <ModalBody>
                  <p>
                    You sure that You want to delete this link? This action is
                    non reversible
                  </p>
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="danger" onPress={handleClose}>
                    Action
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
}
