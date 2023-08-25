import { z } from "zod";

export const userSchema = z.object({
  atcoderId: z.string(),
  algorithmRating: z.number(),
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
  { atcoderId: "itt", algorithmRating: 1228, heuristicsRating: 563 },
  { atcoderId: "tatyam", algorithmRating: 3148, heuristicsRating: 1222 },
  { atcoderId: "simasima", algorithmRating: 2566, heuristicsRating: null },
  { atcoderId: "shobonvip", algorithmRating: 2287, heuristicsRating: 218 },
  { atcoderId: "noya2", algorithmRating: 2167, heuristicsRating: 1088 },
  { atcoderId: "ebi_fly", algorithmRating: 1952, heuristicsRating: 843 },
  { atcoderId: "x0214sh7", algorithmRating: 1948, heuristicsRating: 877 },
];
