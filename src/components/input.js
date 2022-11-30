import React from "react";
import PropTypes from 'prop-types';
export const CustomInput = (props) => {
  const {
    type,
    value,
    label,
    keyValue,
    placeholder,
    disabled = true,
    onChange = () => { },
  } = props;

  const numberPattern = /[^0-9]/g;
  return (
    <>
      {type !== "file" ? (
        <div style={{ width: "75%", marginBottom: "2rem" }}>
          <label
            style={{
              fontWeight: "500",
              fontSize: "0.8rem",
              margin: "0 0 0.5rem 0",
            }}
          >
            {label}
          </label>
          <input
            type={type}
            value={value}
            disabled={disabled}
            placeholder={placeholder}
            pattern={type === "number" ? "[0-9]+" : ""}
            onChange={(e) => {
              onChange(
                keyValue,

                e.target.value
              );
              console.log(numberPattern.test(e.target.value));
            }}
            style={{
              width: "100%",
              borderWidth: "2px",
              outlineStyle: "none",
              borderRadius: "10px",
              padding: "0.5rem 0.3rem",
              border: "2px solid #ede8fa",
            }}
          />
        </div>
      ) : (
        <div>
          <label
            style={{
              fontWeight: "300",
              fontSize: "0.8rem",
              margin: "0 0 0.5rem 0",
            }}
          >
            {label}
          </label>
          <div
            style={{
              width: "10vw",
              height: "10vw",
              overflow: "hidden",
              position: "relative",
              borderRadius: "1rem",
              backgroundColor: "white",
              border: "2px solid #ede8fa",
            }}
          >
            <input
              hidden
              type="file"
              id={keyValue}
              disabled={disabled}
              style={{ width: "100%", height: "100%" }}
              onChange={(e) =>
                e.target.files[0] ? onChange(keyValue, e.target.files[0]) : null
              }
              accept="image/png, image/gif, image/jpeg"
            />
            {value?.name || value.length > 2 ? (
              <img
                style={{
                  zIndex: "2",
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  position: "absolute",
                }}
                src={value?.name ? URL.createObjectURL(value) : value}
                alt=""
              />
            ) : null}
            <label
              htmlFor={keyValue}
              style={{
                top: "0",
                left: "0",
                right: "0",
                zIndex: "4",
                bottom: "0",
                color: "#fff",
                display: "flex",
                cursor: "pointer",
                fontWeight: "600",
                alignItems: "center",
                position: "absolute",
                justifyContent: "center",
              }}
            >
              <p>Upload</p>
            </label>
          </div>
        </div>
      )}
    </>
  );
};
CustomInput.propTypes = {
  type: PropTypes.any,
  value: PropTypes.any,
  label: PropTypes.any,
  keyValue: PropTypes.any,
  placeholder: PropTypes.any,
  disabled: PropTypes.any,
  onChange: PropTypes.any
};
