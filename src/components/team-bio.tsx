import axios from "axios";
import { useQuery } from "react-query";

async function fetchBio(): Promise<any> {
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

const TeamBio = () => {
  const { data, error, isLoading } = useQuery("bio", fetchBio);

  if (isLoading)
    return (
      <div>
        <h4>Loading...</h4>
      </div>
    );

  if (error)
    return (
      <div>
        <h4>Error! Please reload this page!</h4>
      </div>
    );

  return (
    <div className="bg-teal-300 rounded-xl w-72">
      <div className="h-full w-full">
        <img
          src={data.venue.image}
          alt={`${data.team.name}'s home ground`}
          className="w-full rounded-t-xl h-full"
        />
      </div>
      <div className="text-white p-4">
        <h5>{data.team.name}</h5>

        <h5>{data.venue.name}</h5>
        <h5>{data.venue.city}</h5>
        <h5>{data.team.country}</h5>
      </div>
    </div>
  );
};

export default TeamBio;
