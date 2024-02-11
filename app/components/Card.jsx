/* eslint-disable @next/next/no-img-element */
import { Chip, Link } from "@nextui-org/react";
export default function Card() {
  const tags = ["React", "Next.js", "Tailwind CSS"];
  return (
    <div
      href="#"
      className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
    >
      <img
        className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
        src="https://flowbite.com/docs/images/blog/image-4.jpg"
        alt="hey not working image"
      />

      <div className="flex flex-col justify-between p-4 leading-normal">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-[#F59E0B]">
          Noteworthy technology acquisitions 2021
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          Here are the biggest enterprise technology acquisitions of 2021 so
          far, in reverse chronological order.
        </p>
        <div className="flex flex-wrap gap-1">
          {tags.map((tag, index) => (
            <Chip key={index} color="warning" variant="flat" size="sm">
              {tag}
            </Chip>
          ))}
        </div>
        <Link
          className="pt-3 p-1"
          color="warning"
          isExternal
          showAnchorIcon
          href="https://github.com/nextui-org/nextui"
          // anchorIcon={<AnchorIcon />}
        >
          Custom Icon
        </Link>
      </div>
    </div>
  );
}
