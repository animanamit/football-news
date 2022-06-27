import { useQuery } from "react-query";
import { useStore } from "../pages";

async function fetchBio(teamId: number) {
  let url = new URL("https://api-football-v1.p.rapidapi.com/v3/teams");
  url.searchParams.append("id", teamId.toString());

  const data = await fetch(url.toString(), {
    method: "GET",
    headers: {
      "x-rapidapi-host": process.env.NEXT_PUBLIC_RAPID_API_HOST as string,
      "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPID_API_KEY as string,
    },
  })
    .then((res) => res.json())
    .then((data) => data.response[0]);

  return data;
}

type TeamData = {
  team: {
    name: string;
    id: number;
  };
  venue: {
    image: string;
  };
};

const TeamBio = () => {
  const teamId = useStore((state: { teamId: number }) => state.teamId);

  const { data, error, isLoading } = useQuery<TeamData, Error>(
    ["bio", teamId],
    () => fetchBio(teamId)
  );

  if (isLoading)
    return (
      <div className="relative w-4/5 rounded-xl h-52">
        <h4 className="absolute font-semibold tracking-wide text-white uppercase right-4 bottom-7 text-7xl opacity-60">
          Loading...
        </h4>
      </div>
    );

  if (error)
    return (
      <div className="relative w-4/5 rounded-xl h-52">
        <h4 className="absolute font-semibold tracking-wide text-white uppercase right-4 bottom-7 text-7xl opacity-60">
          Error! Please reload this page!
        </h4>
      </div>
    );
  if (data) {
    return (
      <div className="relative w-4/5 rounded-xl h-52">
        <div className="w-full h-full overflow-hidden">
          <img
            src={data.venue.image}
            alt={`${data.team.name}'s home ground`}
            className="object-cover w-full h-full overflow-hidden rounded-xl opacity-80"
          />
        </div>
        <div className="absolute text-5xl font-semibold tracking-wide text-white uppercase right-4 bottom-7 opacity-60">
          <h5>{data.team.name}</h5>
        </div>
      </div>
    );
  }

  return <></>;
};

export default TeamBio;
