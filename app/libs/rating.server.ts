import { User } from "~/models/user.server";

export const calcTeamRating = (ratings: number[]) => {
  return 1;
};

export type Color =
  | "gold"
  | "silver"
  | "bronze"
  | "red"
  | "orange"
  | "yellow"
  | "blue"
  | "cyan"
  | "green"
  | "brown"
  | "gray"
  | "black";

export const colorCodeMap: Map<Color, { color: string; rank: number }> =
  new Map([
    [
      "gold",
      {
        color:
          "linear-gradient(to right, rgb(255, 215, 0), white, rgb(255, 215, 0))",
        rank: 1,
      },
    ],
    [
      "silver",
      {
        color:
          "linear-gradient(to right, rgb(128, 128, 128), white, rgb(128, 128, 128))",
        rank: 2,
      },
    ],
    [
      "bronze",
      {
        color:
          "linear-gradient(to right, rgb(150, 92, 44), rgb(255, 218, 189), rgb(150, 92, 44))",
        rank: 3,
      },
    ],
    ["red", { color: "#FF0000", rank: 4 }],
    ["orange", { color: "#FF8000", rank: 5 }],
    ["yellow", { color: "#C0C000", rank: 6 }],
    ["blue", { color: "#0000FF", rank: 7 }],
    ["cyan", { color: "#00C0C0", rank: 8 }],
    ["green", { color: "#008000", rank: 9 }],
    ["brown", { color: "#804000", rank: 10 }],
    ["gray", { color: "#808080", rank: 11 }],
    ["black", { color: "#000000", rank: 12 }],
  ]);

export type ContestType = "algorithm" | "heuristics";

export const getColor = (rating: number | null): Color => {
  if (!rating) {
    return "black";
  }
  return rating >= 4000
    ? "gold"
    : rating >= 3600
    ? "silver"
    : rating >= 3200
    ? "bronze"
    : rating >= 2800
    ? "red"
    : rating >= 2400
    ? "orange"
    : rating >= 2000
    ? "yellow"
    : rating >= 1600
    ? "blue"
    : rating >= 1200
    ? "cyan"
    : rating >= 800
    ? "green"
    : rating >= 400
    ? "brown"
    : "gray";
};

export const mapByColor = (
  users: User[],
  contestType: ContestType = "algorithm"
): Array<[Color, User[]]> => {
  const colorUsersMap: Map<Color, User[]> = new Map([
    ["gold", []],
    ["silver", []],
    ["bronze", []],
    ["red", []],
    ["orange", []],
    ["yellow", []],
    ["blue", []],
    ["cyan", []],
    ["green", []],
    ["brown", []],
    ["gray", []],
    ["black", []],
  ]);
  users.forEach((user) => {
    const rating =
      contestType === "algorithm"
        ? user.algorithmRating
        : user.heuristicsRating;
    colorUsersMap.get(getColor(rating))?.push(user);
  });
  const ret = [...colorUsersMap].sort(
    (a, b) =>
      (colorCodeMap.get(a[0])?.rank ?? 0) - (colorCodeMap.get(b[0])?.rank ?? 0)
  );
  return ret;
};
