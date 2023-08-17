"use client";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { deleteUser, getAllUsers } from "@/redux/apiRequest";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import jwt_decode from "jwt-decode";
import { loginSuccess } from "@/redux/authSlice";
import { createAxios } from "@/createInstance";
// const userList = [
//   {
//     username: "anhduy1202",
//   },
//   {
//     username: "kelly1234",
//   },
//   {
//     username: "danny5678",
//   },
//   {
//     username: "kenny1122",
//   },
//   {
//     username: "jack1234",
//   },
//   {
//     username: "loi1202",
//   },
//   {
//     username: "nhinhi2009",
//   },
//   {
//     username: "kellynguyen1122",
//   },
// ];
const Content = () => {
  const user = useSelector((state: any) => state.auth.login?.currentUser);
  const msg = useSelector((state: any) => state.users?.msg);
  const userList = useSelector((state: any) => state.users.users?.allUsers);
  const router = useRouter();
  const dispath = useDispatch();
  let axiosJWT = createAxios(user, dispath, loginSuccess);
  const hadnleDelete = (id: any) => {
    deleteUser(user?.accessToken, dispath, id, axiosJWT);
  };
  axios.defaults.withCredentials = true;

  useEffect(() => {
    if (!user) {
      router.replace("/login");
    }
    if (user?.accessToken) {
      getAllUsers(user?.accessToken, dispath, axiosJWT);
    }
  }, []);

  return (
    <div className="mt-32 w-full h-full">
      <p className="font-bold text-5xl text-center w-full ">User List</p>
      <div className="text-center w-full font-bold text-2xl">
        Your role: {user?.admin ? `Admin` : `User`}{" "}
      </div>
      <div className=" px-16 pb-2 lg:px-44 lg:pb-5 pt-6 h-[70vh] grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 text-center ">
        {userList?.map((user: any) => (
          <Card className="min-w-max m-2 max-h-48">
            <CardHeader>
              <CardTitle>Name User</CardTitle>
              <CardDescription className="text-3xl">
                {user.username}
              </CardDescription>
            </CardHeader>

            <CardFooter
              className="text-center justify-center hover:text-white/70 hover:opacity-80 cursor-pointer"
              onClick={() => hadnleDelete(user._id)}
            >
              <p className=" bg-orange-300 w-24 h-14 rounded-lg text-center pt-4 ">
                DELETE
              </p>
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="text-center font-bold w-full text-3xl text-pink-500 mb-3 ">
        {msg}
      </div>
    </div>
  );
};

export default Content;
