import React from "react";
import "./modal.css";

const Modal = (props) => {
  const { closeModal } = props;

  const closeicon = () => (
    // <FontAwesome
    //   name="times"
    //   onClick={closeModal}
    //   style={{
    //     color: "#000000",
    //     padding: "10px",
    //     cursor: "pointer",
    //     backgroundColor: "transparent",
    //     border: 0,
    //     position: "absolute",
    //     top: "0.3rem",
    //     right: "0.5rem",
    //   }}
    // />
    <h1
      onClick={closeModal}
      style={{
        color: "#fff",
        padding: "10px",
        cursor: "pointer",
        backgroundColor: "black",
        border: 0,
        position: "absolute",
        top: "0.3rem",
        right: "0.5rem",
        borderRadius: "100px",
        width: "35px",
        height: "35px",
        justifyContent: "center",
        alignContent: "center",
        display: "flex",
      }}
    >
      X
    </h1>
  );

  return (
    <div className="overlay">
      <div className="content">
        {closeicon()}
        {props.children}
      </div>
    </div>
  );
};

export default Modal;
