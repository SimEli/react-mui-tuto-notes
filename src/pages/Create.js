import React, { useState } from 'react'
import { Typography, Button, Container, TextField, Radio, RadioGroup, FormControlLabel, FormLabel, FormControl } from "@mui/material";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { makeStyles } from "@mui/styles";
import { useHistory } from 'react-router';

const useStyles = makeStyles({
    // btn: {
    //   fontSize: 20,
    //   marginTop: 20,
    //   backgroundColor: 'violet',
    //   '&:hover': {
    //     backgroundColor: 'orange',
    //     color: 'grey',
    //     fontSize: 22
    //   }
    // },
    // title: {
    //   textDecoration: 'underline'
    // },
    field: {
      margin: "dense",
      // marginTop: 20,
      // marginBottom: 20,
      display: 'block'
    },
    formLabel: {
      '&.Mui-focused': {
        color: '#d500f9'
      }
    }
  });

export default function Create() {
  const classes = useStyles();
  const history = useHistory();
  const [title,setTitle] = useState('');
  const [details,setDetails] = useState('');
  const [titleError,setTitleError] = useState(false);
  const [detailsError,setDetailsError] = useState(false);
  const [category, setCategory] = useState('todos');

  const handleSubmit = (e) => {
    e.preventDefault();
    setTitleError(false);
    setDetailsError(false);

    if (title === '') {
      setTitleError(true);
    }
    if (details === '') {
      setDetailsError(true);
    }
    if (title && details) {
      fetch('http://localhost:8000/notes', {
        method: 'POST',
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({ title, details, category })
      }).then(() => history.push('/'))
    }
  }

  return (
    <Container>
      <Typography 
        // className={classes.title}
        color="textSecondary"
        // noWrap
        gutterBottom
        variant="h6"
        component="h2"
        // sx={{ m: 5 }}
      >
        Create a new note
      </Typography>

      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField className={classes.field}
          onChange={(e) => setTitle(e.target.value)}
          label="Note Title"
          variant="outlined"
          color="secondary"
          fullWidth
          required
          sx={{ mt: 2, mb:2 }}
          error={titleError}
        />
        <TextField className={classes.field}
          onChange={(e) => setDetails(e.target.value)}
          label="Details"
          variant="outlined"
          color="secondary"
          fullWidth
          multiline
          rows={4}
          required
          sx={{ mt: 2, mb:2 }}
          error={detailsError}
        />

        <FormControl className={classes.field} 
          fullWidth
        sx={{ mt: 2, mb:2 }} 
        >
        <FormLabel
          className={classes.formLabel}
        >Note Category</FormLabel>
          <RadioGroup value={category} onChange={(e) => setCategory(e.target.value)}>
            <FormControlLabel value="money" control={<Radio />} label="Money" />
            <FormControlLabel value="todos" control={<Radio />} label="Todos" />
            <FormControlLabel value="reminders" control={<Radio />} label="Reminders" />
            <FormControlLabel value="work" control={<Radio />} label="Work" />
          </RadioGroup>
        </FormControl>

        <Button
          className={classes.field}
          type="submit"
          color="secondary"
          endIcon={<KeyboardArrowRightIcon />}
          variant="contained"
        >Submit
        </Button>
      </form>
    </Container>
  )
}
