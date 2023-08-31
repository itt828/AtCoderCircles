import { z } from "zod";
import { getUserInfo } from "~/libs/atcoder-api.server";
import { db } from "~/utils/db.server";

export const userSchema = z.object({
  atcoderId: z.string(),
  algorithmRating: z.nullable(z.number()),
  heuristicsRating: z.nullable(z.number()),
});
export type User = z.infer<typeof userSchema>;

export const teamSchema = z.object({
  members: z.array(userSchema),
  teamAlgorithmRating: z.number(),
  teamHeuristicsRating: z.number(),
});

export type Team = z.infer<typeof teamSchema>;

export const sampleUsers: User[] = [
  { atcoderId: "itt828", algorithmRating: 1228, heuristicsRating: 563 },
  { atcoderId: "tatyam", algorithmRating: 3148, heuristicsRating: 1222 },
  { atcoderId: "simasima", algorithmRating: 2566, heuristicsRating: null },
  { atcoderId: "shobonvip", algorithmRating: 2287, heuristicsRating: 218 },
  { atcoderId: "noya2", algorithmRating: 2167, heuristicsRating: 1088 },
  { atcoderId: "ebi_fly", algorithmRating: 1952, heuristicsRating: 843 },
  { atcoderId: "x0214sh7", algorithmRating: 1948, heuristicsRating: 877 },
];

/// DBのユーザーテーブルにユーザーを追加　既存の場合は何もせず、新規はatcoder.jpからデータを取ってきてDBに追加
export const mergeUsers = async (atcoderIds: string[]) => {
  const usersTmp = await db.user.findMany({
    where: {
      atcoderId: {
        in: atcoderIds,
      },
    },
  });
  db.user.deleteMany({
    where: {
      atcoderId: {
        in: atcoderIds,
      },
    },
  });
  const users: User[] = [...usersTmp];
  const existUsersId = users.map((v) => v.atcoderId);
  const newAtcoderIds = atcoderIds.filter((v) => !existUsersId.includes(v));
  console.log(existUsersId);
  console.log(newAtcoderIds);
  for (const atcoderId of newAtcoderIds) {
    const userInfo = await getUserInfo(atcoderId);
    users.push({
      ...userInfo,
    });
    setTimeout(() => {}, 100);
  }
  console.log(users);
  const { count } = await db.user.createMany({ data: users });
  console.log(count);
  return users;
};
