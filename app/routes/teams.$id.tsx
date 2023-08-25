import { useLoaderData } from "@remix-run/react";
import { User, sampleUsers } from "~/models/user.server";
import { PieChart, Pie, Text, Cell } from "recharts";
import { Color, colorCodeMap, mapByColor } from "~/libs/rating.server";
import { useReducer } from "react";

export const loader = async () => {
  const colorUsersList = mapByColor(sampleUsers);
  console.log(colorUsersList);
  return {
    list: colorUsersList.map(([color, users]) => {
      const item: { color: Color; count: number; users: User[] } = {
        color: color,
        count: users.length,
        users: users,
      };
      return item;
    }),
    pie: colorUsersList
      .map(([color, users]) => {
        return {
          index: colorCodeMap.get(color)?.rank,
          name: color,
          value: users.length,
          color: colorCodeMap.get(color)?.color,
        };
      })
      .filter(({ value }) => value > 0),
  };
};
export default function Team() {
  const { list, pie } = useLoaderData<typeof loader>();
  const label = ({ name, value, color, cx, x, y }) => (
    <>
      <Text x={x} y={y} fill={color}>
        {name}
      </Text>
      <Text x={x} y={y} dominantBaseline="hanging" fill={color}>
        {value}
      </Text>
    </>
  );
  return (
    <div>
      {list.map(({ color, count, users }) => (
        <div key={color}>
          {users.map((user) => (
            <div key={user.atcoderId}>
              {user.atcoderId}: {user.algorithmRating}
            </div>
          ))}
        </div>
      ))}
      <div>
        <PieChart width={730} height={300}>
          <Pie
            data={pie}
            dataKey="value"
            cx="50%"
            cy="50%"
            outerRadius={100}
            // fill="#f31
            label={label}
          >
            {pie.map((data) => (
              <Cell key={data.name} fill={data.color} />
            ))}
          </Pie>
        </PieChart>
      </div>
    </div>
  );
}
