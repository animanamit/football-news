import { useQuery } from "react-query";
import { useStore } from "../pages";

interface TeamPosition {
  team: {
    name: string;
  };
}

async function fetchLeagueStandings(season: number) {
  let url = new URL("https://api-football-v1.p.rapidapi.com/v3/standings");
  url.searchParams.append("league", "39");
  url.searchParams.append("season", season.toString());

  const data = await fetch(url.toString(), {
    method: "GET",
    headers: {
      "x-rapidapi-host": process.env.NEXT_PUBLIC_RAPID_API_HOST as string,
      "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPID_API_KEY as string,
    },
  })
    .then((res) => res.json())
    .then((data) => data.response[0].league.standings[0]);
  return data;
}

interface AppState {
  teamId: number;
  season: number;
  setTeamId: (newId: number) => void;
}

const Standings = () => {
  const season = useStore((state: { season: number }) => state.season);
  const { data, error, isLoading } = useQuery<TeamPosition[], Error>(
    ["standings", season],
    () => fetchLeagueStandings(season)
  );

  if (isLoading)
    return (
      <div className="h-fit flex flex-col rounded-xl py-2 px-4 w-1/3 mt-2 bg-[rgba(23,12,61,0.4)] overflow-hidden  shadow-[rgb(255 255 255 / 20%) 0px 0px 0px 0.5px inset] backdrop-blur-md">
        <h4 className="py-2 text-xl font-semibold leading-10 text-center uppercase tracking-loose text-slate-200">
          Loading...
        </h4>
      </div>
    );

  if (error)
    return (
      <div className="h-fit flex flex-col rounded-xl py-2 px-4 w-1/3 mt-2 bg-[rgba(23,12,61,0.4)] overflow-hidden  shadow-[rgb(255 255 255 / 20%) 0px 0px 0px 0.5px inset] backdrop-blur-md">
        <h4 className="py-2 text-xl font-semibold leading-10 text-center uppercase tracking-loose text-slate-200">
          Error! Please reload this page!
        </h4>
      </div>
    );

  if (data) {
    return (
      <div className="h-[400px] flex flex-col rounded-xl pt-2 pb-6 px-4 flex-1 mt-2 bg-[rgba(23,12,61,0.4)] overflow-hidden  shadow-[rgb(255 255 255 / 20%) 0px 0px 0px 0.5px inset] backdrop-blur-md">
        <div className="">
          <h4 className="py-2 text-3xl font-semibold leading-10 text-center uppercase tracking-loose text-slate-200">
            League Standings
          </h4>
        </div>
        <div className="flex-1 overflow-y-scroll">
          <div className="flex flex-col justify-center space-y-2 ">
            {data.map((item: TeamPosition, index: number) => {
              return (
                <div
                  key={index}
                  className=" text-white bg-transparent duration-120 rounded-lg p-4 flex justify-center uppercase hover:shadow-md hover:bg-white/10 hover:shadow-[rgb(255 255 255 / 20%) 0px 0px 0px 0.5px inset] "
                >
                  <h5>{item.team.name}</h5>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return <></>;
};

export default Standings;
