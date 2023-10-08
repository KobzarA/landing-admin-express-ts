import axios from "axios";
import { API_BASE } from "../config";
import { IUser } from "../components/App";

export const logout = async (setUser: Function) => {
  try {
    const res = await axios.get<{ message: string }>(
      `${API_BASE}admin/logout`,
      {
        withCredentials: true,
      },
    );
    if (res.status === 200) setUser(null);
  } catch (error) {
    throw error;
  }
};

export const checkAuth = async (setUser: Function) => {
  try {
    const checked = await axios.get<IUser | null>(
      `${API_BASE}admin/login/validate`,
      {
        withCredentials: true,
      },
    );
    if (checked.status === 403) return setUser(null);
    console.log(checked);
    return setUser(checked.data);
  } catch (error) {
    setUser(null);
  }
};
