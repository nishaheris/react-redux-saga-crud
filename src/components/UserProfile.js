import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../redux/actions/userprofileAction";
import profileImage from "../public/images/react.png";

const UserProfile = () => {
  const useLogdin = localStorage.getItem("userLogin");
  const dispatch = useDispatch();
  const profileData = useSelector((state) => state.userprofile.userprofile);

  useEffect(() => {
    if (useLogdin) {
      dispatch(getUserProfile());
    }
  }, []);

  return (
    <div className="content-wrapper">
      <section className="content-header">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="card card-primary card-outline">
                <div className="card-body box-profile">
                  <div className="text-center">
                    <img
                      className="profile-user-img img-fluid img-circle"
                      src={profileImage}
                    />
                  </div>

                  <h3 className="profile-username text-center">
                    {profileData.firstname} {profileData.lastname}
                  </h3>
                  <p class="text-muted text-center">
                    {profileData.designation}
                  </p>
                </div>
              </div>

              <div className="card card-primary">
                <div className="card-header">
                  <h3 className="card-title">About Me</h3>
                </div>
                <div className="card-body">
                  <strong>
                    <i className="fas fa-book mr-1"></i> Education
                  </strong>

                  <p className="text-muted">{profileData.education}</p>

                  <hr />

                  <strong>
                    <i className="fas fa-map-marker-alt mr-1"></i> Location
                  </strong>

                  <p className="text-muted">{profileData.location}</p>

                  <hr />

                  <strong>
                    <i className="fas fa-pencil-alt mr-1"></i> Skills
                  </strong>

                  <p className="text-muted">
                    <span class="tag tag-danger">{profileData.skills}</span>
                  </p>

                  <hr />

                  <strong>
                    <i className="far fa-file-alt mr-1"></i> Notes
                  </strong>

                  <p className="text-muted">{profileData.notes}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UserProfile;
