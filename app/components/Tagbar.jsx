"use client";
import { useEffect, useState } from "react";
import { Chip, select } from "@nextui-org/react";
export default function Tagbar({ tags, onTagSelect }) {
  const [selectedTag, setSelectedTag] = useState([]);
  const [orderedTags, setOrderedTags] = useState([...tags]);
  useEffect(() => {
    onTagSelect(selectedTag);
  }, [selectedTag, onTagSelect]);
  useEffect(() => {
    const tempOrderedarray = [];
    tempOrderedarray.push(...selectedTag);
    tags.forEach((tag) => {
      if (!selectedTag.includes(tag)) {
        tempOrderedarray.push(tag);
      }
    });
    setOrderedTags(tempOrderedarray);
  }, [selectedTag, tags]);
  return (
    <div
      className="z-40 flex w-screen gap-4 p-3 overflow-x-scroll bg-black hide-scroll-bar"
      style={{ backgroundColor: "black" }}
    >
      {orderedTags.map((tag, index) => (
        <Chip
          className="z-50 transition-shadow duration-100 ease-in-out cursor-pointer"
          key={index}
          color="warning"
          variant={selectedTag.includes(tag) ? "solid" : "bordered"}
          onClick={() => {
            console.log("tag is ", tag);
            if (selectedTag.includes(tag)) {
              setSelectedTag(selectedTag.filter((t) => t !== tag));
            } else {
              setSelectedTag([...selectedTag, tag]);
            }
          }}
          {...(selectedTag.includes(tag)
            ? {
                onClose: () =>
                  setSelectedTag(selectedTag.filter((t) => t !== tag)),
              }
            : {})}
        >
          {tag}
        </Chip>
      ))}
    </div>
  );
}
