import { Skeleton } from '@mui/material';

export default function SkeletonFormField() {
  return (
    <Skeleton
      animation="wave"
      variant="rounded"
      sx={{ height: 50, flex: 1, margin: 0, padding: 0 }}
    />
  );
}
