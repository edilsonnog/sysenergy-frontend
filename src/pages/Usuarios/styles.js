import styled from 'styled-components';

export const Pagination = styled.div `
    display: flex;
    width: 100%;
    justify-content: space-between;
`;

export const PaginationButton = styled.div `
    display: flex;
`;

export const PaginationItem = styled.div`
  margin: 0 10px;
  cursor: pointer;
  ${(props) =>
    props.isSelect && {
      background: "#a3a3a2",
      padding: "0 5px",
    }}
`;