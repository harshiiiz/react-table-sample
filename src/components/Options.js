import React, { useState } from "react";
import {
  Box,
  Checkbox,
  Flex,
  Text,
  Select,
  IconButton,
  Button,
  Stack,
  Input,
  Heading,
} from "@chakra-ui/react";
import { CloseIcon, SmallCloseIcon, TriangleDownIcon } from "@chakra-ui/icons";

const Options = ({ options, setOptions }) => {
  const [value, setValue] = useState("");
  return (
    <Box>
      <Heading
        fontFamily={"Rubik"}
        fontWeight={500}
        fontSize={"16px"}
        mb="8px"
        ml={"30px"}
      >
        {" "}
        Configure
      </Heading>
      <Flex flexDirection={"column"} bg={"#FFFFFF"} px={10} py="32px">
        <Flex justifyContent={"space-between"} mb="66px">
          <Checkbox
            defaultChecked
            checked={options.title}
            onChange={() =>
              setOptions({
                ...options,
                title: !options.title,
              })
            }
          >
            Show Title
          </Checkbox>
          <Checkbox
            defaultChecked
            checked={options.expandableRows}
            onChange={() =>
              setOptions({
                ...options,
                expandableRows: !options.expandableRows,
              })
            }
          >
            Show Subtitle
          </Checkbox>
          <Checkbox
            defaultChecked
            checked={options.expandableRows}
            onChange={() =>
              setOptions({
                ...options,
                expandableRows: !options.expandableRows,
              })
            }
          >
            Collapsible
          </Checkbox>
        </Flex>
        <Box>
          <Text mb={"32px"}>Actions</Text>
          <Flex gap={"24px"}>
            <Select
              value={value}
              onChange={(e) => setValue(e.target.value)}
              variant="outline"
              icon={<TriangleDownIcon fontSize={10} />}
            >
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </Select>
            <Select
              value={value}
              onChange={(e) => setValue(e.target.value)}
              variant="outline"
              icon={<TriangleDownIcon fontSize={10} />}
            >
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </Select>
            <Select
              value={value}
              onChange={(e) => setValue(e.target.value)}
              variant="outline"
              icon={<TriangleDownIcon fontSize={10} />}
            >
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </Select>
            <Select
              value={value}
              onChange={(e) => setValue(e.target.value)}
              variant="outline"
              icon={<TriangleDownIcon fontSize={10} />}
            >
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </Select>
          </Flex>
        </Box>
        <Flex direction={"row"} justifyContent={"space-between"} mt={"96px"}>
          <Flex justifyContent={"flex-start"} align="center">
            <Text
              mr="24px"
              fontSize={"14px"}
              fontFamily="Rubik"
              color={"rgba(0, 0, 0, 0.87)"}
            >
              Row Type
            </Text>
            <Stack direction="row" align="center">
              <Button variant="outline">Expandable</Button>
              <Button variant="outline">Click to Detail</Button>
              <Button variant="outline">Click to Popup</Button>
              <Button variant="outline">Regular</Button>
            </Stack>
          </Flex>

          <Flex justifyContent={"flex-end"} gap={3} align="center">
            <Text
              fontSize={"14px"}
              fontFamily="Rubik"
              color={"rgba(0, 0, 0, 0.87)"}
            >
              Column Count
            </Text>
            <Input
              placeholder="8"
              htmlSize={7}
              width="auto"
              textAlign={"center"}
            />
          </Flex>
        </Flex>

        <Box>
          <Flex direction={"row"} justifyContent={"space-between"} mt={"62px"}>
            <Flex direction={"column"} gap="52px">
              <Checkbox
                defaultChecked
                checked={options.headerResult}
                onChange={() =>
                  setOptions({
                    ...options,
                    headerResult: !options.headerResult,
                  })
                }
              >
                Header Results Count
              </Checkbox>
              <Checkbox
                defaultChecked
                checked={options.download}
                onChange={() =>
                  setOptions({
                    ...options,
                    download: !options.download,
                  })
                }
              >
                Download{" "}
              </Checkbox>
              <Checkbox
                defaultChecked
                checked={options.filter}
                onChange={() =>
                  setOptions({ ...options, filter: !options.filter })
                }
              >
                Filter
              </Checkbox>
            </Flex>
            <Flex direction={"column"} gap="52px">
              <Checkbox
                defaultChecked
                checked={options.footerResult}
                onChange={() =>
                  setOptions({
                    ...options,
                    footerResult: !options.footerResult,
                  })
                }
              >
                Footer Results Count
              </Checkbox>
              <Checkbox
                defaultChecked
                checked={options.download}
                onChange={() =>
                  setOptions({
                    ...options,
                    download: !options.download,
                  })
                }
              >
                Overflow Actions
              </Checkbox>
              <Checkbox
                defaultChecked
                checked={options.filter}
                onChange={() =>
                  setOptions({ ...options, filter: !options.filter })
                }
              >
                Clickable cell
              </Checkbox>
            </Flex>
            <Flex direction={"column"} gap="52px">
              <Checkbox
                defaultChecked
                checked={options.pagination}
                onChange={() =>
                  setOptions({ ...options, pagination: !options.pagination })
                }
              >
                Pagination{" "}
              </Checkbox>
              <Checkbox
                defaultChecked
                checked={options.pagination}
                onChange={() =>
                  setOptions({ ...options, pagination: !options.pagination })
                }
              >
                Row Selection
              </Checkbox>
            </Flex>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default Options;
