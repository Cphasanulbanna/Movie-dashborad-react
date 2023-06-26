import React, { useState, useEffect } from "react";

//package
import moment from "moment/moment";

import { useUserDataStore } from "../zustand/store";

//axios
import axiosConfig from "../../../axiosConfig";

const Users = () => {
    const [users, setUsers] = useState([]);

    const { userdata } = useUserDataStore();
    const access_token = userdata?.access_token;
    const fetchUsers = async () => {
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
        } catch (error) {}
    };
    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <section className="flex flex-col gap-[5px] relative pt-[50px] md4:overflow-scroll md4:flex-shrink-0 md4:min-w-full md4:w-fit">
            <div className="p-[10px] flex items-center justify-between absolute top-0 left-0 w-full bg-blue-text md4:gap-[10px] md4:flex-shrink-0">
                <p className="text-[15px] text-center w-[10%]">Profile</p>
                <p className="text-[15px] text-center w-[26%] lg1:w-[220px]">Name</p>
                <p className="text-[15px] text-center w-[26%] lg1:w-[250px]">Email</p>
                <p className="text-[15px] text-center w-[26%] lg1:w-[200px]">Date Joined</p>
                <p className="text-[15px] text-center w-[10%]">Admin</p>
            </div>
            {users?.map((user, index) => (
                <div
                    key={index}
                    className="p-[10px] flex items-center justify-between bg-[#275161] md4:gap-[10px] md4:flex-shrink-0"
                >
                    <div className="w-[10%] flex justify-center">
                        <div className="w-[50px]  justify-center h-[50px] rounded-full overflow-hidden flex">
                            <img
                                src={user?.profilePic.url}
                                alt="profile"
                                className="h-[auto] max-h-[100%] object-cover object-top"
                            />
                        </div>
                    </div>
                    <p className="text-[15px] w-[26%] lg1:w-[220px] text-center">
                        {user?.username}
                    </p>
                    <p className="text-[15px] w-[26%] lg1:w-[250px] text-center">{user?.email}</p>
                    <p className="text-[15px] w-[26%] lg1:w-[200px] text-center">
                        {moment(user?.createdAt).format("DD-MM-YYYY")}
                    </p>
                    <p className="text-[15px] w-[10%] text-center">{user?.role}</p>
                </div>
            ))}
        </section>
    );
};

export default Users;
