'use client'


import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import { CircularProgress} from '@mui/joy';
import { CloudUpload, Delete, DeleteForeverRounded, ProductionQuantityLimits, ScaleRounded, StraightenRounded } from '@mui/icons-material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Alert, Autocomplete, Checkbox, FormControl, FormControlLabel, Grid, Input, InputAdornment, InputLabel, Slider, Snackbar, TextField } from '@mui/material';
import Cookies from 'universal-cookie';
import GeneralLoader from '../module/GeneralLoader';





const AddPreProductPage = () => {

    const cookie = new Cookies();

    const [categoryList, setcategoryList] = useState([])
    const [addCateg, setaddCategs] = useState([])
    const [preProductName, setPreProductName] = useState("")
    const [width, setWidth] = useState(0)
    const [height, setHeight] = useState(0)
    const [weight, setWeight] = useState(0)
    const [isPublic, setIsPublic] = useState(true)
    // ----------
    const [CategoryIdsForCheckbox, setCategoryIdsForCheckbox] = useState([])
    const [finalSampleFeatureIds, setFinalSampleFeatureIds] = useState([])
    const [sampleOptions, setSampleOptions] = useState([])
    const [imgUrl, setImgUrl] = useState()

    console.log(addCateg, "categggggggggggggggggggggggg")
    // ----------
    const [message, setMessage] = useState();
    const [alert, setAlert] = useState(false);
    const [errorAlert, setErrorAlert] = useState(false);
    const [loading, setLoading] = useState(false);
    //-------------
    const [branchList, setBranchList] = useState([])
    // ------------
    const [tempFeatureSample,setTempFeatureSample] = useState()
    const [preProductData, setPreProductData] = useState(
        {
            "category_id": "",
            "info": {
                "width": 0,
                "height": 0,
                "weight": 0
            },
            "features": [],
            "image_url": "",
            "name":"",
            "is_public": true,
            "factory_id": "",
            "only_in_Representation": []
        }
    )

        // Add FeatureSample ids --------------------------------------

        const [tempIndex, setTempIndex] = useState()

        function handleSetTempFeature(i,index,val){
            setTempFeatureSample({"feature_id": i.id,"sample_id":val.sample_data.id})
            setTempIndex(index)
        }

        function changeHandler(index) {
            const value = tempFeatureSample
            const List = [...preProductData['features']]
            List[index] = value;
            setPreProductData({...preProductData, ['features'] : List})
            setTempFeatureSample()
        }

        useEffect(() => {
            changeHandler(tempIndex)
        },[tempIndex])
      
          const addHandler = () => {
              setFeaturesData({...FeaturesData, 'others': [...FeaturesData['others'],{}]})
          }
      
          const deleteHandler = (e, index) => {
              const List = [...preProductData['features']]
              List.splice(index, 1, undefined)
              setPreProductData({...preProductData, ['features'] : List})
          }

          // ----------------------------------------------


    useEffect(() => {
        setCategoryIdsForCheckbox(addCateg.features?.map((i) => i.id ))
    },[addCateg])



    // Get Category and Sample API -------------------------------------------

    async function categoryListApi(Au) {
        
        await axios.get('https://supperapp-backend.chbk.run/category/list', {
        headers:{
            'accept': 'application/json',
            'Authorization': `Bearer ${Au}`,
        }
        })
        .then((response) => {
            setcategoryList(response?.data.data)
        })
        .catch((error) => {
            console.log(error, "Error");
        });
    }

    async function sampleListApi(Au) {
        
        await axios.get('https://supperapp-backend.chbk.run/feature_samples/list', {
        headers:{
            'accept': 'application/json',
            'Authorization': `Bearer ${Au}`,
        }
        })
        .then((response) => {
            setSampleOptions(response?.data.data)
            console.log(response?.data.data, "feature sample list api")
        })
        .catch((error) => {
            console.log(error, "Error");
        });
    }

    useEffect(() => {
        const Auth = cookie.get('tokenDastResi')
        categoryListApi(Auth);
        sampleListApi(Auth)
    },[])



    //Steps-------------------------------------------
    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleNextFeatureSample = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        let arr = finalSampleFeatureIds.filter(item => typeof item === "object");
        setFinalSampleFeatureIds(arr)
        setTimeout(() => {
            setPreProductData({...preProductData, ['features'] : preProductData.features.filter((i) => i !== null && i !== undefined )})
        }, 300);
    };

    const handleStep1 = (e) => {
        setPreProductData({...preProductData, 'category_id' : addCateg?.id});
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
  

    // width - height - weight --------------------------------------------

    const handleWidthChange = (event, newValue) => {
      setWidth(newValue);
      setPreProductData({...preProductData, info:{width: newValue, height:preProductData.info.height, weight:preProductData.info.weight} })
    };
  
    const handleInputWidthChange = (event) => {
      setWidth(event.target.value === '' ? 0 : Number(event.target.value));
      setPreProductData({...preProductData, info:{width: Number(event.target.value), height:preProductData.info.height, weight:preProductData.info.weight} })    
    };

    const handleHeightChange = (event, newValue) => {
        setHeight(newValue);
        setPreProductData({...preProductData, info:{ width:preProductData.info.width, height: newValue, weight:preProductData.info.weight} })
      };
    
      const handleInputHeightChange = (event) => {
        setHeight(event.target.value === '' ? 0 : Number(event.target.value));
        setPreProductData({...preProductData, info:{width:preProductData.info.width, height: Number(event.target.value), weight:preProductData.info.weight} }) 
      };

      const handleWeightChange = (event, newValue) => {
        setWeight(newValue);
        setPreProductData({...preProductData, info:{ width: preProductData.info.width, height:preProductData.info.height, weight: newValue} })
      };
    
      const handleInputWeightChange = (event) => {
        setWeight(event.target.value === '' ? 0 : Number(event.target.value));
        setPreProductData({...preProductData, info:{width: preProductData.info.width, height:preProductData.info.height, weight: Number(event.target.value)} }) 
      };

    // ----------------------------------------------------

    // Add image and Name for pre-product-------------
    const [imageL, setImage] = useState()
    const [imageForUpload, setImageForUpload] = useState()
    const[fileName, setFileName] = useState("فایلی انتخاب نشده...")
  
    const DeleteImg = () => {
      setFileName("فایلی انتخاب نشده...")
      setImage()
      setImageForUpload()
      setImgUrl()
      setPreProductData({...preProductData, image_url: ""})
    }

    // Drag and Drop image ---------------------------

    function DragHandler(e){
        e.preventDefault();
    }

    function DropHandler(e){
        e.preventDefault();
        setImage(e.dataTransfer.files[0])
    }



    // Upload Texture---------------------------------------------------------------------------------

    const Auth = cookie.get('tokenDastResi')

    const headers ={
        'accept': 'application/json',
        'Authorization': `Bearer ${Auth}`,
        'Content-Type': ' multipart/form-data',
        }

    const formData = new FormData();

    async function handleImageUpload() {        

        formData.append("file", imageForUpload);

        setLoading(true);
        await axios.post('https://supperapp-backend.chbk.run/upload/upload_texture', formData,
        {
          headers: headers
        })
        .then((response) => {
            setPreProductData({...preProductData, "image_url": response?.data.address})
            setLoading(false)
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        })
        .catch((error) => {
          console.log(error, "Error");
          setLoading(false)
        });

        
    };

    // handle add pre-product ------------------------------------------------------------------------

    const mainHeaders ={
        'accept': 'application/json',
        'Authorization': `Bearer ${Auth}`,
        'Content-Type': 'application/json',
        }


    async function handleAddPreProduct() {

        setLoading(true);
        await axios.post('https://supperapp-backend.chbk.run/pre_product/create',preProductData,
        {
          headers: mainHeaders
        })
        .then((response) => {
            if(response.status === 200 && response.data.Done === true) {
                setAlert(true)
                setMessage(" پیش محصول جدید با موفقیت افزوده شد ")
                setLoading(false)
                // setPreProductData(
                //     {
                //         "category_id": "",
                //         "info": {
                //             "width": 0,
                //             "height": 0,
                //             "weight": 0
                //         },
                //         "features": [],
                //         "image_url": "",
                //         "name":"",
                //         "is_public": true,
                //         "factory_id": "",
                //         "only_in_Representation": []
                //     }
                // )
                setTimeout(() => {
                    window.location.reload()
                }, 1500);
            }else{
                setMessage(" متاسفیم،خطایی رخ داده است ")
                setErrorAlert(true)
                // setPreProductData(
                //     {
                //         "category_id": "",
                //         "info": {
                //             "width": 0,
                //             "height": 0,
                //             "weight": 0
                //         },
                //         "features": [],
                //         "image_url": "",
                //         "name":"",
                //         "is_public": true,
                //         "factory_id": "",
                //         "only_in_Representation": []
                //     }
                // )
                setTimeout(() => {
                    window.location.reload()
                }, 1500);
            }
        })
        .catch((error) => {
          console.log(error, "Error");
          setMessage(" متاسفیم،خطایی رخ داده است ")
          setErrorAlert(true)
          setLoading(false)
        });

    };

    // Get current user ----------------------------------------------

    const currentUserHeaders ={
        'accept': 'application/json',
        'Authorization': `Bearer ${Auth}`,
        }
  
      async function GetCurrentUser() {
        
        await axios.get('https://supperapp-backend.chbk.run/register/current_user', {
          headers:currentUserHeaders
          })
          .then((response) => {
              setPreProductData({...preProductData, "factory_id": response?.data.data[0].id})
          })
          .catch((error) => {
              console.log(error, "Error");
          });
        }

        // Get Branches List ---------------------------------------

        async function GetBranches() {
        
            await axios.get('https://supperapp-backend.chbk.run/branch/factory_branch', {
              headers:currentUserHeaders
              })
              .then((response) => {
                  setBranchList(response.data.data[0].branch_data)
              })
              .catch((error) => {
                  console.log(error, "Error");
              });
        }



  
        useEffect(() => {
            GetCurrentUser()
            GetBranches()
        },[])


        //  handle only in representation----------------------------

        const handleAddBranchIds = (val) => {
            setPreProductData({...preProductData, "only_in_Representation" : val.map((i) => i.branch_id)})
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
                            <Autocomplete
                                className="md:w-[28%] w-[90%]"
                                noOptionsText=" داده ای موجود نیست "
                                options={categoryList}
                                getOptionLabel={(i)=> i.name}
                                value={addCateg}
                                onChange={(event, val) =>{
                                setaddCategs(val);
                                }}
                                // sx={{ width:"190px"}}
                                renderInput={(params) => <TextField {...params} variant="standard" label=" افزودن دسته بندی " />}
                            />

                                <FormControl>
                                    <InputLabel htmlFor="input-with-icon-adornment">
                                        نام کالا   
                                    </InputLabel>
                                    <Input
                                        className='p-1'
                                        id="input-with-icon-adornment"
                                        required
                                        value={preProductData.name}
                                        onChange={(e) => setPreProductData({...preProductData, "name" : e.target.value})}
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
                                        onClick={() => handleStep1()}
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
                                        value={typeof width === 'number' ? width : 0}
                                        onChange={handleWidthChange}
                                        aria-labelledby="input-slider"
                                        max={500}
                                        min={0}
                                    />
                                    </Grid>
                                    <Grid item>
                                    <Input
                                        value={width}
                                        size="medium"
                                        onChange={handleInputWidthChange}
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

                                <Grid container spacing={2} alignItems="center">
                                    <Grid className='text-lg font-bold text-asliLight' item>
                                        طول(Cm) <StraightenRounded/>
                                    </Grid>
                                    <Grid item xs>
                                    <Slider
                                        value={typeof height === 'number' ? height : 0}
                                        onChange={handleHeightChange}
                                        aria-labelledby="input-slider"
                                        max={500}
                                        min={0}
                                    />
                                    </Grid>
                                    <Grid item>
                                    <Input
                                        value={height}
                                        size="small"
                                        onChange={handleInputHeightChange}
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
                                <Grid container spacing={2} alignItems="center">
                                    <Grid className='text-lg font-bold text-asliLight' item>
                                        وزن(kg) <ScaleRounded/> 
                                    </Grid>
                                    <Grid item xs>
                                    <Slider
                                        value={typeof weight === 'number' ? weight : 0}
                                        onChange={handleWeightChange}
                                        aria-labelledby="input-slider"
                                        max={50}
                                        min={0}
                                    />
                                    </Grid>
                                    <Grid item>
                                    <Input
                                        prefix='Kg'
                                        value={weight}
                                        size="small"
                                        onChange={handleInputWeightChange}
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

                                    <p> ویژگی های انتخابی شما،موارد نشان شده به رنگ سبز هستند. </p>

                                    {
                                        addCateg?.features?.map((i, index) => (
                                            <div className={` flex flex-row justify-between mx-5 items-center p-3 md:w-[60%] w-full gap-4 ${preProductData?.features[index]?.feature_id === i.id ? "bg-green-200" : "bg-paszamine1"   } rounded-lg border-asliLight border`} >

                                                <span className='w-1/4'> {i.name} </span>

                                                <Autocomplete
                                                    className='w-2/4 bg-white'
                                                    size='small'
                                                    noOptionsText=" موردی یافت نشد "
                                                    options={sampleOptions.filter((s) => s.sample_data.feature_id === i.id)}
                                                    getOptionLabel={(option) =>  option.sample_data.feature_sample_name}
                                                    onChange={(e, val) => handleSetTempFeature(i, index, val)}
                                                    renderInput={(params) => (
                                                        <TextField {...params} label=" انتخاب سمپل " placeholder="انتخاب کنید" />
                                                    )}
                                                />

                                                <div className='flex flex-row gap-4 w-1/4 justify-end items-center' >
                                                    <button className='bg-rose-600 text-white rounded-full hover:bg-rose-700 p-1' onClick={() => deleteHandler(i, index)} > <DeleteForeverRounded/>  </button>
                                                </div>


                                            </div>
                                        ))
                                    }

                                

                            </div>

                            <div>
                                <div className='flex flex-row gap-3 w-full justify-end'>
                                    <button
                                        className='w-24 p-2 rounded-2xl bg-asliLight hover:bg-sky-600 text-white'
                                        onClick={handleNextFeatureSample}
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
                                    onChange={ ({target:{files}}) =>{
                                        files &&
                                        setImage(URL.createObjectURL(files[0]))
                                        setImageForUpload(files[0])
                                        setFileName(files[0].name)
                                    }
                                    }
                                />
                                {imageL ?
                                    <img className='w-full h-full p-1 rounded-3xl' src={imageL} alt="تکسچر محصول"  />
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
                                        className='w-24 p-2 rounded-2xl bg-asliLight hover:bg-sky-600 text-white'
                                        onClick={handleImageUpload}
                                    >
                                    {loading ? <GeneralLoader/> : "ادامه"}
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
                                گام پنجم: وضعیت دسترسی پیش محصول        
                            </div>
                        </StepLabel>
                        <StepContent className='flex flex-col gap-12 p-3 m-5' >

                            <div className='flex flex-row justify-around items-center gap-6 w-full my-5' >
                                
                                <FormControlLabel checked={preProductData.is_public} onChange={() => setPreProductData({...preProductData, is_public: !preProductData.is_public, only_in_Representation: []}) } control={<Checkbox defaultChecked />} label=" قابل استفاده برای همه " />

                                {
                                    !preProductData.is_public &&
                                    <Autocomplete
                                    className="md:w-[28%] w-[90%]"
                                    noOptionsText=" داده ای موحود نیست "
                                    multiple
                                    limitTags={1}
                                    options={branchList}
                                    getOptionLabel={(i)=> i.branch_name}
                                    // value={preProductData.only_in_Representation}
                                    onChange={(event, val) => handleAddBranchIds(val) }
                                    // sx={{ width:"190px"}}
                                    renderInput={(params) => <TextField {...params} variant="standard" label=" نمایندگی های مجاز " />}
                                />
                                }



                            </div>

                            <div>
                                <div className='flex flex-row gap-3 w-full justify-end'>
                                    <button
                                        className='w-32 p-2 rounded-2xl bg-khas hover:bg-orange-500 text-white hover:font-semibold transition-all duration-100'
                                        onClick={handleAddPreProduct}
                                    >
                                        {loading ? <CircularProgress size="medium" /> : " ثبت پیش محصول" }
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
                <Snackbar
                    open={alert}
                    autoHideDuration={4000}
                    onClose={() => setAlert(false)}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    >
                    <Alert variant='filled' severity='success' className='text-lg text-white font-semibold' > {message} </Alert>
                    </Snackbar>

                    <Snackbar
                    open={errorAlert}
                    autoHideDuration={4000}
                    onClose={() => setErrorAlert(false)}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    >
                    <Alert variant='filled' severity='error' className='text-lg text-white font-semibold' > {message} </Alert>
                </Snackbar>
            </div>

        </div>

    );
}

export default AddPreProductPage;




