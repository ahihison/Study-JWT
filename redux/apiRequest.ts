"use client";
import axios from "axios";
import {
  logOutFailure,
  logOutStart,
  logOutSuccess,
  loginFailure,
  loginStart,
  loginSuccess,
  registerFail,
  registerStart,
  registerSuccess,
} from "./authSlice";
import {
  deleteUserFailed,
  deleteUserStart,
  deleteUserSuccess,
  getUsersFailed,
  getUsersStart,
  getUsersSuccess,
} from "./userSlice";

export const loginUser = async (user: any, dispath: any, router: any) => {
  dispath(loginStart());

  try {
    const res = await axios.post("http://localhost:8000/v1/auth/login", user);
    dispath(loginSuccess(res.data));

    router.replace(`/`);
  } catch (err) {
    console.log(err);
    dispath(loginFailure());
  }
};
export const registerUser = async (user: any, dispath: any, router: any) => {
  dispath(registerStart());
  try {
    const res = await axios.post(
      "http://localhost:8000/v1/auth/register",
      user
    );
    dispath(registerSuccess(res.data));
    router.replace(`/login`);
  } catch (err) {
    console.log(err);
    dispath(registerFail());
  }
};
export const getAllUsers = async (
  accesToken: any,
  dispath: any,
  axiosJWT: any
) => {
  dispath(getUsersStart());
  try {
    const res = await axiosJWT.get(`http://localhost:8000/v1/user`, {
      headers: { token: `Bearer ${accesToken}` },
    });
    dispath(getUsersSuccess(res?.data));
  } catch (err) {
    console.log(err);
    dispath(getUsersFailed());
  }
};
export const deleteUser = async (
  accesToken: any,
  dispath: any,
  id: any,
  axiosJWT: any
) => {
  dispath(deleteUserStart());
  try {
    const res = await axiosJWT.delete(`http://localhost:8000/v1/user/${id}`, {
      headers: { token: `Bearer ${accesToken}` },
    });
    dispath(deleteUserSuccess(res.data));
  } catch (err: any) {
    dispath(deleteUserFailed(err.response?.data));
  }
};
export const logOut = async (
  dispath: any,
  router: any,
  id: any,
  accessToken: any,
  axiosJWT: any
) => {
  dispath(logOutStart());
  try {
    await axiosJWT.post(`http://localhost:8000/v1/auth/logout`, id, {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispath(logOutSuccess({}));
    router.replace(`/login`);
  } catch (err) {
    console.log(err);
    dispath(logOutFailure());
  }
};
