import { useEffect, useState } from "react";
import axios from "axios";

type Pokemon = {
  base_experience: number;
  name: string;
};

type User = {
  name: string;
  email: string;
};

const AboutPage = () => {
  const [user, setUser] = useState<User>();

  const fetchData = async () => {
    const data = await axios.get(
      "https://mock-api.arikmpt.com/api/user/profile",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    // const data = await fetch("https://pokeapi.co/api/v2/pokemon/ditto");
    // const json = await data.json();
    setUser(data.data.data);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetchData();
    } else {
      window.location.href = "/";
    }
  }, []);

  return (
    <div className="flex flex-col">
      About Me
      <button className="bg-slate-400 " onClick={handleLogout}>
        Log out
      </button>
      <div className="text-black">{user?.name}</div>
      <div className="text-black">{user?.email}</div>
    </div>
  );
};

export default AboutPage;
