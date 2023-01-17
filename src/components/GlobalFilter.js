import React from "react";
import { Input } from "@chakra-ui/react";

export const GlobalFilter = ({ filter, setFilter }) => {
  return (
    <Input
      bg="gray.200"
      fontFamily={"Rubik"}
      color="#A3B0BE"
      borderRadius={8}
      value={filter || ""}
      onChange={(e) => setFilter(e.target.value)}
      placeholder="Search in sample"
    />
  );
};
