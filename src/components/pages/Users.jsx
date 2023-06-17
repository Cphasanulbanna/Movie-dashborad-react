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
    return <div>Users</div>;
};

export default Users;
