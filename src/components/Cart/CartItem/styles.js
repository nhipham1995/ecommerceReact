import {makeStyles} from '@mui/styles';


const useStyles = makeStyles(() => ({
    media: {
      height: 200,
    },
    cardContent: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    cardActions: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    buttons: {
      display: 'flex',
      alignItems: 'center',
    },
    button: {
      minWidth: '30px!important',
      color : 'red'
    }
  }));


export default useStyles;