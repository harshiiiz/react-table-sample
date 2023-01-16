import React, { useMemo, useState } from "react";
import {
  useTable,
  useGlobalFilter,
  usePagination,
  useRowSelect,
  useExpanded,
} from "react-table";
import { CSVLink } from "react-csv";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Select,
  Text,
  Box,
  Flex,
  Center,
  color,
  Button,
  Heading,
} from "@chakra-ui/react";
import { TbDownload, TbFilter } from "react-icons/tb";
import "./Table.css";
import { GlobalFilter } from "./GlobalFilter";
import { Checkboxx } from "./Checkbox";
import { BsChevronExpand, BsChevronContract } from "react-icons/bs";
import { TriangleDownIcon } from "@chakra-ui/icons";
import Options from "./Options";

const BasicTable = (props) => {
  const columns = useMemo(() => props.COLUMNS, []);
  const data = useMemo(() => props.MOCK_DATA, []);
  const [options, setOptions] = useState({
    headerResult: true,
    download: true,
    filter: true,
    pagination: true,
    footerResult: true,
    title: true,
  });

  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 },
      // ...(options.filter && { useGlobalFilter }),
      // ...(options.pagination && { usePagination }),
      // ...options.download,

      // ...(options.expandableRows && { useExpanded }),
    },
    useGlobalFilter,
    useExpanded,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => {
        return [
          {
            id: "selection",
            Header: ({ getToggleAllPageRowsSelectedProps }) => (
              <Checkboxx {...getToggleAllPageRowsSelectedProps()} />
            ),
            Cell: ({ row }) => (
              <Checkboxx {...row.getToggleRowSelectedProps()} />
            ),
          },
          ...columns,
        ];
      });
    }
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    visibleColumns,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    prepareRow,
    setPageSize,
    state,
    selectedFlatRows,
    setGlobalFilter,
  } = tableInstance;

  const { globalFilter, pageIndex, pageSize, selectedRowIds, expanded } = state;

  const pages = [...Array(pageCount).keys()].map((i) => i + 1);

  const startPage = 1;
  const endPage = 5;
  const startPages = pages.slice(startPage - 1, endPage);

  return (
    <>
      <Options options={options} setOptions={setOptions} />

      <Heading
        fontFamily="Rubik"
        fontWeight={500}
        fontSize={"16px"}
        ml={"30px"}
        mb="8px"
        mt="48px"
      >
        Preview
      </Heading>
      <TableContainer bg={"#FFFFFF"}>
        <Box p={2}>
          <Flex direction={"row"} justifyContent={"space-between"} p={1.6}>
            <Flex
              justifyContent={"flex-start"}
              gap={"24px"}
              alignItems={"center"}
            >
              <BsChevronContract
                color="rgba(132, 148, 168, 0.87)"
                size={24}
                display={"flex"}
              />
              {options.title && (
                <Text
                  fontSize="lg"
                  fontWeight={500}
                  fontFamily="Rubik"
                  color="#333333"
                >
                  Sample Data
                </Text>
              )}
              {options.headerResult && (
                <Text fontSize={"12px"} color="rgba(132, 148, 168, 0.87)">
                  {pageCount * pageSize} results
                </Text>
              )}
            </Flex>

            <Flex
              justifyContent={"flex-end"}
              gap={"24px"}
              alignItems={"center"}
            >
              <Box>
                {options.download && (
                  <CSVLink data={props.MOCK_DATA}>
                    <TbDownload color="rgba(132, 148, 168, 0.87)" size={24} />{" "}
                  </CSVLink>
                )}
              </Box>
              <Box>
                <TbFilter color="rgba(132, 148, 168, 0.87)" size={24} />
              </Box>
              <Box>
                {options.filter && (
                  <GlobalFilter
                    filter={globalFilter}
                    setFilter={setGlobalFilter}
                  />
                )}
              </Box>
            </Flex>
          </Flex>
        </Box>
        <Table
          variant="simple"
          {...getTableProps()}
          border="1px"
          borderColor={"#D9D9D9"}
        >
          <Thead>
            {headerGroups.map((headerGroup) => (
              <Tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <Th
                    fontSize={10}
                    m={0}
                    p={"0.6rem"}
                    {...column.getHeaderProps()}
                  >
                    {column.render("Header")}
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <React.Fragment {...row.getRowProps()}>
                  <Tr bg={"#F8F9F9"} borderRadius={2} border={4}>
                    {row.cells.map((cell) => {
                      return (
                        <Td
                          fontSize={14}
                          m={0}
                          borderColor={"white"}
                          p={"0.9rem"}
                          {...cell.getCellProps()}
                        >
                          {cell.render("Cell")}
                        </Td>
                      );
                    })}
                  </Tr>

                  {row.isExpanded ? (
                    <Tr>
                      <Td colSpan={visibleColumns.length}>
                        {props.renderRowSubComponent({ row })}
                      </Td>
                    </Tr>
                  ) : null}
                </React.Fragment>
              );
            })}
          </Tbody>
        </Table>
        <Box p={21} fontSize="12px">
          {options.pagination && (
            <Flex direction={"row"} justifyContent={"space-between"}>
              <Flex
                justifyContent={"flex-start"}
                gap={"24px"}
                alignItems={"center"}
              >
                {options.footerResult && (
                  <Box color="#4F6683">
                    Showing <strong>{page.length}</strong> out of{" "}
                    <strong>{pageCount * pageSize} </strong> results
                  </Box>
                )}

                <Flex color="#4F6683">
                  {" "}
                  Show{" "}
                  <Select
                    icon={<TriangleDownIcon fontSize={"8px"} />}
                    size={"30px"}
                    mx={"8px"}
                    value={pageSize}
                    onChange={(e) => {
                      setPageSize(Number(e.target.value));
                    }}
                  >
                    {[10, 20, 30, 40, 50].map((pageSize) => (
                      <option key={pageSize} value={pageSize}>
                        {pageSize}
                      </option>
                    ))}
                  </Select>
                  entries
                </Flex>
              </Flex>
              <Flex justifyContent={"flex-end"} alignItems={"center"}>
                {/* <Box>
                  {" "}
                  Page{" "}
                  <strong>
                    {pageIndex + 1} of {pageOptions.length}
                  </strong>
                </Box> */}
                <Button
                  color={"#4F6683"}
                  bg={"#FFFFFF"}
                  _hover={{ bg: "#4F6683", color: "white" }}
                  rounded="full"
                  size="sm"
                  onClick={() => gotoPage(0)}
                  disabled={!canPreviousPage}
                >
                  {"<"}
                </Button>
                <Button
                  color={"#4F6683"}
                  bg={"#FFFFFF"}
                  _hover={{ bg: "#4F6683", color: "white" }}
                  rounded="full"
                  size="sm"
                  onClick={() => previousPage()}
                  disabled={!canPreviousPage}
                >
                  {"<<"}
                </Button>
                {startPages.map((page) => (
                  <Button
                    color={"#4F6683"}
                    bg={"#FFFFFF"}
                    _hover={{ bg: "#4F6683", color: "white" }}
                    rounded="full"
                    size="sm"
                    key={page}
                    onClick={() => gotoPage(page - 1)}
                  >
                    {page}
                  </Button>
                ))}
                {pageIndex > endPage && <span>...</span>}
                {pageIndex < pageCount - endPage + 1 && <span>...</span>}
                {/* {endPages.map((page) => (
                <Button key={page} onClick={() => gotoPage(page)}>
                    {page}
                </Button>
            ))} */}
                {pageOptions.length > endPage && (
                  <Button
                    color={"#4F6683"}
                    bg={"#FFFFFF"}
                    _hover={{ bg: "#4F6683", color: "white" }}
                    rounded="full"
                    size="sm"
                    onClick={() => gotoPage(pageOptions.length - 1)}
                    disabled={!canNextPage}
                  >
                    {pageOptions.length}
                  </Button>
                )}

                <Button
                  color={"#4F6683"}
                  bg={"#FFFFFF"}
                  _hover={{ bg: "#4F6683", color: "white" }}
                  rounded="full"
                  size="sm"
                  onClick={() => nextPage()}
                  disabled={!canNextPage}
                >
                  {">>"}
                </Button>

                <Button
                  color={"#4F6683"}
                  bg={"#FFFFFF"}
                  _hover={{ bg: "#4F6683", color: "white" }}
                  rounded="full"
                  size="sm"
                  onClick={() => gotoPage(pageCount - 1)}
                  disabled={!canNextPage}
                >
                  {">"}
                </Button>
              </Flex>

              {/* <pre>
            <code>
              {JSON.stringify(
                {
                  selectedRowIds: selectedRowIds,
                  "selectedFlatRows[].original": selectedFlatRows.map(
                    (d) => d.original
                  ),
                },
                null,
                2
              )}
            </code>
          </pre>
          <pre>
            <code>{JSON.stringify({ expanded: expanded }, null, 2)}</code>
          </pre> */}
            </Flex>
          )}
        </Box>
      </TableContainer>
    </>
  );
};

export default BasicTable;
