import { useState } from "react";
import { Octokit } from "octokit";

export function SerachGithubProfile() {
  const [username, setUsername] = useState("");
  const [userDetail, setUserDetail] = useState({});

  async function fetchUser() {
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      const data =  await response.json();
      console.log(data);
      setUserDetail(data);
    } catch (error) {
      console.log(error);
    }

  }
  return (
    <div className=" m-10  max-w-[80%] h-[90vh] mx-auto flex items-center justify-center bg-gray-800 rounded-md shadow-md p-4">
      <div className="w-full h-full flex flex-col items-center justify-center">
        <p className="text-white font-bold text-3xl">Fetch Github Profile</p>

        <div className=" search-box  relative bg-blue-900 flex items-center justify-center  gap-5 m-10 p-5  rounded-md shadow-md">
            <img src="icon-search.svg" alt="" className="w-6 h-6" />
            <input
              type="text"
              value={username}
              onChange={(event) => {
                setUsername(event.target.value);
              }}
              onKeyUp={(event) => {
                event.key === "Enter" && fetchUser() && setUsername("");
              }}
              placeholder="Username "
              className=" bg-gray-600  w-full h-full px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-500 text-white"
            />

            <button
              className=" text-white px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-600 transition duration-300 ease-in-out"
              onClick={fetchUser}>
              Search
            </button>
        </div>

        <div className="user-detail-container bg-gray-600 rounded-md p-8 space-y-4">
          <div className="flex items-center space-x-4">
            <img
              className="w-16 h-16 rounded-full"
              src={`${userDetail.avatar_url}`}
              alt=""
            />
            <h2 className="text-white text-2xl font-bold">{userDetail.name}</h2>
          </div>
          <div className="flex items-center space-x-4">
            <p className="text-gray-400 text-sm">Username : </p>
            <p className="text-white text-sm">{userDetail.login}</p>
          </div>
          <div className="flex items-center space-x-4">
            <p className="text-gray-400 text-sm">Created at : </p>
            <p className="text-white text-sm">{userDetail.created_at}</p>
          </div>
          <div className="flex items-center space-x-4">
            <p className="text-gray-400 text-sm">Bio : </p>
            <p className="text-white text-sm">{userDetail.bio}</p>
          </div>
          <div className="flex items-center space-x-4">
            <p className="text-gray-400 text-sm">Public repo : </p>
            <p className="text-white text-sm">{userDetail.public_repo}</p>
          </div>
          <div className="flex items-center space-x-4">
            <p className="text-gray-400 text-sm">Followers : </p>
            <p className="text-white text-sm">{userDetail.followers}</p>
          </div>
          <div className="flex items-center space-x-4">
            <p className="text-gray-400 text-sm">Following : </p>
            <p className="text-white text-sm">{userDetail.following}  </p>
          </div>
          <div className="flex items-center space-x-4">
            <p className="text-gray-400 text-sm">Location : </p>
            <p className="text-white text-sm">
              {userDetail.location ? userDetail.location : "Unspecified"}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <p className="text-gray-400 text-sm">Twitter username : </p>
            <p className="text-white text-sm">
              {userDetail.twitter_username
                ? userDetail.twitter_username
                : "Unspecified"}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <p className="text-gray-400 text-sm">Instagram username : </p>
            <p className="text-white text-sm">
              {userDetail.instagram_username
                ? userDetail.instagram_username
                : "Unknown"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/*

TODO : 

Dark theme 


Advance : 
Search a username , Add them in a user list with details saved THEN comparison between them for a role based on their repos






*/
