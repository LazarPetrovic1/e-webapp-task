import React, {Fragment} from 'react';

export default (props) => (
  <Fragment>
    <h1 style={{fontWeight: "bolder", color: "navy", textAlign: "center", fontSize: "4rem"}}>About the app</h1>
    <p style={{textAlign: "center", fontSize: "3rem"}}>
      <span style={{fontWeight: "bolder", color: "navy"}}>Name</span>: Eventio | Event Manager
    </p>
    <p style={{textAlign: "center", fontSize: "3rem"}}>
      <span style={{fontWeight: "bolder", color: "navy"}}>Version</span>: 1.0
    </p>
  </Fragment>
);
