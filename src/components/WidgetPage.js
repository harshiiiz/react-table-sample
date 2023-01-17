import React from "react";
import { Heading, Text, Flex } from "@chakra-ui/react";
import BasicTable from "../components/BasicTable";
import { COLUMNS } from "../components/columns";
import MOCK_DATA from "../components/MOCK_DATA.json";
const WidgetPage = (props) => {
  const renderRowSubComponent = ({ row }) => (
    <span
      style={{
        fontSize: "14px",
        fontFamily: "Roboto Mono",
        color: "#333333",
      }}
    >
      <h2>{JSON.stringify(row.original.email)}</h2>
    </span>
  );

  return (
    <Flex bg={" #EEF5FA"} flexDirection={"column"} p="24px">
      <Heading
        as="h1"
        fontFamily={"Rubik"}
        fontSize={"24px"}
        fontWeight={"500"}
        mb={"15px"}
        ml={"16px"}
      >
        {props.title}
      </Heading>
      <Text
        fontFamily={"Rubik"}
        fontSize={"14px"}
        fontWeight={"400"}
        color= '#000000'
        mb={"48px"}
        ml={"16px"}
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vitae vitae
        suspendisse habitant sagittis sodales consequat tincidunt.
      </Text>

      <BasicTable
        COLUMNS={COLUMNS}
        MOCK_DATA={MOCK_DATA}
        renderRowSubComponent={renderRowSubComponent}
      />
    </Flex>
  );
};

export default WidgetPage;
