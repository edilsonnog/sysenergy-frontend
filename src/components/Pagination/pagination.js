import React from "react";
import './pagination.css';

const MAX_ITENS = 5;
const MAX_LEFT = (MAX_ITENS - 1) / 2;

const Pagination = ({ limit, total, offset, setoffset }) => {
  const current = offset ? offset / limit + 1 : 1;
  const pages = Math.ceil(total / limit);
  const first = Math.max(current - MAX_LEFT, 1);

  return( 
        <ul className="pagination">
            {Array.from({ length: Math.min(MAX_ITENS, pages) })
                .map((_, index) => index + first)
                .map((page) => (
                    <li key={page}>
                      <button 
                      onClick={() => setoffset((page - 1) * limit)}
                      className={page === current ? 'pagination__item--active' : '' }>{page}</button>  
                    </li>
                ))}
        </ul>
  );
};

export default Pagination;
