import {
  Button,
  Card,
  Box,
  Grid,
  Typography,
  useTheme,
  styled,
  Avatar,
  // Divider,
  alpha,
  // ListItem,
  // ListItemText,
  // List,
  ListItemAvatar
} from '@mui/material';
import TextField from '@mui/material/TextField';
import TrendingUp from '@mui/icons-material/TrendingUp';
// import Text from 'src/components/Text';
// import { Chart } from 'src/components/Chart';
import type { ApexOptions } from 'apexcharts';
import { useState, useEffect } from 'react';
import  Web3 from 'web3';
import { ethers } from "ethers";
import {useGlobalContext} from '../../../layouts/SidebarLayout/index';
import DydxDeposit from '../../../../contracts/dydxDeposit.json';


declare var window: any


const AvatarSuccess = styled(Avatar)(
  ({ theme }) => `
      background-color: ${theme.colors.success.main};
      color: ${theme.palette.success.contrastText};
      width: ${theme.spacing(8)};
      height: ${theme.spacing(8)};
      box-shadow: ${theme.colors.shadows.success};
`
);

const ListItemAvatarWrapper = styled(ListItemAvatar)(
  ({ theme }) => `
  min-width: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: ${theme.spacing(1)};
  padding: ${theme.spacing(0.5)};
  border-radius: 60px;
  background: ${
    theme.palette.mode === 'dark'
      ? theme.colors.alpha.trueWhite[30]
      : alpha(theme.colors.alpha.black[100], 0.07)
  };

  img {
    background: ${theme.colors.alpha.trueWhite[100]};
    padding: ${theme.spacing(0.5)};
    display: block;
    border-radius: inherit;
    height: ${theme.spacing(4.5)};
    width: ${theme.spacing(4.5)};
  }
`
);

function AccountBalance() {
  const {accounts,connected, networkId } = useGlobalContext();
  const theme = useTheme();
  const [depositValue, setDepositValue] = useState<any>();
  const [withdrawValue, setWithdrawValue] = useState<any>();
  const [contract, setContract] = useState<any>();
  const [userBalance, setUserBalance] = useState<number>();
  const dydxDepositAddress = process.env.NEXT_PUBLIC_DYDX_DEPOSIT_MAINNET;
  const starkKey = process.env.NEXT_PUBLIC_STARK_KEY;
  const signature = process.env.NEXT_PUBLIC_SIGNATURE;
  const positionId = process.env.NEXT_PUBLIC_POSITIONID;

  const chartOptions: ApexOptions = {
    chart: {
      background: 'transparent',
      stacked: false,
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      pie: {
        donut: {
          size: '60%'
        }
      }
    },
    colors: ['#ff9900', '#1c81c2', '#333', '#5c6ac0'],
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val + '%';
      },
      style: {
        colors: [theme.colors.alpha.trueWhite[100]]
      },
      background: {
        enabled: true,
        foreColor: theme.colors.alpha.trueWhite[100],
        padding: 8,
        borderRadius: 4,
        borderWidth: 0,
        opacity: 0.3,
        dropShadow: {
          enabled: true,
          top: 1,
          left: 1,
          blur: 1,
          color: theme.colors.alpha.black[70],
          opacity: 0.5
        }
      },
      dropShadow: {
        enabled: true,
        top: 1,
        left: 1,
        blur: 1,
        color: theme.colors.alpha.black[50],
        opacity: 0.5
      }
    },
    fill: {
      opacity: 1
    },
    labels: ['Bitcoin', 'Ripple', 'Cardano', 'Ethereum'],
    legend: {
      labels: {
        colors: theme.colors.alpha.trueWhite[100]
      },
      show: false
    },
    stroke: {
      width: 0
    },
    theme: {
      mode: theme.palette.mode
    }
  };

  const chartSeries = [10, 20, 25, 45];

  useEffect(() => {
    const connectContract = async () => {
      if(connected && window.ethereum){
        const web3 = new Web3(window.ethereum);
        const dydxDepositContract = new web3.eth.Contract((DydxDeposit as any).abi,dydxDepositAddress);
        setContract(dydxDepositContract);
      }
    }
    connectContract();
    getUserBalanceRatio();
    console.log(process.env.NEXT_PUBLIC_USER_BALANCE_RATIO_API);
  }, [connected]);

  async function getUserBalanceRatio(){
    try {
      const res = await fetch(`/api/getTotalEquity?address=${accounts[0]}`);
      const data =await res.json();
      setUserBalance(data.balance);
    } catch (error) {
      alert(error)
    }
  }

  async function sign(e){
    e.preventDefault();
    try {
      console.log( "message" );
      if (!window.ethereum)
        throw new Error("No crypto wallet found. Please install it.");
  
      await window.ethereum.send("eth_requestAccounts");
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const signature = await signer.signMessage("I agree to Carbon Investment Agreement v1");
      const address = await signer.getAddress();
  
      return {
        signature,
        address
      };
    } catch (err) {
    }
  }

  async function deposit(e){
    e.preventDefault();
    if(networkId != 1 || connected == false){
      alert("Please Connect to ETH Mainnet")
    }else{
      try {
        await contract.methods.deposit(depositValue*1000000,starkKey,positionId,'0x')
        .send({from:accounts[0],gasLimit:187160})
        .on('receipt', async function(receipt){
          if(receipt.status === true){
            const res = await fetch(`/api/deposit?value=${depositValue}&address=${accounts[0]}&transactionHash=${receipt.transactionHash}`);
            alert("Status: "+res.status);
          }
        });
        console.log(accounts[0]);
      } catch (error) {
        alert('Failed: '+error);
      }
    }
  }

  async function withdraw(e){
    e.preventDefault();

    if(networkId == 1 && connected == true && withdrawValue > 0){
      try {
        const res = await fetch(`/api/withdraw?value=${withdrawValue}&address=${accounts[0]}`);
        alert("Status: "+res.status);
      } catch (error) {
        alert('Failed: '+error)
      }
    }else if(networkId != 1 || connected == false){
      alert("Please Connect to ETH Mainnet")
    }else if(withdrawValue <= 0){
      alert("Withdrawal value should be greater than 0");
    }
  }

  return (
    <Card>
      <Grid spacing={0} container>
        <Grid item xs={12} md={6}>
          <Box p={4}>
            <Typography
              sx={{
                pb: 3
              }}
              variant="h4"
            >
              Account Balance
            </Typography>
            <Box>
              <Typography variant="h1" gutterBottom>
                $ {userBalance}
              </Typography>
              {/* <Typography
                variant="h4"
                fontWeight="normal"
                color="text.secondary"
              >
                1.0045983485234 BTC
              </Typography> */}
              <Box
                display="flex"
                sx={{
                  py: 4
                }}
                alignItems="center"
              >
                <AvatarSuccess
                  sx={{
                    mr: 2
                  }}
                  variant="rounded"
                >
                  <TrendingUp fontSize="large" />
                </AvatarSuccess>
                <Box>
                  {/* <Typography variant="h4">+ $394.00</Typography>
                  <Typography variant="subtitle2" noWrap>
                    this month
                  </Typography> */}
                </Box>
              </Box>
            </Box>
            <Grid container spacing={3}>
              <Grid sm item>
                  <Button fullWidth variant="contained" onClick={(e) => sign(e)}>
                    Sign The Agreement
                  </Button>
                </Grid>
            </Grid>
            <Grid container spacing={3} style={{marginTop:"1px"}}>

              <Grid sm item>
              <TextField
                    id="filled-number"
                    label="USDC Amount"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="filled"
                    value={depositValue}
                    onChange={(e) => setDepositValue(e.target.value)}
                    style={{paddingBottom: "2px",width:"100%"}}
                    size="small" 
                  />
              </Grid>
              <Grid sm item >
                <Button fullWidth variant="outlined" onClick={(e) => deposit(e)}>
                  Deposit
                </Button>
              </Grid>
            </Grid>
            <Grid  container spacing={3} style={{marginTop:"1px"}}>
            <Grid sm item>
              <TextField
                    id="filled-number"
                    label="USDC Amount"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="filled"
                    value={withdrawValue}
                    onChange={(e) => setWithdrawValue(e.target.value)}
                    style={{paddingBottom: "2px",width:"100%"}}
                    size="small" 
                  />
              </Grid>

                <Grid sm item>
                  <Button fullWidth variant="contained" onClick={(e) => withdraw(e)}>
                    Withdraw
                  </Button>
                </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid
          sx={{
            position: 'relative'
          }}
          display="flex"
          alignItems="center"
          item
          xs={12}
          md={6}
        >
          <Box
            component="span"
            sx={{
              display: { xs: 'none', md: 'inline-block' }
            }}
          >
            {/* <Divider absolute orientation="vertical" /> */}
          </Box>
          {/* <Box py={4} pr={4} flex={1}>
            <Grid container spacing={0}>
              <Grid
                xs={12}
                sm={5}
                item
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Chart
                  height={250}
                  options={chartOptions}
                  series={chartSeries}
                  type="donut"
                />
              </Grid>
              <Grid xs={12} sm={7} item display="flex" alignItems="center">
                <List
                  disablePadding
                  sx={{
                    width: '100%'
                  }}
                >
                  <ListItem disableGutters>
                    <ListItemAvatarWrapper>
                      <img
                        alt="BTC"
                        src="/static/images/placeholders/logo/bitcoin.png"
                      />
                    </ListItemAvatarWrapper>
                    <ListItemText
                      primary="BTC"
                      primaryTypographyProps={{ variant: 'h5', noWrap: true }}
                      secondary="Bitcoin"
                      secondaryTypographyProps={{
                        variant: 'subtitle2',
                        noWrap: true
                      }}
                    />
                    <Box>
                      <Typography align="right" variant="h4" noWrap>
                        20%
                      </Typography>
                      <Text color="success">+2.54%</Text>
                    </Box>
                  </ListItem>
                  <ListItem disableGutters>
                    <ListItemAvatarWrapper>
                      <img
                        alt="XRP"
                        src="/static/images/placeholders/logo/ripple.png"
                      />
                    </ListItemAvatarWrapper>
                    <ListItemText
                      primary="XRP"
                      primaryTypographyProps={{ variant: 'h5', noWrap: true }}
                      secondary="Ripple"
                      secondaryTypographyProps={{
                        variant: 'subtitle2',
                        noWrap: true
                      }}
                    />
                    <Box>
                      <Typography align="right" variant="h4" noWrap>
                        10%
                      </Typography>
                      <Text color="error">-1.22%</Text>
                    </Box>
                  </ListItem>
                  <ListItem disableGutters>
                    <ListItemAvatarWrapper>
                      <img
                        alt="ADA"
                        src="/static/images/placeholders/logo/cardano.png"
                      />
                    </ListItemAvatarWrapper>
                    <ListItemText
                      primary="ADA"
                      primaryTypographyProps={{ variant: 'h5', noWrap: true }}
                      secondary="Cardano"
                      secondaryTypographyProps={{
                        variant: 'subtitle2',
                        noWrap: true
                      }}
                    />
                    <Box>
                      <Typography align="right" variant="h4" noWrap>
                        40%
                      </Typography>
                      <Text color="success">+10.50%</Text>
                    </Box>
                  </ListItem>
                  <ListItem disableGutters>
                    <ListItemAvatarWrapper>
                      <img
                        alt="ETH"
                        src="/static/images/placeholders/logo/ethereum.png"
                      />
                    </ListItemAvatarWrapper>
                    <ListItemText
                      primary="ETH"
                      primaryTypographyProps={{ variant: 'h5', noWrap: true }}
                      secondary="Ethereum"
                      secondaryTypographyProps={{
                        variant: 'subtitle2',
                        noWrap: true
                      }}
                    />
                    <Box>
                      <Typography align="right" variant="h4" noWrap>
                        30%
                      </Typography>
                      <Text color="error">-12.38%</Text>
                    </Box>
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          </Box> */}
        </Grid>
      </Grid>
    </Card>
  );
}

export default AccountBalance;
