import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  styled
} from '@mui/material';

import Link from 'src/components/Link';

const TypographyH1 = styled(Typography)(
  ({ theme }) => `
    font-size: ${theme.typography.pxToRem(50)};
`
);

const TypographyH2 = styled(Typography)(
  ({ theme }) => `
    font-size: ${theme.typography.pxToRem(17)};
`
);

const LabelWrapper = styled(Box)(
  ({ theme }) => `
    background-color: ${theme.colors.success.main};
    color: ${theme.palette.success.contrastText};
    font-weight: bold;
    border-radius: 30px;
    text-transform: uppercase;
    display: inline-block;
    font-size: ${theme.typography.pxToRem(11)};
    padding: ${theme.spacing(0.5)} ${theme.spacing(1.5)};
    margin-bottom: ${theme.spacing(2)};
`
);

const MuiAvatar = styled(Box)(
  ({ theme }) => `
    width: ${theme.spacing(8)};
    height: ${theme.spacing(8)};
    border-radius: ${theme.general.borderRadius};
    background-color: #e5f7ff;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto ${theme.spacing(2)};

    img {
      width: 60%;
      height: 60%;
      display: block;
    }
`
);

const TsAvatar = styled(Box)(
  ({ theme }) => `
    width: ${theme.spacing(8)};
    height: ${theme.spacing(8)};
    border-radius: ${theme.general.borderRadius};
    background-color: #dfebf6;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto ${theme.spacing(2)};

    img {
      width: 60%;
      height: 60%;
      display: block;
    }
`
);

const NextJsAvatar = styled(Box)(
  ({ theme }) => `
  width: ${theme.spacing(8)};
  height: ${theme.spacing(8)};
  border-radius: ${theme.general.borderRadius};
  background-color: #dfebf6;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${theme.spacing(2)};

    img {
      width: 60%;
      height: 60%;
      display: block;
    }
`
);

function Hero() {
  return (
    <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
      <Grid
        spacing={{ xs: 6, md: 10 }}
        justifyContent="center"
        alignItems="center"
        container
      >
        <Grid item md={10} lg={8} mx="auto">
          <LabelWrapper color="success">Version 1.0.0</LabelWrapper>
          <TypographyH1 sx={{ mb: 2 }} variant="h1">
            Propersubset Hedge Fund 
          </TypographyH1>
          <TypographyH2
            sx={{ lineHeight: 1.5, pb: 4 }}
            variant="h4"
            color="text.secondary"
            fontWeight="normal"
          >
            A hedge fund that invests in cryptocurrencies. Like regular hedge funds,
             crypto hedge funds not only buy and sell cryptos, but they also invest in crypto derivatives and futures,
              as well as venture capital and private equity for blockchain startups. 
          </TypographyH2>
          <Button
            component={Link}
            href="/dashboards/crypto"
            size="large"
            variant="contained"
          >
            Start Earning
          </Button>
          {/* <Button
            sx={{ ml: 2 }}
            component="a"
            target="_blank"
            rel="noopener"
            href=""
            size="large"
            variant="text"
          >
            Key Features
          </Button> */}
          <Grid container spacing={3} mt={5}>
            <Grid item md={4}>
              {/* <MuiAvatar> */}
                <img
                  src="/static/images/logo/money.png"
                  alt="Material-UI"
                />
              {/* </MuiAvatar> */}
              <Typography variant="h4">
                <Box sx={{ pb: 2 }}>
                  <b>Profitable</b>
                </Box>
                <Typography component="span" variant="subtitle2">
                  xxxxxxxxxxxx  xxxxxxxxxxxx  xxxxxxxxxxxx  xxxxxxxxxxxx
                </Typography>
              </Typography>
            </Grid>
            <Grid item md={4}>
              {/* <NextJsAvatar> */}
                <img src="/static/images/logo/detective.png" alt="NextJS" />
              {/* </NextJsAvatar> */}
              <Typography variant="h4">
                <Box sx={{ pb: 2 }}>
                  <b>Transparent</b>
                </Box>
                <Typography component="span" variant="subtitle2">
                xxxxxxxxxxxx  xxxxxxxxxxxx  xxxxxxxxxxxx  xxxxxxxxxxxx
                </Typography>
              </Typography>
            </Grid>
            <Grid item md={4}>
              {/* <TsAvatar> */}
                <img
                  src="/static/images/logo/shield.png"
                  alt="Typescript"
                />
              {/* </TsAvatar> */}
              <Typography variant="h4">
                <Box sx={{ pb: 2 }}>
                  <b>Secure</b>
                </Box>
                <Typography component="span" variant="subtitle2">
                xxxxxxxxxxxx  xxxxxxxxxxxx  xxxxxxxxxxxx  xxxxxxxxxxxx
                </Typography>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Hero;
