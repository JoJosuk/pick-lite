"use client";
import NavbarNext from "../components/NavbarNext";
import Tagbar from "../components/Tagbar";
import { BackgroundGradientAnimation } from "../components/ui/background-gradient-animation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Card from "../components/Card";
import {
  validateUser,
  fetchData,
  fetchTags,
} from "../components/functions/index";
export default function Dashboard() {
  const router = useRouter();
  const [constResultList, setConstResultList] = useState([]);
  const [resultList, setResultList] = useState([]);
  const [tags, setTags] = useState([]);
  const [constTags, setConstTags] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const handleSearchInput = (e) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    const functionCollection = async () => {
      const checkUserValid = await validateUser();
      console.log("check user valid ", checkUserValid);
      if (!checkUserValid) {
        console.log("user not valid");
        router.push("/");
        return;
      }
      const resultListValues = await fetchData();
      console.log("result is list ", resultListValues);
      setResultList(resultListValues);
      setConstResultList(resultListValues);
      const getTags = fetchTags(resultListValues);
      setTags(getTags);
      setConstTags(getTags);
    };
    functionCollection();
  }, []);

  useEffect(() => {}, [searchValue]);
  return (
    <div className=" w-full dark:bg-black bg-white  dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div className=" w-screen min-h-screen antialiased">
        <NavbarNext onSearchInputChange={handleSearchInput} />
        <Tagbar tags={tags} onTagSelect={setTags} />
        <div className="flex z-50 flex-col gap-3 items-center">
          {resultList &&
            resultList.map((item, index) => (
              <Card
                key={index}
                id={item.id}
                title={item.title}
                description={item.description}
                tags={item.tags}
                link={item.link}
              />
              // <div key={index}>
              //   <Card
              //     id={item.id}
              //     title={item.title}
              //     description={item.description}
              //     tags={item.tags}
              //     link={item.link}
              //   />
              //   <Card
              //     id={item.id}
              //     title={item.title}
              //     description={item.description}
              //     tags={item.tags}
              //     link={item.link}
              //   />
              //   <Card
              //     id={item.id}
              //     title={item.title}
              //     description={item.description}
              //     tags={item.tags}
              //     link={item.link}
              //   />
              // </div>
            ))}
        </div>
      </div>
    </div>
  );
}
