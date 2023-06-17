import React, { useState, useEffect } from "react";

import { useUserDataStore } from "../zustand/store";
import axiosConfig from "../../../axiosConfig";

const Users = () => {
    const [users, setUsers] = useState([]);

    console.log(users, "users-------------");

    const { userdata } = useUserDataStore();
    const access_token = userdata?.access_token;
    const fetchUsers = async () => {
        console.log("eneterd");
        try {
            const controller = new AbortController();
            const response = await axiosConfig.get("/auth/users", {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
                signal: controller.signal,
            });

            setUsers(response.data?.users);
            controller.abort();
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <section className="flex flex-col gap-[5px] relative pt-[50px]">
            <div className="p-[10px] flex items-center justify-between absolute top-0 left-0 w-full bg-blue-text ">
                <p className="text-[15px]">Profile</p>
                <p className="text-[15px]">Name</p>
                <p className="text-[15px]">Email</p>
                <p className="text-[15px]">Admin</p>
            </div>
            {users?.map((user) => (
                <div className="p-[10px] flex items-center justify-between bg-[#275161]">
                    <div className="w-[50px] h-[50px] rounded-full overflow-hidden">
                        <img
                            src={user?.profilePic.url}
                            alt="profile"
                        />
                    </div>
                    <p className="text-[15px]">{user?.username}</p>
                    <p className="text-[15px]">{user?.email || "-----------------------"}</p>
                    <p className="text-[15px]">User</p>
                </div>
            ))}
        </section>
    );
};

export default Users;
