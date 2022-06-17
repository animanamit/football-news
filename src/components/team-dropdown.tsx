import axios from "axios";
import { useQuery } from "react-query";

import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useStore } from "../pages";

async function fetchTeamIds() {
  try {
    let data = await axios
      .get("https://api-football-v1.p.rapidapi.com/v3/teams", {
        method: "GET",
        headers: {
          "x-rapidapi-host": process.env.NEXT_PUBLIC_RAPID_API_HOST as string,
          "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPID_API_KEY as string,
        },
        params: { league: "39", season: "2021" },
      })
      .then((res) => {
        return res.data.response;
      });

    console.log(data);
    return data;
  } catch (error) {
    return error;
  }
}

const TeamDropdown = () => {
  let { data, error, isLoading } = useQuery("fetchTeamIds", fetchTeamIds);

  const setTeamId = useStore((state) => state.setTeamId);

  if (data) {
    return (
      <div className="flex justify-end absolute top-2 right-4 uppercase bg-[rgba(23,12,61,0.4)] ">
        <Menu
          as="div"
          className="absolute  overflow-scroll py-2 bg-[rgba(23,12,61,0.4)] rounded-xl p-2"
        >
          <div>
            <Menu.Button
              as="button"
              className="uppercase font-semibold text-slate-200 tracking-medium whitespace-nowrap"
            >
              SELECT TEAM
            </Menu.Button>
          </div>
          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
            as={Fragment}
          >
            <Menu.Items className="flex flex-col z-10 p-4  text-white rounded-xl space-y-2 max-h-44 overflow-y-scroll py-2">
              {data.map((item: any, index: number) => {
                return (
                  <Menu.Item key={index}>
                    <button
                      onClick={() => {
                        console.log(item.team.id);
                        setTeamId(item.team.id);
                      }}
                      className="opacity-75 cursor-pointer uppercase  text-white bg-transparent duration-120 rounded-lg p-4 flex justify-center hover:shadow-md hover:bg-white/10 hover:shadow-[rgb(255 255 255 / 20%) 0px 0px 0px 0.5px inset]  w-full p-1"
                    >
                      {item.team.name}
                    </button>
                  </Menu.Item>
                );
              })}
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    );
  }
  return <></>;
};

export default TeamDropdown;
