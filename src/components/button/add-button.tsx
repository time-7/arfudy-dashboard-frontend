'use client';

import { useRouter } from 'next/navigation';

import AddIcon from '@mui/icons-material/Add';
import { Button, ButtonProps } from '@mui/material';

type TAddButton = {
  text: string;
  route?: string;
} & ButtonProps;

export default function AddButton({ text, route, ...props }: TAddButton) {
  const router = useRouter();

  return (
    <Button
      onClick={() => route && router.push(route)}
      startIcon={<AddIcon />}
      {...props}
    >
      {text}
    </Button>
  );
}
