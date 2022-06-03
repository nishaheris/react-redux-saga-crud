import React from "react";

const RenderComponent = (key) => {
  return (
    <>
      <tr>
        <td>{key.data.ename}</td>
        <td>{key.data.designation}</td>
        <td>{key.data.email}</td>
        <td>{key.data.experince}</td>
        <td>{key.data.phone}</td>
      </tr>
    </>
  );
};

export default RenderComponent;
