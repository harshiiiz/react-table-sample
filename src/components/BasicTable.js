import React, { useMemo , useState } from "react";
import {
  useTable,
  useGlobalFilter,
  usePagination,
  useRowSelect,
  useExpanded,
} from "react-table";
import { CSVLink } from "react-csv";

import "./Table.css";
import { GlobalFilter } from "./GlobalFilter";
import { Checkbox } from "./Checkbox";

const BasicTable = (props) => {
  const columns = useMemo(() => props.COLUMNS, []);
  const data = useMemo(() => props.MOCK_DATA, []);
  const [options, setOptions] = useState({
    expandableRows: true,
    download:true,
    filter: true,
    pagination: true,
  });
  

  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 },
    ...(options.filter && { useGlobalFilter }),
    ...(options.pagination && { usePagination }),
    ...(options.download ),
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
              <Checkbox {...getToggleAllPageRowsSelectedProps()} />
            ),
            Cell: ({ row }) => (
              <Checkbox {...row.getToggleRowSelectedProps()} />
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
  return (
    <>
    <div className="options">
        <label>
          <input
            type="checkbox"
            checked={options.expandableRows}
            onChange={() =>
              setOptions({
                ...options,
                expandableRows: !options.expandableRows,
              })
            }
          />
          Expandable Rows
        </label>
        <label>
          <input
            type="checkbox"
            checked={options.download}
            onChange={() =>
              setOptions({
                ...options,
                download: !options.download,
              })
            }
          />
          Download
        </label>
        <label>
          <input
            type="checkbox"
            checked={options.filter}
            onChange={() => setOptions({ ...options, filter: !options.filter })}
          />
          Filter
        </label>
        <label>
          <input
            type="checkbox"
            checked={options.pagination}
            onChange={() =>
              setOptions({ ...options, pagination: !options.pagination })
            }
          />
          Pagination
        </label>
      </div>
      {options.download && (<CSVLink data={props.MOCK_DATA}>Download </CSVLink>)}

      {options.filter && ( <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />)}

      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <React.Fragment {...row.getRowProps()}>
                <tr>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
                {row.isExpanded ? (
                  <tr>
                    <td colSpan={visibleColumns.length}>
                      {props.renderRowSubComponent({ row })}
                    </td>
                  </tr>
                ) : null}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
      {options.pagination && (
      <div>
        <span>
          Showing {page.length} out of {pageCount * pageSize} results
        </span>
        <span>
          {" "}
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </span>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"}
        </button>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {"<"}
        </button>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {">"}
        </button>
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {">>"}
        </button>
        <span>
          {" "}
          Show
          <select
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
          </select>
          entries
        </span>
        <pre>
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
        </pre>
      </div>
      )}
    </>
  );
};

export default BasicTable;
