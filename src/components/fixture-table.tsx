import axios from "axios";
import { useQuery } from "react-query";

async function fetchFixtures() {
  const dataObj = await axios
    .get("https://api-football-v1.p.rapidapi.com/v3/fixtures", {
      method: "GET",
      headers: {
        "x-rapidapi-host": process.env.NEXT_PUBLIC_RAPID_API_HOST as string,
        "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPID_API_KEY as string,
      },
      params: { team: "49", season: "2021" },
    })
    .then((res) => {
      return res.data.response;
    });

  // convert object of object to array of objects
  let data = Object.keys(dataObj).map((key) => {
    return dataObj[key];
  });
  return data;
}

const FixtureTable: any = () => {
  const { data, error, isLoading } = useQuery("fixtures", fetchFixtures);

  if (isLoading)
    return (
      <div className="h-fit flex flex-col rounded-xl py-2 px-4 w-1/3 mt-2 bg-[rgba(23,12,61,0.4)] overflow-hidden  shadow-[rgb(255 255 255 / 20%) 0px 0px 0px 0.5px inset] backdrop-blur-md">
        <h4 className="uppercase tracking-loose text-xl leading-10 font-semibold text-slate-200 text-center py-2">
          Loading...
        </h4>
      </div>
    );

  if (error)
    return (
      <div className="h-fit flex flex-col rounded-xl py-2 px-4 w-1/3 mt-2 bg-[rgba(23,12,61,0.4)] overflow-hidden  shadow-[rgb(255 255 255 / 20%) 0px 0px 0px 0.5px inset] backdrop-blur-md">
        <h4 className="uppercase tracking-loose text-xl leading-10 font-semibold text-slate-200 text-center py-2">
          Error! Please reload this page!
        </h4>
      </div>
    );

  if (data) {
    if (data == [] || data.length == 0) {
      return (
        <div className="h-[400px] flex flex-col rounded-xl py-2 px-4 w-1/3 mt-2 bg-[rgba(23,12,61,0.4)] overflow-hidden  shadow-[rgb(255 255 255 / 20%) 0px 0px 0px 0.5px inset] backdrop-blur-md">
          <h4 className="uppercase tracking-loose text-xl leading-10 font-semibold text-slate-200 text-center py-2">
            Latest fixture dates have not been been released yet!
          </h4>
        </div>
      );
    }

    return (
      <div className="h-[400px] flex flex-col rounded-xl py-2 px-4 w-1/3 mt-2 bg-[rgba(23,12,61,0.4)] overflow-hidden  shadow-[rgb(255 255 255 / 20%) 0px 0px 0px 0.5px inset] backdrop-blur-md">
        <div className="">
          <h4 className="uppercase tracking-loose text-3xl leading-10 font-semibold text-slate-200 text-center py-2">
            UPCOMING Fixtures
          </h4>
        </div>
        <div className="flex flex-col justify-center space-y-2 overflow-hidden scroll">
          {data.map((item: any, index: number) => {
            return (
              <div
                key={index}
                className=" text-white bg-transparent duration-120 rounded-lg p-4 flex justify-center uppercase hover:shadow-md hover:bg-white/10 hover:shadow-[rgb(255 255 255 / 20%) 0px 0px 0px 0.5px inset] "
              >
                <h5>
                  {item.teams.home.name} vs {item.teams.away.name}
                </h5>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
};

export default FixtureTable;
