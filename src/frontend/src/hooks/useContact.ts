import { createActor } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ContactInput, ContactMessage } from "../types";

interface ContactBackend {
  submitContact(name: string, email: string, message: string): Promise<void>;
  getMessages(): Promise<ContactMessage[]>;
}

function useBackend() {
  const { actor, isFetching } = useActor(createActor);
  return { actor: actor as unknown as ContactBackend | null, isFetching };
}

export function useSubmitContact() {
  const { actor, isFetching } = useBackend();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: ContactInput) => {
      if (!actor) throw new Error("Backend not ready");
      return actor.submitContact(input.name, input.email, input.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages"] });
    },
    meta: { disabled: isFetching },
  });
}

export function useGetMessages() {
  const { actor, isFetching } = useBackend();

  return useQuery<ContactMessage[]>({
    queryKey: ["messages"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMessages();
    },
    enabled: !!actor && !isFetching,
  });
}
