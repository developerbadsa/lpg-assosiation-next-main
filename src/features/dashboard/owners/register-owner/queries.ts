'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { RegisterOwnerInput } from './types';
import { registerOwnerRepo } from './repo';

export function useRegisterOwner() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (input: RegisterOwnerInput) => registerOwnerRepo(input),
    onSuccess: async () => {
      // New owner should appear in Unverified
      await qc.invalidateQueries({ queryKey: ['owners', 'unverified'] });
      await qc.invalidateQueries({ queryKey: ['owners', 'verified'] });
    },
  });
}
