"use client";
import Link from "next/link";

import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "@/createInstance";
import { logOutSuccess } from "@/redux/authSlice";
import { logOut } from "@/redux/apiRequest";
import { useRouter } from "next/navigation";
const Navbar = () => {
  const userName = useSelector((state: any) => state.auth.login.currentUser);
  const router = useRouter();
  const dispatch = useDispatch();
  const id = userName?._id;
  let axiosJWT = createAxios(userName, dispatch, logOutSuccess);
  const accessToken = userName?.accessToken;
  const handleLogout = () => {
    logOut(dispatch, router, id, accessToken, axiosJWT);
  };
  return (
    <div className="w-full h-16  bg-slate-300 fixed text-4xl top-0">
      <div className="flex justify-end gap-x-7 mr-3 text-gray-500 font-bold items-center h-full text-lg cursor-pointer group transition-all">
        <Link href={"/"} className="hover:text-white">
          Home
        </Link>
        {userName ? (
          <>
            <div className="text-green-700">Hi, {userName.username}</div>
            <Link
              href={"/"}
              className="hover:text-white"
              onClick={() => {
                handleLogout();
              }}
            >
              Logout
            </Link>
          </>
        ) : (
          <>
            <Link href={"/login"} className="hover:text-white">
              Login
            </Link>
            <Link
              href={"/register"}
              className=" p-2 bg-slate-500/50 rounded-md hover:text-white "
            >
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
