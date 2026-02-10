import React from "react";
import axios from "axios";
export default async function User() {
  const response = await axios.get("http://localhost:3000/api/v1/user/details");
  const data = response.data;

  return (
    <div>
      <h1>{data.user}</h1>
      <h1>{data.email}</h1>
    </div>
  );
}
