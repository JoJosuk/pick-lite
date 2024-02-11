"use client";
import NavbarNext from "../components/NavbarNext";
import Tagbar from "../components/Tagbar";
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
      if (!checkUserValid) router.push("/");
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
    <div>
      <div className=" w-screen min-h-screen antialiased">
        <NavbarNext onSearchInputChange={handleSearchInput} />
        <Tagbar tags={tags} onTagSelect={setTags} />
        <div className="flex z-50 flex-col gap-3 items-center">
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </div>
    </div>
  );
}
