import {
  Typography,
  Box,
  Card,
  Container,
  Button,
  styled
} from '@mui/material';
import type { ReactElement } from 'react';
import BaseLayout from 'src/layouts/BaseLayout';
import SidebarLayout from 'src/layouts/SidebarLayout';
import Link from 'src/components/Link';
import Head from 'next/head';

import Logo from 'src/components/LogoSign';
import Hero from 'src/content/Overview/Hero';
import DashboardCrypto from './dashboards/crypto/index';


const HeaderWrapper = styled(Card)(
  ({ theme }) => `
  width: 100%;
  display: flex;
  align-items: center;
  height: ${theme.spacing(10)};
  margin-bottom: ${theme.spacing(10)};
`
);

const OverviewWrapper = styled(Box)(
  ({ theme }) => `
    overflow: auto;
    background: ${theme.palette.common.white};
    flex: 1;
    overflow-x: hidden;
`
);

function Overview() {
 
  return (
    <OverviewWrapper>
      <Head>
        <title>Propersubset Dashboard</title>
      </Head>
      <DashboardCrypto/>
      {/* <HeaderWrapper>
        <Container maxWidth="lg">
          <Box display="flex" alignItems="center">
            <Logo />
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              flex={1}
            >
              <Box />
              <Box>
                <Button
                  component={Link}
                  href="/dashboards/crypto"
                  variant="contained"
                  sx={{ ml: 2 }}
                >
                  Launch App
                </Button>
              </Box>
            </Box>
          </Box>
        </Container>
      </HeaderWrapper> */}
      {/* <Hero /> */}
      {/* <Container maxWidth="lg" sx={{ mt: 8 }}>
        <Typography textAlign="center" variant="subtitle1">
          by{' '}
          <Link
            href=""
            target="_blank"
            rel="noopener noreferrer"
          >
            Propersubset LLC
          </Link>
        </Typography>
      </Container> */}
    </OverviewWrapper>
  );
}

export default Overview;

Overview.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>;
};
