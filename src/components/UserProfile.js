import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../redux/actions/userprofileAction";
import profileImage from "../public/images/react.png";

function UserProfile() {
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

                  <h3 clasclassNames="profile-username text-center">
                    {profileData.firstname} {profileData.lastname}
                  </h3>
                  <p class="text-muted text-center">
                    {profileData.designation}
                  </p>
                </div>
              </div>

              <div class="card card-primary">
                <div class="card-header">
                  <h3 class="card-title">About Me</h3>
                </div>
                <div class="card-body">
                  <strong>
                    <i class="fas fa-book mr-1"></i> Education
                  </strong>

                  <p class="text-muted">{profileData.education}</p>

                  <hr />

                  <strong>
                    <i class="fas fa-map-marker-alt mr-1"></i> Location
                  </strong>

                  <p class="text-muted">{profileData.location}</p>

                  <hr />

                  <strong>
                    <i class="fas fa-pencil-alt mr-1"></i> Skills
                  </strong>

                  <p class="text-muted">
                    <span class="tag tag-danger">{profileData.skills}</span>
                  </p>

                  <hr />

                  <strong>
                    <i class="far fa-file-alt mr-1"></i> Notes
                  </strong>

                  <p class="text-muted">{profileData.notes}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default UserProfile;