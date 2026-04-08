import { useQuery } from "@tanstack/react-query";
import type { User } from "../types";

export function useUsers() {
  return useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async () => [],
    staleTime: 1000 * 60 * 5,
  });
}
