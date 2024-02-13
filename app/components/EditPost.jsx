import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Chip,
  Textarea,
} from "@nextui-org/react";
import { useState } from "react";
import axios from "axios";
export default function EditPost({
  id,
  titleTemp,
  descriptionTemp,
  tagsTemp,
  linkTemp,
}) {
  const [reload, setReload] = useState(false);
  const [title, setTitle] = useState(titleTemp);
  const [description, setDescription] = useState(descriptionTemp);
  const [link, setLink] = useState(linkTemp);
  const [tagvalue, setTagvalue] = useState("");
  const [tags, setTags] = useState(tagsTemp);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleTags = (e) => {
    if (e.key === "Enter") {
      setTagvalue("");
      const lowerCaseTag = tagvalue.toLowerCase();
      if (tags.includes(lowerCaseTag)) {
        return;
      }
      setTags([...tags, lowerCaseTag]);
    }
  };

  const handlePostUpdate = async () => {
    try {
      const requestBody = {
        id: id,
        title: title,
        description: description,
        link: link,
        tags: tags,
      };
      const response = await axios.post("/api/posts", requestBody);
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <div
        className="absolute cursor-pointer right-4 bottom-4"
        onClick={onOpen}
      >
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
            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
          />
        </svg>
      </div>
      <Modal
        size="5xl"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Edit Post
              </ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  //   endContent={
                  //     <MailIcon className="flex-shrink-0 text-2xl pointer-events-none text-default-400" />
                  //   }
                  label="Title"
                  placeholder="Enter Title of the website"
                  variant="bordered"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <Textarea
                  //   endContent={
                  //     <LockIcon className="flex-shrink-0 text-2xl pointer-events-none text-default-400" />
                  //   }
                  label="Description"
                  placeholder="Describe the website"
                  variant="bordered"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <Input
                  label="Link"
                  placeholder="Enter the link of the website"
                  variant="bordered"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                />
                <div className="flex flex-wrap gap-2">
                  {tags &&
                    tags.map((tag, index) => (
                      <Chip
                        className="cursor-pointer"
                        key={index}
                        color="warning"
                        variant="flat"
                        size="sm"
                        onClose={() => {}}
                        onClick={() => {
                          setTags(tags.filter((t) => t !== tag));
                        }}
                      >
                        {tag}
                      </Chip>
                    ))}
                </div>
                <Input
                  label="Tags"
                  placeholder="Enter the tags of the website"
                  variant="bordered"
                  onKeyDown={handleTags}
                  value={tagvalue}
                  onChange={(e) => setTagvalue(e.target.value)}
                />
                <div className="flex justify-between px-1 py-2"></div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    handlePostUpdate();
                    onClose();
                  }}
                >
                  Edit Post
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
