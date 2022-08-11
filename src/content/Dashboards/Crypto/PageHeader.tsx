import {useGlobalContext} from '../../../layouts/SidebarLayout/index'
import { Typography, Avatar, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';

function PageHeader() {
  const {accounts,connected,networkId} = useGlobalContext();

  const user = {
    name: '0x1C8A71b5fB9Fc90edED0C7754f39Cd22AE108229',
    avatar: '/static/images/avatars/1.jpg'
  };
  const theme = useTheme();

  return (
    <Grid container alignItems="center">
      <Grid item>
        <Avatar
          sx={{
            mr: 2,
            width: theme.spacing(8),
            height: theme.spacing(8)
          }}
          variant="rounded"
          alt={user.name}
          src={user.avatar}
        />
      </Grid>
      <Grid item style={{width:"100%",overflow:"hidden"}}>
        <Typography variant="h3" component="h3" gutterBottom  >
          Address: {accounts}
        </Typography>
        <Typography variant="subtitle2">
          Today is a good day to start trading crypto assets!
        </Typography>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
