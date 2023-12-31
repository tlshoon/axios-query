import { useMutation, useQuery } from "react-query";
import "./App.css";
import { instance } from "./http/Base";

async function fetchUser() {
  const res = await instance.get("/api/users?page=2");
  return res.data.data;
}

async function delayUser() {
  const res = await instance.get("/api/users?delay=3");
  return res.data.data;
}

async function postUser() {
  const req = await instance.post("/api/users", {
    name: "morpheus",
    job: "leader",
  });
  return req.data;
}

function App() {
  const {
    data: userData,
    isLoading: userLoading,
    isError: userError,
    error: userErrorDetails,
  } = useQuery("users", fetchUser);  // 컴포넌트가 마운트 될 때 캐시에 users가 있는지 확인하고 없으면 바로 실행
  const {
    data: delayData,
    isLoading: delayLoading,
    isError: delayError,
    error: delayErrorDetails,
  } = useQuery("delayedUsers", delayUser);

  const postUserMutation = useMutation(postUser);

  if (userLoading || delayLoading) {
    return <div>Loading...</div>;
  }

  if (userError || delayError) {
    return (
      <div>
        Error: {userErrorDetails?.message || delayErrorDetails?.message}
      </div>
    );
  }
  return (
    <div>
      <ul>
        {userData &&
          userData.map((user) => <li key={user.id}>{user.email}</li>)}
      </ul>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        {delayData &&
          delayData.map((user) => (
            <div
              key={user.id}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                margin: "10px",
              }}
            >
              <img
                src={user.avatar}
                alt={user.first_name}
                style={{ width: "40px", height: "40px" }}
              />
            </div>
          ))}
      </div>
      <button onClick={() => postUserMutation.mutate()}>Post User</button>
      {postUserMutation.isSuccess && (
        <div>{postUserMutation.data.createdAt}</div>
      )}
    </div>
  );
}

export default App;
