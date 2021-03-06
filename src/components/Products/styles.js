import { makeStyles } from '@mui/styles';

const useStyles =  makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(4),
    marginTop: '80px'
  },
  root: {
    flexGrow: 1,
  },
}));

export default useStyles;