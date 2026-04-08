import { useQuery } from "@tanstack/react-query";
import type { UserDetail } from "../types";

export function useUserDetail(userId: number | undefined) {
  return useQuery<UserDetail | null>({
    queryKey: ["userDetail", userId],
    queryFn: async () => {
      if (userId == null) return null;
      return null;
    },
    enabled: userId != null,
    staleTime: 1000 * 60 * 5,
  });
}
