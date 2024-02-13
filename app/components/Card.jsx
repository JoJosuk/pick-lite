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
import EditPost from "./EditPost";
import ImageFeature from "./ImageFeature";
export default function Card({
  id,
  title,
  description,
  tags,
  link,
  reloadFunction,
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const handleClose = async () => {
    try {
      const requestBody = { id: id };
      const response = await axios.delete("/api/posts", {
        data: requestBody,
      });
      console.log(response);
      reloadFunction();
      // onClose();
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="relative flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow min-w-unit-9xl md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
      {/* <img
        className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
        src="https://flowbite.com/docs/images/blog/image-4.jpg"
        alt="hey not working image"
      /> */}
      {/* <iframe
        className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
        src="https://owl.purdue.edu/owl/general_writing/grammar/using_articles.html"
        title="hey not working image"
      /> */}
      <ImageFeature link={link} />

      <div className="flex flex-col justify-between w-full p-4 leading-normal ">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-[#F59E0B] w-full ">
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
          {title}
        </Link>
        <div className="flex w-full gap-1">
          <Button
            color="warning"
            onPress={onOpen}
            className="w-full p-2 text-red-800"
            size="lg"
          >
            Delete
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
          </Button>
          <EditPost
            id={id}
            titleTemp={title}
            descriptionTemp={description}
            tagsTemp={tags}
            linkTemp={link}
          />
        </div>
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
                  <Button
                    color="danger"
                    onPress={() => {
                      onClose();
                      handleClose();
                    }}
                  >
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
