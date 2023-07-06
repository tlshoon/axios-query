import React from "react";
import { useQuery } from "react-query";
import { instance } from "./http/Base";
import { useDynamicStore } from "./store/DynamicStore";

async function fetchName(num) {
  const res = await instance.get(`/api/resource?page=${num}`);
  return res.data.data;
}

const Dynamic = () => {
  const { num, setNum } = useDynamicStore();

  const { data, isLoading, isSuccess, isError } = useQuery(
    ["name", num],
    () => fetchName(num),
    { enabled: !!num } // Only run the query if a number has been entered
  );

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={num}
          onChange={(e) => setNum(e.target.value)}
          placeholder="숫자를 입력하면 이름을 가져옵니다."
        />
      </form>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error occurred while fetching data.</p>}
      {isSuccess && data.map((data) => <div key={data.id}>{data.name}</div>)}
    </div>
  );
};

export default Dynamic;
