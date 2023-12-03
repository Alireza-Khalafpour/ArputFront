'use client'


import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Avatar, ListDivider, ListItemDecorator, Option, Select, Sheet } from '@mui/joy';
import { CheckRounded, CloudUpload, Delete, Edit, Numbers, ProductionQuantityLimits, ScaleRounded, StackedBarChart, StraightenRounded } from '@mui/icons-material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Autocomplete, Checkbox, FormControl, FormControlLabel, Grid, Input, InputAdornment, InputLabel, Slider, TextField } from '@mui/material';




// select part for first step ----------------
const options = [
    { value: '1', label: 'سرامیک' },
    { value: '2', label: 'کاشی' },
    { value: '3', label: 'تایل' },
  ];
  
  function renderValue(option) {
    if (!option) {
      return null;
    }
  
    return (
      <>
        <ListItemDecorator>
          <Edit/>
        </ListItemDecorator>
        {option.label}
      </>
    );
  }



const AddPreProductPage = () => {

    // API PART *******************************************************************************************

    // Get Category API ---------------------
    useEffect(() => {
        axios.get('https://supperapp-backend.chbk.run/category/list',{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJiJ2dBQUFBQUJsWUZ1aFZ3OXU3VHBITmpjdlVmVHdnMXR0XzBGdXNDX2t6RjRid1ViaWZoRC0wS3NUUTFNN3UzZUhDT3Ixa2F3V1ZnSTZQS1U1djM5dXpuRkZObXFUc0xPcDlpbVdKQkpfakJicTBnejZfaDJteko5Um1aMXYxZ3k0TWVIeElmU3R6bV9PJyJ9.Mv6mAsHHvrPgAWie0K96vsBGicTk0KFNHGgMFflxDR0'
              }
        })
        .then((response) => {
            console.log(response , "Categories");
        })
        .catch(function (error) {
            console.log(error, "error categories");
        })

    },[])


    //STATES AND FUNCTIONS PART ****************************************************************************

    //Category select step--------------------------
    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
  
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
  
    const handleReset = () => {
      setActiveStep(0);
    };

    // Pre-product Input information ----------------
    const [value, setValue] = useState(0);

    const handleSliderChange = (event, newValue) => {
      setValue(newValue);
    };
  
    const handleInputChange = (event) => {
      setValue(event.target.value === '' ? 0 : Number(event.target.value));
    };
  
    const handleBlur = () => {
      if (value < 0) {
        setValue(0);
      }
    };

    // Add image and Name for pre-product-------------
    const [image, setImage] = useState([])
    const[fileName, setFileName] = useState("فایلی انتخاب نشده...")
  
    const DeleteImg = () => {
      setFileName("فایلی انتخاب نشده...")
      setImage([])
    }

    // Draf and Drop image ---------------------------

    function DragHandler(e){
        e.preventDefault();
    }

    function DropHandler(e){
        e.preventDefault();
        setImage(e.dataTransfer.files)
    }
  
    return (
        <div className='w-full flex flex-col justify-center items-center gap-4' >

            <h2 className='p-3 text-xl' > | با انجام گام های زیر کالای خود را ثبت کنید |</h2>

            <div className='w-[70%] p-1 border-dashed border-4 rounded-2xl  '>
                <Stepper className='flex' activeStep={activeStep} orientation="vertical">
                    <Step className='border-b-4 py-3'>
                        <StepLabel >
                            <div className='text-xl font-bold text-right ' >
                                گام اول: انتخاب گروه کالا و نام کالا 
                            </div>
                        </StepLabel>
                        <StepContent>
                            <div className='w-full flex flex-row gap-2 justify-around items-center my-8'>
                                <Select
                                    defaultValue="1"
                                    slotProps={{
                                        listbox: {
                                        sx: {
                                            '--ListItemDecorator-size': '44px',
                                        },
                                        },
                                    }}
                                    sx={{
                                        '--ListItemDecorator-size': '44px',
                                        minWidth: '160px',
                                    }}
                                    renderValue={renderValue}
                                    >
                                    {options.map((option, index) => (
                                        <div key={option.value}>
                                        {index !== 0 ? <ListDivider role="none" inset="startContent" /> : null}
                                        <Option value={option.value} label={option.label}>
                                            <ListItemDecorator>
                                                <StackedBarChart/>
                                            </ListItemDecorator>
                                            {option.label}
                                        </Option>
                                        </div>
                                    ))}
                                </Select>

                                <FormControl>
                                    <InputLabel htmlFor="input-with-icon-adornment">
                                        نام کالا   
                                    </InputLabel>
                                    <Input
                                        className='p-1'
                                        id="input-with-icon-adornment"
                                        startAdornment={
                                            <InputAdornment className='mx-2' position="start">
                                                <ProductionQuantityLimits />
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>

                            </div>
                            <div>
                                <div className=' w-full text-left '>
                                    <button
                                        className='w-36 p-2 rounded-2xl bg-asliLight hover:bg-sky-600 text-white'
                                        onClick={handleNext}
                                    >
                                     انتخاب گروه کالا
                                    </button>
                                </div>
                            </div>
                        </StepContent>
                    </Step>
                    <Step className='border-b-4 py-3' >
                        <StepLabel>
                            <div className='text-xl font-bold text-right' >
                            گام دوم: درج اطلاعات کالا 
                            </div>
                        </StepLabel>
                        <StepContent className='flex flex-col gap-12 p-3 m-5' >
                            <div className='w-[70%] my-7 ' > 
                                {/* <Typography className='text-lg font-bold text-asliLight' id="input-slider" gutterBottom>
                                    عرض
                                </Typography> */}
                                <Grid container spacing={2} alignItems="center">
                                    <Grid className='text-lg font-bold text-asliLight' item>
                                        عرض (Cm) <StraightenRounded/>
                                    </Grid>
                                    <Grid item xs>
                                    <Slider
                                        value={typeof value === 'number' ? value : 0}
                                        onChange={handleSliderChange}
                                        aria-labelledby="input-slider"
                                        max={500}
                                        min={0}
                                    />
                                    </Grid>
                                    <Grid item>
                                    <Input
                                        value={value}
                                        size="small"
                                        onChange={handleInputChange}
                                        onBlur={handleBlur}
                                        inputProps={{
                                        step: 1,
                                        min: 0,
                                        max: 500,
                                        type: 'number',
                                        'aria-labelledby': 'input-slider',
                                        }}
                                    />
                                    </Grid>
                                </Grid>


                            </div>

                            <div className='w-[70%] my-7' > 
                                {/* <Typography className='text-lg font-bold text-asliLight' id="input-slider" gutterBottom>
                                    عرض
                                </Typography> */}
                                <Grid container spacing={2} alignItems="center">
                                    <Grid className='text-lg font-bold text-asliLight' item>
                                        طول(Cm) <StraightenRounded/>
                                    </Grid>
                                    <Grid item xs>
                                    <Slider
                                        value={typeof value === 'number' ? value : 0}
                                        onChange={handleSliderChange}
                                        aria-labelledby="input-slider"
                                        max={500}
                                        min={0}
                                    />
                                    </Grid>
                                    <Grid item>
                                    <Input
                                        value={value}
                                        size="small"
                                        onChange={handleInputChange}
                                        onBlur={handleBlur}
                                        inputProps={{
                                        step: 1,
                                        min: 0,
                                        max: 500,
                                        type: 'number',
                                        'aria-labelledby': 'input-slider',
                                        }}
                                    />
                                    </Grid>
                                </Grid>

                            </div>

                            <div className='w-[70%] my-7' > 
                                {/* <Typography className='text-lg font-bold text-asliLight' id="input-slider" gutterBottom>
                                    عرض
                                </Typography> */}
                                <Grid container spacing={2} alignItems="center">
                                    <Grid className='text-lg font-bold text-asliLight' item>
                                        وزن(kg) <ScaleRounded/> 
                                    </Grid>
                                    <Grid item xs>
                                    <Slider
                                        value={typeof value === 'number' ? value : 0}
                                        onChange={handleSliderChange}
                                        aria-labelledby="input-slider"
                                        max={50}
                                        min={0}
                                    />
                                    </Grid>
                                    <Grid item>
                                    <Input
                                        prefix='Kg'
                                        value={value}
                                        size="small"
                                        onChange={handleInputChange}
                                        onBlur={handleBlur}
                                        inputProps={{
                                        step: 1,
                                        min: 0,
                                        max: 50,
                                        type: 'number',
                                        'aria-labelledby': 'input-slider',
                                        }}
                                    />
                                    </Grid>
                                </Grid>

                            </div>

                            <div>
                                <div className='flex flex-row gap-3 w-full justify-end'>
                                    <button
                                        className='w-24 p-2 rounded-2xl bg-asliLight hover:bg-sky-600 text-white'
                                        onClick={handleNext}
                                    >
                                    ادامه
                                    </button>
                                    <button
                                    className='p-2 rounded-2xl  hover:bg-red-400 hover:text-white '
                                    disabled={activeStep === 0}
                                    onClick={handleBack}
                                    >
                                    بازگشت
                                    </button>
                                </div>
                            </div>
                        </StepContent>
                    </Step>
                    <Step className='border-b-4 py-3' >
                        <StepLabel>
                            <div className='text-xl font-bold text-right' >
                            گام سوم: درج ویژگی ها  
                            </div>
                        </StepLabel>
                        <StepContent className='flex flex-col gap-12 p-3 m-5' >

                            <div className='flex flex-col justify-around items-center gap-6 w-full my-5' >

                                <div className=" flex flex-row justify-between mx-5 items-center p-3 w-[80%] gap-4 bg-paszamine1 rounded-lg border-asliLight border" >

                                <FormControlLabel control={<Checkbox />} label=" نام برند " />


                                    <Autocomplete
                                        className='w-1/2 bg-white'
                                        multiple
                                        size='small'
                                        noOptionsText=" موردی یافت نشد "
                                        limitTags={2}
                                        options={[{title:"کاشان"}]}
                                        getOptionLabel={(option) => option.title}
                                        defaultValue={[]}
                                        renderInput={(params) => (
                                            <TextField {...params} label=" انتخاب سمپل " placeholder="انتخاب کنید" />
                                        )}
                                    />
                                </div>
                                <div className=" flex flex-row justify-between mx-5 items-center p-3 w-[80%] gap-4 bg-paszamine1 rounded-lg border-asliLight border" >

                                    <FormControlLabel control={<Checkbox />} label=" نوع لعاب " />


                                        <Autocomplete
                                            className='w-1/2 bg-white'
                                            multiple
                                            size='small'
                                            noOptionsText=" موردی یافت نشد "
                                            limitTags={2}
                                            options={[{title:"ساده"},{title:"طرح دار"}]}
                                            getOptionLabel={(option) => option.title}
                                            defaultValue={[]}
                                            renderInput={(params) => (
                                                <TextField {...params} label=" انتخاب سمپل " placeholder="انتخاب کنید" />
                                            )}
                                        />
                                </div>

                            </div>

                            <div>
                                <div className='flex flex-row gap-3 w-full justify-end'>
                                    <button
                                        className='w-24 p-2 rounded-2xl bg-asliLight hover:bg-sky-600 text-white'
                                        onClick={handleNext}
                                    >
                                    ادامه
                                    </button>
                                    <button
                                    className='p-2 rounded-2xl  hover:bg-red-400 hover:text-white '
                                    disabled={activeStep === 0}
                                    onClick={handleBack}
                                    >
                                    بازگشت
                                    </button>
                                </div>
                            </div>
                        </StepContent>
                    </Step>
                    <Step className='border-b-4 py-3' >
                        <StepLabel>
                            <div className='text-xl font-bold text-right' >
                                گام چهارم: ثبت تکسچر        
                            </div>
                        </StepLabel>
                        <StepContent className='flex flex-col gap-12 p-3 m-5' >

                            <div className='flex flex-row justify-around items-center gap-6 w-full my-5' >
                                
                            <div>
                                <form 
                                    onClick={() => document.getElementById("fileInput").click()}
                                    onDragOver={(e) => DragHandler(e)}
                                    onDrop={(e) => DropHandler(e)} 
                                    className='flex flex-col justify-center items-center border-2 cursor-pointer border-dashed border-asliLight w-64 h-44 rounded-3xl hover:animate-pulse' 
                                >
                                <input 
                                    type='file' 
                                    id='fileInput' 
                                    multiple 
                                    hidden 
                                    accept='image/*'
                                    onChange={({target: {files}}) =>{
                                    files[0] && setFileName(files[0].name)
                                    if(files){
                                        setImage(URL.createObjectURL(files[0]))
                                    } 
                                    }           
                                    }
                                />
                                {image.length!==0 ?
                                    <img className='w-full h-full p-1 rounded-3xl' src={image} alt="تکسچر محصول"  />
                                    :
                                    <div className='text-center'>
                                    <CloudUpload className='text-3xl text-asliLight'/>
                                    <p> آپلود تکسچر </p>
                                    </div>
                                }
                                </form>
                                <div className='w-52 flex flex-row justify-between items-center mt-1 p-1 text-sm' >
                                    <Delete  titleAccess='حذف عکس' className='text-khas hover:text-orange-600 cursor-pointer' onClick={() => DeleteImg()}/>
                                    <p>{fileName}</p>
                                </div>
                            </div>

                            </div>

                            <div>
                                <div className='flex flex-row gap-3 w-full justify-end'>
                                    <button
                                        className='w-32 p-2 rounded-2xl bg-khas hover:bg-orange-500 text-white hover:font-semibold transition-all duration-100'
                                        // onClick={handleNext}
                                    >
                                      <CheckRounded/> ثبت کالا 
                                    </button>
                                    <button
                                    className='p-2 rounded-2xl  hover:bg-red-400 hover:text-white '
                                    disabled={activeStep === 0}
                                    onClick={handleBack}
                                    >
                                    بازگشت
                                    </button>
                                </div>
                            </div>
                        </StepContent>
                    </Step>
                </Stepper>
                {/* {activeStep === steps.length && (
                <Paper square elevation={0} sx={{ p: 3 }}>
                    <Typography>All steps completed - you&apos;re finished</Typography>
                    <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                    Reset
                    </Button>
                </Paper>
                )} */}
            </div>

        </div>

    );
}

export default AddPreProductPage;