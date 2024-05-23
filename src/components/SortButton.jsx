import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa6";
import PropTypes from 'prop-types';

const SortButton = ({ children, columnKey, onSort, sortConfig }) => {
  return (
    <button onClick={() => onSort(columnKey)} className="w-full flex items-center justify-between gap-2 text-start">
      {children}
      {sortConfig.key === columnKey ? (
        sortConfig.direction === 'asc' ? (
          <FaSortUp />
        ) : (
          <FaSortDown />
        )
      ) : (
        <FaSort />
      )}
    </button>
  );
};

SortButton.propTypes = {
  children: PropTypes.node.isRequired,
  columnKey: PropTypes.string.isRequired,
  onSort: PropTypes.func.isRequired,
  sortConfig: PropTypes.object.isRequired,
};

export default SortButton;
