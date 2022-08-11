import { FC, ReactNode, useState, useEffect, createContext, useContext} from 'react';
import { Box, alpha, lighten, useTheme } from '@mui/material';
import PropTypes from 'prop-types';

import Sidebar from './Sidebar';
import Header from './Header';
import Web3 from 'web3';
import { ethers } from "ethers";

export type GlobalContent = {
  accounts: string
  setAccounts:(c: string) => void
  connected: boolean
  setConnected:(c:boolean) => void
  networkId: number
  setNetworkId :(c:number) => void
}
export const MyGlobalContext = createContext<GlobalContent>({
  accounts: "Not Connected",
  setAccounts: () => {},
  connected: false,
  setConnected: ()=>{},
  networkId: -1,
  setNetworkId: ()=>{},
});
export const useGlobalContext = () => useContext(MyGlobalContext)


declare var window: any

interface SidebarLayoutProps {
  children?: ReactNode;
}


const SidebarLayout: FC<SidebarLayoutProps> = ({ children }) => {
  const theme = useTheme();
  const [accounts, setAccounts] = useState<string>("Not Connected");
  const [connected,setConnected] = useState<boolean>(false);
  const [networkId, setNetworkId] = useState<number>(-1);


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

  useEffect(() => {
    const checkConnection = async () => {
      // Check if browser is running Metamask
      let web3;
      if (window.ethereum) {
          web3 =  await getWeb3();
      } else if (window.web3) {
          web3 = new Web3(window.web3.currentProvider);
      };
      
      // Check if User is already connected by retrieving the accounts
      web3.eth.getAccounts()
          .then(async (addr) => {
              // Set User account into state
              setAccounts(addr);
              setConnected(true);
              setNetworkId(window.ethereum.networkVersion);
              console.log("ASdas");
      });
      //detect account change
      window.ethereum.on('accountsChanged', accounts => {
          console.log("account changes");
          setAccounts(accounts);
          if(!accounts || accounts.length == 0){
              setConnected(false);
          }
      });
      //detect network change
      window.ethereum.on('networkChanged', function(networkId){
          setNetworkId( window.ethereum.networkVersion);
      });
    };
    if(window.ethereum || window.web3 ){
      checkConnection();
  }
    console.log("effect in layout");
  }, []);

  return (
    <>
      <MyGlobalContext.Provider value={{accounts,setAccounts,connected,setConnected,networkId, setNetworkId}}>
        <Box
          sx={{
            flex: 1,
            height: '100%',

            '.MuiPageTitle-wrapper': {
              background:
                theme.palette.mode === 'dark'
                  ? theme.colors.alpha.trueWhite[5]
                  : theme.colors.alpha.white[50],
              marginBottom: `${theme.spacing(4)}`,
              boxShadow:
                theme.palette.mode === 'dark'
                  ? `0 1px 0 ${alpha(
                      lighten(theme.colors.primary.main, 0.7),
                      0.15
                    )}, 0px 2px 4px -3px rgba(0, 0, 0, 0.2), 0px 5px 12px -4px rgba(0, 0, 0, .1)`
                  : `0px 2px 4px -3px ${alpha(
                      theme.colors.alpha.black[100],
                      0.1
                    )}, 0px 5px 12px -4px ${alpha(
                      theme.colors.alpha.black[100],
                      0.05
                    )}`
            }
          }}
        >
          <Header />
          <Sidebar />
          <Box
            sx={{
              position: 'relative',
              zIndex: 5,
              display: 'block',
              flex: 1,
              pt: `${theme.header.height}`,
              [theme.breakpoints.up('lg')]: {
                ml: `${theme.sidebar.width}`
              }
            }}
          >
            <Box display="block">
              {children}
            </Box>
          </Box>
        </Box>
      </MyGlobalContext.Provider>
    </>
  );
};

SidebarLayout.propTypes = {
  children: PropTypes.node
};

export default SidebarLayout;
