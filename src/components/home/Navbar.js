import React from "react";
import { IoDocument } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import GoogleLogin from "react-google-login";
import { loginCID } from "../../constants/Login";
import { handleLoginSuccess } from "../../functions/handleLogin";
import { useRecoilState } from "recoil";
import { userState } from "../../atoms/user.atom";

const Navbar = ({ search }) => {
  const [user, setUser] = useRecoilState(userState);
  const handleSuccess = async (rsp) => {
    await handleLoginSuccess(rsp.profileObj, setUser);
  };
  const handleFailure = (rsp) => {
    console.log(rsp);
  };
  return (
    <div className="flex justify-between items-center px-4 py-2 border sticky top-0 bg-white h-16 z-10">
      <div>
        <IoDocument className="text-gray-700 text-3xl" />
      </div>
      {search && (
        <div className="bg-gray-100">
          <input
            type="search"
            placeholder="Search"
            className="bg-gray-100 py-2 px-4 outline-none focus:outline-none rounded-md"
            style={{ width: "max(40vw, 150px)" }}
          />
        </div>
      )}
      <div>
        {user ? (
          <div className="cursor-pointer">
            <img
              src={user?.user?.img}
              alt={user?.user?.name}
              width={40}
              height={40}
              className="rounded-full"
            />
          </div>
        ) : (
          <GoogleLogin
            clientId={loginCID}
            buttonText=""
            render={(props) => {
              return (
                <button onClick={props.onClick} disabled={props.disabled}>
                  <FaUserCircle className="text-3xl text-gray-700" />
                </button>
              );
            }}
            onSuccess={handleSuccess}
            onFailure={handleFailure}
            cookiePolicy={"single_host_origin"}
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;
