"use client";
import { BackgroundBeams } from "../components/ui/background-beams";
import NavbarNext from "../components/NavbarNext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  validateUser,
  fetchData,
  fetchTags,
} from "../components/functions/index";
export default function Dashboard() {
  const router = useRouter();
  const [resultList, setResultList] = useState([]);
  const [tags, setTags] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const handleSearchInput = (e) => {
    setSearchValue(e.target.value);
    console.log("search value is ", searchValue);
  };
  useEffect(() => {
    const functionCollection = async () => {
      if (await !validateUser()) router.push("/");
      const resultListValues = await fetchData();
      console.log("result is list ", resultListValues);
      setResultList(resultListValues);
      setTags(fetchTags(resultListValues));
    };
    functionCollection();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div className="w-screen min-h-screen bg-black">
        <NavbarNext onSearchInputChange={handleSearchInput} />
      </div>
      <BackgroundBeams />
    </>
  );
}
