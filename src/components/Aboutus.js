import React from "react";

export const Aboutus = () => {
  return (
    <>
      <div className="content-wrapper">
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 style={{ textAlign: "left" }}>Project Detail</h1>
              </div>
            </div>
          </div>
        </section>
        <div className="content">
          <div className="card">
            <div className="card-header">
              <div className="card-body">
                <p style={{ textAlign: "left" }}>
                  Hello all, This demo fully CRUD operation with Ract Redux
                  Saga.
                  <ul>
                    <li>Mainly we use React latest version 18.1.0.</li>
                    <li>As middleware as we used redux-saga.</li>
                    <li>
                      With the help of Json Server we careated API then we used
                      that API for ADD, UPDATE, GET, DELETE functionality. For
                      that please look after (static.json) file.
                    </li>
                    <li>We also used Multiple deletion.</li>
                    <li>
                      For validation we used ValidatorForm from
                      react-material-ui-form-validator.
                    </li>
                    <li>
                      In this we also used Routing functionality with
                      PrivateRouter.
                    </li>
                    <li>For Datatable we used MUI Datatables version 4.2.2.</li>
                    <li>For Designing we used bootstrap 5.1.3.</li>
                    <li>We also used Fairebase Login.</li>
                    <li>We also covre Axios for calling API.</li>
                  </ul>{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
