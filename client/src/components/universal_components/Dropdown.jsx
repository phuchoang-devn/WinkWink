const Dropdown = ({ className, value, options, onSelect, placeholder }) => {

  return (
    <div className={className + " dropdown-container"}>
      <select defaultValue={value} onChange={onSelect}>
        {
            placeholder ? <option value={null}>{placeholder}</option> : null
        }

        {options.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
