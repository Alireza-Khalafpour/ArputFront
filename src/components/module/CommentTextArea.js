'use client'

import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Textarea from '@mui/joy/Textarea';
import IconButton from '@mui/joy/IconButton';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import FormatBold from '@mui/icons-material/FormatBold';
import FormatItalic from '@mui/icons-material/FormatItalic';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import Check from '@mui/icons-material/Check';
import Cookies from 'universal-cookie';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { Alert, Snackbar } from '@mui/joy';
import { SentimentDissatisfiedOutlined, SentimentSatisfiedAltOutlined, SentimentSatisfiedOutlined, SentimentVeryDissatisfiedOutlined, SentimentVerySatisfiedOutlined } from '@mui/icons-material';
import { Rating } from '@mui/material';





const StyledRating = styled(Rating)(({ theme }) => ({
  '& .MuiRating-iconEmpty .MuiSvgIcon-root': {
    color: theme.palette.action.disabled,
  },
}));

const customIcons = {
  1: {
    icon: <SentimentVeryDissatisfiedOutlined color="error" fontSize='large' />,
    label: ' بسیار بد ',
  },
  2: {
    icon: <SentimentDissatisfiedOutlined color="error" fontSize='large' />,
    label: 'بد',
  },
  3: {
    icon: <SentimentSatisfiedOutlined color="warning" fontSize='large' />,
    label: 'متوسط',
  },
  4: {
    icon: <SentimentSatisfiedAltOutlined color="success" fontSize='large' />,
    label: 'خوب',
  },
  5: {
    icon: <SentimentVerySatisfiedOutlined color="success" fontSize='large' />,
    label: ' عالی ',
  },
};




function IconContainer(props) {

  const { value, ...other } = props;
  // setTitle(customIcons[value].label)
  return <span {...other}>{customIcons[value].icon}</span>;
}

IconContainer.propTypes = {
  value: PropTypes.number.isRequired,
};


export default function CommentTextArea({single_product}) {

  const url = process.env.NEXT_PUBLIC_URL

  const [italic, setItalic] = React.useState(false);
  const [fontWeight, setFontWeight] = React.useState('normal');
  const [anchorEl, setAnchorEl] = React.useState(null);


  // --------------------------
  const [content, setContent] = React.useState("");
  const [title, setTitle] = React.useState("");
  
  const cookie = new Cookies();
  
  const Auth = cookie.get('tokenDastResi')
  
  const [message, setMessage] = React.useState();
  const [alert, setAlert] = React.useState(false);
  const [errorAlert, setErrorAlert] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  



  // add comment function -------------------------------------------

  const headers ={
    'accept': 'application/json',
    'Authorization': `Bearer ${Auth}`,
    'Content-Type': 'application/json',
    }

  function AddComment(single_product) {
    setLoading(true);
    if (content !== "" && content !== null && title !== "") {
      axios.post(`${url}/comment/create`, {
        "content": content,
        "title": title,
        "pre_product_id": `${single_product}`
      }, 
      {
      headers: headers
      })
      .then((response) => {
  
        if(response.data.Done == true) {
          setMessage(response.data.Message)
          setAlert(true)
          setLoading(false)
  
        }
        setContent("")
        setTitle("")
      })
      .catch(function (error) {
          console.log(error, "Error");
          setMessage(" متاسفیم،خطایی رخ داده است یا وارد حساب خود شوید ")
          setErrorAlert(true)
          setLoading(false)
      });
    }else {
      setMessage(" ابتدا نظر خود را بنویسید و میزان رضایت را مشخص کنید ")
      setErrorAlert(true)
      setLoading(false)
    }

  }



  return (

    <>

      <FormControl>
        <Textarea
          className="w-full"
          placeholder=" نظر خود را در اینجا ثبت کنید... "
          minRows={3}
          maxRows={3}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          endDecorator={
            <div
              className='w-full flex flex-row justify-end items-center'
            >

              
              <div style={{direction:"ltr"}} className='flex flex-row-reverse mx-10 justify-center items-center gap-2' > 

                <p> میزان رضایت : </p>

                <StyledRating
                  name="highlight-selected-only"
                  style={{direction:"ltr"}}
                  defaultValue={4}
                  onChange={(e, val) => setTitle(customIcons[val].label) }
                  IconContainerComponent={IconContainer}
                  getLabelText={(value) => customIcons[value].label}
                  highlightSelectedOnly
                />
              </div>

              <Button onClick={() => AddComment(single_product)} className='bg-khas hover:bg-orange-600 p-2 text-white w-28 ' >  ثبت دیدگاه </Button>
            </div>
          }
          sx={{
            minWidth: 300,
            fontWeight,
            fontStyle: italic ? 'italic' : 'initial',
          }}
        />
      </FormControl>
      
      <Snackbar
          open={alert}
          autoHideDuration={4000}
          onClose={() => setAlert(false)}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          className="bg-green-700 text-white"
          se
          >
          <Alert variant='filled' className='text-lg text-white font-semibold bg-green-700 mx-auto ' > {message} </Alert>
      </Snackbar>

      <Snackbar
        open={errorAlert}
        autoHideDuration={4000}
        onClose={() => setErrorAlert(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        className="bg-rose-700"
        se
        >
        <Alert variant='filled' className='text-lg text-white font-semibold bg-rose-700 mx-auto' > {message} </Alert>
      </Snackbar>
    
    
    </>

  );
}