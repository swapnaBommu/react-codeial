import { useState } from "react";

export const useProvideAuth = () => {
    const [user, serUser] = useState(null);
    const[loading,setLoading] = useState(true);

    const login = (email,password) => {};

    const logout = () => {};

    return {
        user,
        login,
        logout,
        loading
    }

};