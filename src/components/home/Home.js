import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { userState } from "../../atoms/user.atom";
import { decodeJwt } from "../../helper/decodeJwt";
import Content from "./Content";
import Navbar from "./Navbar";

const Home = () => {
  const [user, setUser] = useRecoilState(userState);
  useEffect(() => {
    async function fetch() {
      await decodeJwt(setUser);
    }
    fetch();
  }, []);
  return (
    <div className="h-screen overflow-y-scroll scrollbar-hide">
      <Navbar search={true} />
      <Content />
    </div>
  );
};

export default Home;
