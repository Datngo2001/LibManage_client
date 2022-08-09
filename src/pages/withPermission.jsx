import React from "react";

function withPermission(wrapped) {
  const WithPermission = () => {
    return <div>{wrapped}</div>;
  };
  return WithPermission();
}

export default withPermission;
