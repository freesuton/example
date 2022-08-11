import { useRef, useState, useEffect } from 'react';

import NextLink from 'next/link';

import {
  Avatar,
  Box,
  Button,
  Divider,
  Hidden,
  lighten,
  List,
  ListItem,
  ListItemText,
  Popover,
  Typography
} from '@mui/material';

import InboxTwoToneIcon from '@mui/icons-material/InboxTwoTone';
import { styled } from '@mui/material/styles';
import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone';
import AccountBoxTwoToneIcon from '@mui/icons-material/AccountBoxTwoTone';
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone';
import AccountTreeTwoToneIcon from '@mui/icons-material/AccountTreeTwoTone';
import Web3 from 'web3';
import {ethers} from 'ethers'
import {useGlobalContext} from '../../../../layouts/SidebarLayout/index'

declare var window: any

const UserBoxButton = styled(Button)(
  ({ theme }) => `
        padding-left: ${theme.spacing(1)};
        padding-right: ${theme.spacing(1)};
`
);

const MenuUserBox = styled(Box)(
  ({ theme }) => `
        background: ${theme.colors.alpha.black[5]};
        padding: ${theme.spacing(2)};
`
);

const UserBoxText = styled(Box)(
  ({ theme }) => `
        text-align: left;
        padding-left: ${theme.spacing(1)};
`
);

const UserBoxLabel = styled(Typography)(
  ({ theme }) => `
        font-weight: ${theme.typography.fontWeightBold};
        color: ${theme.palette.secondary.main};
        display: block;
`
);

const UserBoxDescription = styled(Typography)(
  ({ theme }) => `
        color: ${lighten(theme.palette.secondary.main, 0.5)}
`
);

function HeaderUserbox() {
  const ref = useRef<any>(null);
  const [isOpen, setOpen] = useState<boolean>(false);
  const {accounts,setAccounts,connected, setConnected} = useGlobalContext();
  const user = {
    name: accounts,
    avatar: '/static/images/avatars/1.jpg',
    jobtitle: 'Level 1'
  };

  const handleOpen = (): void => {
    if(!connected){
      setOpen(true);
    }
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const getWeb3 = async () => {
    return new Promise(async(resolve,reject) => {
      if (window.ethereum) {
          const web3 = new Web3(window.ethereum);
          console.log('MetaMask is installed!');
          try{
              await window.ethereum.request({method: 'eth_requestAccounts'})
              resolve(web3);
          }catch(error){
          }
      }else if(window.web3){
        resolve(Web3);
      }else{
        reject
      }
    })
  }

  async function metamask(e){
    e.preventDefault();
    setOpen(false);
    const web3:any = await getWeb3();
    const _accounts = await web3.eth.getAccounts();
    setAccounts(_accounts);
    setConnected(true);
    console.log("data");
  }

  return (
    <>
      {connected?
        <UserBoxButton color="secondary" ref={ref} onClick={handleOpen}>
          <Avatar variant="rounded" alt={user.name} src={user.avatar} />
          <Hidden mdDown>
            <UserBoxText>
              <UserBoxLabel variant="body1" style={{width:"150px",overflow: "hidden"}}>{user.name}</UserBoxLabel>
              <UserBoxDescription variant="body2">
                {user.jobtitle}
              </UserBoxDescription>
            </UserBoxText>
          </Hidden>
        </UserBoxButton>
        :
        <UserBoxButton color="secondary" ref={ref} onClick={handleOpen}>
          <Button fullWidth variant="contained">Connect To Wallet</Button>
        </UserBoxButton>
      }
      <Popover
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        <MenuUserBox sx={{ minWidth: 210 }} display="flex" onClick={(e) => metamask(e)}>
          <Avatar variant="rounded" alt="Metamask" src={user.avatar} />
          <UserBoxText>
            <UserBoxLabel variant="body1">Metamask</UserBoxLabel>
          </UserBoxText>
        </MenuUserBox>
        <MenuUserBox sx={{ minWidth: 210 }} display="flex">
          <Avatar variant="rounded" alt="Wallet Connect" src={user.avatar} />
          <UserBoxText>
            <UserBoxLabel variant="body1">Wallet Connect</UserBoxLabel>
          </UserBoxText>
        </MenuUserBox>
      </Popover>
    </>
  );
}

export default HeaderUserbox;
