import { InputGroup, Input, InputGroupText } from "reactstrap";
import { FaSearch } from "react-icons/fa";

export const SearchComp = ({ searchQuery, handleInput, handleSearch }) => {
  return (
    <InputGroup>
      <Input
        value={searchQuery}
        onChange={handleInput}
        placeholder="Movie title..."
      />
      <InputGroupText
        onClick={handleSearch}
        style={{ cursor: "pointer", padding: "0 30px" }}
      >
        <FaSearch style={{ fontSize: "x-large" }} />
      </InputGroupText>
    </InputGroup>
  );
};
