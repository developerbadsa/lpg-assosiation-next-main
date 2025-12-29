import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { noticesRepo } from './repo';

const KEY = ['dashboard', 'notices'];

export function useNoticesList() {
  return useQuery({
    queryKey: KEY,
    queryFn: () => noticesRepo.list(),
    staleTime: 15_000,
    refetchOnWindowFocus: false,
  });
}

export function useCreateNotice() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: noticesRepo.create,
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: KEY });
    },
  });
}

export function useNoticeDetails(id: string | null, open: boolean) {
  return useQuery({
    queryKey: ['dashboard', 'notices', 'details', id],
    queryFn: () => noticesRepo.getDetails(id as string),
    enabled: open && !!id,
    staleTime: 10_000,
    refetchOnWindowFocus: false,
  });
}

export function useDeleteNotice() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => noticesRepo.remove(id),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: KEY });
    },
  });
}
