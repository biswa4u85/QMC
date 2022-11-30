import React, { useEffect, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import PropTypes from 'prop-types';
export const SelectSearch = (props) => {
  const [open, setOpen, width] = useState(false);

  const elem = document.getElementById("selectSearch");

  if (document.activeElement === elem) {
    const nestedElem = document.getElementById(keyValue);
    if (document.activeElement === nestedElem) setOpen(true);
    else setOpen(false);
  }

  const {
    label,
    options,
    result,
    keyValue,
    setResult,
    setSearch,
    placeholder,
    disabled = false,
  } = props;

  const [text, setText] = useState("");
  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (value) => {
    setText(value);
    setSearch(value);
  };
  const handleSelect = (value) => {
    setOpen(false);
    setResult(keyValue, value);
    setSelectedValue(value?.name);
  };

  useEffect(() => {
    if (result !== "") setSelectedValue(result?.name);
  }, [result]);

  return (
    <div
      id="selectSearch"
      style={{
        position: "relative",
        marginBottom: "2rem",
        width: width || "75%",
      }}
    >
      <label
        style={{
          fontWeight: "500",
          fontSize: "0.8rem",
          margin: "0 0 0.5rem 0",
        }}
      >
        {label}
      </label>
      <br />
      <input
        disabled={disabled}
        value={selectedValue}
        placeholder={"Select"}
        onChange={(e) => {
          handleChange(e.target.value);
        }}
        onFocus={() => (disabled ? null : setOpen(true))}
        style={{
          width: "100%",
          borderWidth: "2px",
          outlineStyle: "none",
          borderRadius: "10px",
          padding: "0.5rem 0.3rem",
          border: "2px solid #ede8fa",
        }}
      />
      {open && (
        <DropDown
          options={options}
          setOpen={setOpen}
          handleChange={handleChange}
          handleSelect={handleSelect}
          id={keyValue}
        />
      )}
    </div>
  );
};

const DropDown = (props) => {
  const { options, handleChange, handleSelect, setOpen, id } = props;

  return (
    <div
      // onBlur={() => setOpen(false)}
      style={{
        zIndex: "2",
        top: "5rem",
        padding: "1rem",
        minHeight: "5rem",
        position: "absolute",
        borderRadius: "0.5rem",
        backgroundColor: "#fff",
        boxShadow: "rgba(0,0,0,0.2) 0.5rem 0.5rem 1rem",
      }}
    >
      <div
        style={{ position: "relative", cursor: "pointer" }}
        onClick={() => setOpen(false)}
      >
        <div
          style={{
            zIndex: "10",
            top: "-2rem",
            float: "right",
            right: "-2rem",
            fontSize: "2rem",
            position: "absolute",
          }}
        >
          <AiFillCloseCircle />
        </div>
      </div>
      <div
        id={id}
        style={{
          maxHeight: "15rem",
          overflowY: "scroll",
          position: "relative",
        }}
      >
        <input
          placeholder="search"
          autoFocus
          onChange={(e) => handleChange(e.target.value)}
          style={{
            width: "100%",
            borderWidth: "2px",
            outlineStyle: "none",
            borderRadius: "10px",
            marginBottom: "1rem",
            padding: "0.5rem 0.3rem",
            border: "2px solid #ede8fa",
          }}
        />
        {options?.map((option, index) => (
          <p
            onClick={(e) => {
              e.preventDefault();
              handleSelect(option);
            }}
            key={index}
            style={{
              cursor: "pointer",
              borderColor: "#222",
              borderBottomWidth: "1px",
              borderBottomStyle: "solid",
            }}
          >
            {option?.name}
          </p>
        ))}
      </div>
    </div>
  );
};
SelectSearch.propTypes = {
  label: PropTypes.any,
  options: PropTypes.any,
  result: PropTypes.any,
  keyValue: PropTypes.any,
  setResult: PropTypes.any,
  setSearch: PropTypes.any,
  placeholder: PropTypes.any,
  disabled: PropTypes.any
};
DropDown.propTypes = {
  options: PropTypes.any,
  handleChange: PropTypes.any,
  handleSelect: PropTypes.any,
  setOpen: PropTypes.any,
  id: PropTypes.any
};