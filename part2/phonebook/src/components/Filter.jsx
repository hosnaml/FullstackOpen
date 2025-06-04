const Filter = (props) => {
  return (
    <div>
      filter shown with:{" "}
      <input value={props.filter} onChange={props.handleNameFilter} />
    </div>
  );
};

export default Filter;
