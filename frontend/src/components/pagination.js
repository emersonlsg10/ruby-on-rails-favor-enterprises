import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles(theme => ({
  root: {
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
    marginLeft: 5,
  },
}));

export default function PaginationControlled({
  onChange,
  total = 1,
  perPage = 12,
}) {
  const classes = useStyles();
  const qntPages = Math.ceil(total / perPage);
  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
    onChange(value);
  };

  return (
    <>
      {qntPages > 1 && (
        <div className={classes.root}>
          <Pagination
            size="small"
            color="primary"
            count={qntPages}
            page={page}
            onChange={handleChange}
          />
        </div>
      )}
      {/* <style global jsx>{`
        .MuiPaginationItem-root {
          color: white !important;
        }
      `}</style> */}
    </>
  );
}
