import React from "react";
import styled from "styled-components";

const StyledTbale = styled.table`
  width: 100%;
  th {
    text-align: center;
    padding: 10px;
    text-trasform: uppercase;
    color: #505050;
    font-weight: normal;
        border-bottom: 1px solid #eee;

    font-size: 0.9rem;
    ${(props)=>props.$basic &&`
      font-weight:bold;
      color:black;
      font-size:1.3rem;
        border-bottom:2px solid #aaa;
      `}
  }
  td {
    padding: 10px;
    font-size: 0.9rem;
    color: #333;
    text-align: center;
    ${(props)=>props.$basic &&`
      border-bottom:2px solid #ccc;
    `}
  }
 
`;

const Table = (props) => {
  return <StyledTbale {...props} />;
};

export default Table;
