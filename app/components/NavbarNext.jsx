"use client";
// eslint-disable-next-line no-unused-vars
import { useState } from "react";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Input,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import PickliteLogo from "./PickliteLogo";
import SearchIcon from "./SearchIcon";
import axios from "axios";
export default function NavbarNext({ onSearchInputChange }) {
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();
  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
    onSearchInputChange(e);
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post("/api/logout");
      console.log(response.data());
      router.push("/");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Navbar className="pb-2">
      <NavbarBrand>
        <PickliteLogo />

        <p className="font-bold  text-[#F59E0B] text-xl">Pick-Lite</p>
      </NavbarBrand>

      <NavbarContent
        className="hidden gap-4 sm:flex"
        justify="center"
      ></NavbarContent>

      <NavbarContent as="div" justify="end">
        <Input
          classNames={{
            base: "max-w-full sm:max-w-[10rem] h-10",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper:
              "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="Type to search..."
          size="sm"
          startContent={<SearchIcon size={18} />}
          type="search"
          value={searchValue}
          onChange={handleInputChange}
        />
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="Jason Hughes"
              size="sm"
              src="https://www.shutterstock.com/image-vector/default-avatar-profile-icon-vector-600nw-1725655669.jpg"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            {/* <DropdownItem key="profile" className="gap-2 h-14">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">zoey@example.com</p>
            </DropdownItem> */}

            <DropdownItem key="logout" color="danger" onClick={handleLogout}>
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}
