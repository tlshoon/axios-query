import React from "react";
import { useDynamicPhotoStore } from "./store/DynamicPhotoStore";
import { instance } from "./http/Base";
import { useQuery } from "react-query";

const DynamicPhoto = () => {
  const { num, setNum } = useDynamicPhotoStore();

  const fetchPhoto = async (num) => {
    const res = await instance.get(`/api/users/${num}`);
    return res.data.data;
  };

  const { data, isError, isLoading, isSuccess } = useQuery(
    ["photo", num],
    () => fetchPhoto(num),
    {
      enabled: !!num,
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="번호를 입력하면 사진을 가져옵니다."
          value={num}
          onChange={(e) => setNum(e.target.value)}
        />
      </form>
      {isLoading && <div>Loading...</div>}
      {isError && <div>Error...</div>}
      {isSuccess && data && (
        <div>
          <img src={data.avatar} alt={data.email} />
        </div>
      )}
    </>
  );
};

export default DynamicPhoto;
