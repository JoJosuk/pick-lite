import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
  Link,
  Textarea,
  Chip,
} from "@nextui-org/react";
import axios from "axios";
import { useState } from "react";
export default function NewPost({ reloadFunction }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [tagvalue, setTagvalue] = useState("");
  const [tags, setTags] = useState([]);

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

  const handleNewPost = async () => {
    setDescription("");
    setTitle("");
    setLink("");
    setTags([]);
    try {
      const requestBody = {
        title: title,
        description: description,
        link: link,
        imglink: "",
        tags: tags,
      };
      const response = await axios.post("/api/posts", requestBody);
      console.log(response);
      reloadFunction();
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="flex items-center justify-center w-screen p-2">
      <Button onPress={onOpen} color="warning" size="lg">
        Create New Post
      </Button>
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
                New Post
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
                    handleNewPost();
                    onClose();
                  }}
                >
                  Post
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
