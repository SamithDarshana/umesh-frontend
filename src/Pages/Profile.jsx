import React, { useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Container from "./Container";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../features/user/userSlice";
import { LuClipboardEdit } from "react-icons/lu";

const ProfileSchema = yup.object({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup
    .string()
    .nullable()
    .email("Email should be valid")
    .required("Email Address is required"),
  mobile: yup.number().required("Mobile is required"),
});

export const Profile = () => {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state?.auth?.user);
  const [edit, setEdit] = useState(true);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstName: userState?.firstName,
      lastName: userState?.lastName,
      email: userState?.email,
      mobile: userState?.mobile,
    },
    validationSchema: ProfileSchema,
    onSubmit: (values) => {
      dispatch(updateUser(values));
      setEdit(true);
    },
  });

  return (
    <>
      <BreadCrumb title="Profile" />
      <Container className="profile-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center">
              <h3 className="my-3">Update Profile</h3>
              <LuClipboardEdit onClick={()=>setEdit(false)} className="fs-3"/>
            </div>
          </div>
          <div className="col-12">
            <form onSubmit={formik.handleSubmit}>
              <div className="form-group my-4">
                <label htmlFor="example1">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  disabled={edit}
                  className="form-control profile-input"
                  id="example1"
                  aria-describedby="emailHelp"
                  value={formik.values.firstName}
                  onChange={formik.handleChange("firstName")}
                  onBlur={formik.handleBlur("firstName")}
                />
              </div>
              {formik.touched.firstName && formik.errors.firstName}
              <div className="form-group my-4">
                <label htmlFor="example2">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  disabled={edit}
                  className="form-control profile-input"
                  id="example2"
                  aria-describedby="emailHelp"
                  value={formik.values.lastName}
                  onChange={formik.handleChange("lastName")}
                  onBlur={formik.handleBlur("lastName")}
                />
                {formik.touched.lastName && formik.errors.lastName}
              </div>
              <div className="form-group my-4">
                <label htmlFor="example3">Email Address</label>
                <input
                  type="email"
                  name="email"
                  disabled={edit}
                  className="form-control profile-input"
                  id="example3"
                  aria-describedby="emailHelp"
                  value={formik.values.email}
                  onChange={formik.handleChange("email")}
                  onBlur={formik.handleBlur("email")}
                />
                <small id="emailHelp" className="form-text text-muted">
                  We'll never share your email with anyone else.
                </small>
                {formik.touched.email && formik.errors.email}
              </div>
              <div className="form-group my-4">
                <label htmlFor="example4">Mobile Number</label>
                <input
                  type="string"
                  name="mobile"
                  disabled={edit}
                  className="form-control profile-input"
                  id="example4"
                  aria-describedby="emailHelp"
                  value={formik.values.mobile}
                  onChange={formik.handleChange("mobile")}
                  onBlur={formik.handleBlur("mobile")}
                />
                <small id="mobileHelp" className="form-text text-muted">
                  We'll never share your mobile number with anyone else.
                </small>
                {formik.touched.mobile && formik.errors.mobile}
              </div>
              {edit === false && (
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              )}
            </form>
          </div>
        </div>
      </Container>
    </>
  );
};
