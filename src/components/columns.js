import { BsChevronExpand, BsChevronContract  } from 'react-icons/bs';

export const COLUMNS = [
  
  {
    Header: "Id",
    accessor:'id'
  },
  {
    Header: "First Name",
    accessor:'first_name'
  },
  {
    Header: "Last Name",
    accessor:"last_name"
  },
  {
    Header: "Date Of Birth",
    accessor:"date_of_birth"
  },
  {
    Header: "Country",
    accessor:"country"
  },
  {
    Header: "Phone",
    accessor:"phone",
    Cell: props => <a href="abc"> {props.value}</a>
   
  },
  {
    id: 'expander', 
    Header: ({ getToggleAllRowsExpandedProps, isAllRowsExpanded }) => (
      <span {...getToggleAllRowsExpandedProps()}>
        {isAllRowsExpanded ? <BsChevronContract/>   :<BsChevronExpand/> }
      </span>
    ),
    Cell: ({ row }) =>
    
        <span
          {...row.getToggleRowExpandedProps({
            // style: {
            //   // We can even usea the row.depth property
            //   // and paddingLeft to indicate the depth
            //   // of the row
            //   paddingLeft: `${row.depth * 2}rem`,
            // },
          })}
        >
          {row.isExpanded ? <BsChevronContract/>:<BsChevronExpand/> }
        </span>
      
  },
];
