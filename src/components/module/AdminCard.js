import * as React from 'react';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardActions from '@mui/joy/CardActions';
import CircularProgress from '@mui/joy/CircularProgress';
import Typography from '@mui/joy/Typography';
import SvgIcon from '@mui/joy/SvgIcon';
import { e2p } from '@/utils/replaceNumbers';

export default function AdminCard() {
  return (
    <Card variant="solid" className="bg-asliLight" invertedColors>
      <CardContent orientation="horizontal">
        <CircularProgress size="lg" determinate value={30}>
          <SvgIcon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
              />
            </svg>
          </SvgIcon>
        </CircularProgress>
        <CardContent  >
          <Typography level="body-md"> سود ناخالص </Typography>
          <Typography level="h2"> {e2p(5)} میلیون </Typography>
        </CardContent>
      </CardContent>
      <CardActions>
        <Button variant="soft" className='bg-khas hover:bg-orange-500' size="sm">
            دیدن جزییات
        </Button>
      </CardActions>
    </Card>
  );
}