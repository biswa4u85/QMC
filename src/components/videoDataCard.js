import React from "react";
import { MdModeEdit, MdDelete } from "react-icons/md";

import "../styles/videoCard.css";
export const VideoDataCard = (params) => {
  const { data, index, lastIndex, handleEdit, setSeekTime, deleteData } =
    params;

  const handleSetSeekTime = (time) => {
    setSeekTime(time);
  };

  console.log({ data });

  return (
    <div
      className="card"
      style={{ marginBottom: index === lastIndex ? "10rem" : "0" }}
    >
      <div className="row">
        <div className="button" id="delete" onClick={() => deleteData(data?.x)}>
          <MdDelete size={"1.5rem"} />
        </div>
        <div
          className="button"
          id="edit"
          onClick={() => {
            handleEdit(data?.keyValue, data?.startTime, data);
            handleSetSeekTime(data?.keyValue);
          }}
        >
          <MdModeEdit size={"1.5rem"} />
        </div>
      </div>
      <span onClick={() => handleSetSeekTime(data.startTime)}>
        <div className="row">
          <p>Start Time : {data?.startTime} </p>
          <p>End Time : {data?.endTime} </p>
        </div>
        {/* <p>url : {data?.url || data?.product?.shopURL} </p> */}
        <div className="row">
          {/* <div className="image-container">
            {data?.mainImage?.name && (
              <img
                style={{
                  zIndex: "2",
                  width: "9.9rem",
                  height: "9.9rem",
                  objectFit: "cover",
                  position: "absolute",
                }}
                src={data?.mainImage}
              />
            )}
            <label>Main Image</label>
          </div> */}
          {/* <div className="image-container">
            {data?.gridImage?.name && (
              <img
                style={{
                  zIndex: "2",
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  position: "absolute",
                }}
                src={data?.gridImage}
              />
            )}
            <label>Grid Image</label>
          </div> */}
        </div>
      </span>
    </div>
  );
};
