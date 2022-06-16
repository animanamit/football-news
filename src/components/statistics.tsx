import axios from "axios";
import { useQuery } from "react-query";

async function fetchStatistics(): Promise<any> {
  const data = await axios
    .get("https://api-football-v1.p.rapidapi.com/v3/teams", {
      method: "GET",
      headers: {
        "x-rapidapi-host": process.env.NEXT_PUBLIC_RAPID_API_HOST as string,
        "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPID_API_KEY as string,
      },
      params: { id: "49" },
    })
    .then((res) => {
      return res.data.response[0];
    });

  console.log(data);

  return data;
}
const Statistics = () => {
  return <div>Enter</div>;
};

export default Statistics;
