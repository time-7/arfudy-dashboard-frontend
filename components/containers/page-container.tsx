import { ReactNode } from 'react';

import { Box, BoxProps } from '@mui/material';

type TPageContainer = BoxProps & {
	children: ReactNode;
};

export default function PageContainer({ children, ...props }: TPageContainer) {
	return (
		<Box
			{...props}
			sx={{
				display: 'flex',
				flexDirection: 'column',
				gap: 4,
				height: '100%',
				margin: 2,
				padding: 5.5,
				borderRadius: 2,
				backgroundColor: 'secondary.main'
			}}
		>
			{children}
		</Box>
	);
}
