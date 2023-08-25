import { type User } from "~/models/user.server";

export const getUserInfo = async (atcoderId: string): Promise<User> => {
  const algoRating = await fetch(
    `https://atcoder.jp/users/${atcoderId}/history/json`
  )
    .then((resp) => resp.json())
    .then((data: any[]) => {
      if (data.length > 1) return data[data.length - 2]["NewRating"] as number;
      else return null;
    });
  const heuristicsRating = await fetch(
    `https://atcoder.jp/users/${atcoderId}/history/json?contestType=heuristic`
  )
    .then((resp) => resp.json())
    .then((data) => {
      if (data.length > 1) return data[data.length - 2]["NewRating"] as number;
      else return null;
    });
  return {
    atcoderId,
    algorithmRating: algoRating,
    heuristicsRating: heuristicsRating,
  };
};
