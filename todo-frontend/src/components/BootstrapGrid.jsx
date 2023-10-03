import React from "react";

export default function BootstrapGrid() {
  return (
    <div>
      <div className="row">
        <h1 className="col col-md-3 col-sm-6 col-12 bg-danger">Hi</h1>
        <h1 className="col col-md-3 col-sm-6 col-12 bg-primary">Hello</h1>
        <h1 className="col col-md-3 col-sm-6 col-12 bg-success">How are you</h1>
        <h1 className="col col-md-3 col-sm-6  col-12 bg-info">How are you</h1>
      </div>
    </div>
  );
}
