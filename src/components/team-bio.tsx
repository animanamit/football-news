import axios from "axios";
import { useQuery } from "react-query";
import { useStore } from "../pages";

async function fetchBio({ queryKey }: any): Promise<any> {
  const [_key, obj] = queryKey;
  const data = await axios
    .get("https://api-football-v1.p.rapidapi.com/v3/teams", {
      method: "GET",
      headers: {
        "x-rapidapi-host": process.env.NEXT_PUBLIC_RAPID_API_HOST as string,
        "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPID_API_KEY as string,
      },
      params: { id: obj.teamId },
    })
    .then((res) => {
      return res.data.response[0];
    });

  console.log(data);

  return data;
}

const TeamBio = () => {
  const teamId = useStore((state: { teamId: number }) => state.teamId);

  const { data, error, isLoading } = useQuery(
    ["bio", { teamId: teamId }],
    fetchBio
  );

  if (isLoading)
    return (
      <div className="rounded-xl w-4/5 h-52 relative">
        <h4 className="text-white absolute font-semibold tracking-wide uppercase right-4 bottom-7 text-7xl opacity-60">
          Loading...
        </h4>
      </div>
    );

  if (error)
    return (
      <div className="rounded-xl w-4/5 h-52 relative">
        <h4 className="text-white absolute font-semibold tracking-wide uppercase right-4 bottom-7 text-7xl opacity-60">
          Error! Please reload this page!
        </h4>
      </div>
    );

  return (
    <div className="rounded-xl w-4/5 h-52 relative">
      <div className="h-full w-full overflow-hidden">
        <img
          src={data.venue.image}
          alt={`${data.team.name}'s home ground`}
          className="w-full rounded-xl h-full object-cover overflow-hidden opacity-80"
        />
      </div>
      <div className="text-white absolute font-semibold tracking-wide uppercase right-4 bottom-7 text-7xl opacity-60">
        <h5>{data.team.name}</h5>
      </div>
    </div>
  );
};

export default TeamBio;
