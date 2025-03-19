const Pagination = ({ page, totalPages, handlePageClick, getPageNumbers }) => {
  return (
    <div className="flex justify-end mt-8 font-inter text-l font-light ">
      {page == 1 ? null : (
        <button
          onClick={() => page > 1 && handlePageClick(page - 1)}
          className="px-3 py-1 mr-2  disabled:opacity-50 rounded-md cursor-pointer"
        >
          &lt;
        </button>
      )}
      {getPageNumbers().map((pageNum) => (
        <button
          key={pageNum}
          onClick={() => handlePageClick(pageNum)}
          className={`px-3 py-1 mx-1 rounded-md  cursor-pointer ${
            pageNum === page ? "bg-accent text-white" : null
          }`}
        >
          {pageNum}
        </button>
      ))}
      <button
        onClick={() => page < totalPages && handlePageClick(page + 1)}
        disabled={page === totalPages}
        className="px-3 py-1 ml-2  cursor-pointer rounded-md disabled:opacity-50"
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
