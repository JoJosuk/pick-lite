"use client";
import { BackgroundBeams } from "../components/ui/background-beams";
import NavbarNext from "../components/NavbarNext";
import Tagbar from "../components/Tagbar";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  validateUser,
  fetchData,
  fetchTags,
} from "../components/functions/index";
export default function Dashboard() {
  const router = useRouter();
  const [constResultList, setConstResultList] = useState([]); // eslint-disable-next-line no-unused-vars
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
      <BackgroundBeams />
      <div className=" w-screen min-h-screen antialiased">
        <NavbarNext onSearchInputChange={handleSearchInput} />
        <Tagbar tags={tags} onTagSelect={setTags} />
        <div className="w-1/2 bg-white z-50">hello</div>
      </div>
    </div>
  );
}
