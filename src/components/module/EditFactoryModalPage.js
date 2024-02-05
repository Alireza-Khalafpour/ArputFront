import { Category } from "@mui/icons-material";
import { Autocomplete, Button, Checkbox, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControlLabel, InputAdornment, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";

const EditFactoryModalPage = ({editFactoryModal, setEditFactoryModal, editFactoryInfo}) => {

    const cookie = new Cookies();
    const Auth = cookie.get('tokenDastResi')
    const [loading, setLoading] = useState(false)

    // ---------------------
    
    const [factoryInfo, setFactoryInfo] = useState({
        "factoryIdForEditFactory": "",
        "editFactoryName": "",
        "editFactoryPassword": "",
        "editFactoryCategories": [],
        "editFactoryTelephone": "",
        "editFactoryAddress": [],
        "editFactoryMobile": "",
        "editFactoryActive":true,
        "editFactoryComplete": false,
    });

    
    useEffect(() => {
        setFactoryInfo({
            "factoryIdForEditFactory" : editFactoryInfo?.id,
            "editFactoryName" : editFactoryInfo?.name,
            "editFactoryPassword" : "",
            "editFactoryCategories" : editFactoryInfo?.category,
            "editFactoryTelephone": editFactoryInfo?.telephone,
            "editFactoryMobile" : "",
            "editFactoryActive" : editFactoryInfo?.active,
            "editFactoryComplete" : editFactoryInfo?.complete
        })
    },[editFactoryInfo])

    // update factory Api -------------------------

    const headers ={
        'accept': 'application/json',
        'Authorization': `Bearer ${Auth}`,
        'Content-Type': 'application/json',
        }
      
      
        async function UpdateFactoryApi() {
            setLoading(true);
            await axios.patch('https://supperapp-backend.chbk.run/factory/update', {
                "complete": factoryInfo.editFactoryComplete,
                "id": factoryInfo.factoryIdForEditFactory,
                "name": factoryInfo.editFactoryName,
                "password": factoryInfo.editFactoryPassword,
                "categories": factoryInfo.editFactoryCategories,
                "telephone": factoryInfo.editFactoryTelephone,
                "mobile": factoryInfo.editFactoryMobile,
                "active": factoryInfo.editFactoryActive
            }, 
            {
              headers: headers
            })
            .then((response) => {
                setAlert(true)
              if(response.data.Done === true){
                console.log(response)
                setLoading(false)
              }else {
                console.log(response)
                setLoading(false)

              }
            })
            .catch(function (error) {
                console.log(error)
              setLoading(false)
            });
      
        }




    return (
        <>

            <Dialog fullWidth className="w-full" scroll="paper" maxWidth="sm" open={editFactoryModal} onClose={() => setEditFactoryModal(false)}>

                <DialogTitle className="flex justify-center items-center rounded-xl w-full h-[3rem] bg-asliDark text-paszamine1">
                    ویرایش <span className="text-khas mx-2" > {factoryInfo?.editFactoryName} </span>
                </DialogTitle>
                <Divider />
                <DialogContent className="flex flex-col items-center gap-10 mt-12 " >           

                <div className="flex flex-col justify-center items-center gap-10 w-full h-full" >
                        <div className="w-full flex flex-col gap-2 justify-center items-center mx-auto" >

                        {/* <Autocomplete
                        className="md:w-1/2 w-full  p-3"
                        noOptionsText=" داده ای موجود نیست "
                        options={categoryList}
                        getOptionLabel={(i)=> i.name}
                        value={editFactoryCategories}
                        onChange={(event, val) =>{
                        setEditFactoryCategories(val);
                        }}
                        renderInput={(params) => <TextField {...params} variant="standard" label=" دسته بندی " />}
                    /> */}

                        <TextField
                            className="md:w-1/2 w-full p-3"
                            id="input-with-icon-textfield"
                            placeholder=" نام  "
                            value={factoryInfo?.editFactoryName}
                            onChange={(e) => setFactoryInfo({...factoryInfo, "editFactoryName" : e.target.value})}
                            InputProps={{
                            startAdornment: (
                                <InputAdornment position="end">
                                <Category className='text-asliLight' />
                                </InputAdornment>
                            ),
                            }}
                            variant="standard"
                        />

                        <TextField
                            className="md:w-1/2 w-full p-3"
                            id="input-with-icon-textfield"
                            placeholder=" رمزعبور  "
                            value={factoryInfo?.editFactoryPassword}
                            onChange={(e) => setFactoryInfo({...factoryInfo, "editFactoryPassword" : e.target.value})}
                            InputProps={{
                            startAdornment: (
                                <InputAdornment position="end">
                                <Category className='text-asliLight' />
                                </InputAdornment>
                            ),
                            }}
                            variant="standard"
                        />

                        <TextField
                            className="md:w-1/2 w-full p-3"
                            id="input-with-icon-textfield"
                            placeholder=" تلفن  "
                            value={factoryInfo?.editFactoryTelephone}
                            onChange={(e) => setFactoryInfo({...factoryInfo, "editFactoryTelephone" : e.target.value})}
                            InputProps={{
                            startAdornment: (
                                <InputAdornment position="end">
                                <Category className='text-asliLight' />
                                </InputAdornment>
                            ),
                            }}
                            variant="standard"
                        />

                        <TextField
                            className="md:w-1/2 w-full p-3"
                            id="input-with-icon-textfield"
                            placeholder=" موبایل  "
                            value={factoryInfo?.editFactoryMobile}
                            onChange={(e) => setFactoryInfo({...factoryInfo, "editFactoryMobile" : e.target.value})}
                            InputProps={{
                            startAdornment: (
                                <InputAdornment position="end">
                                <Category className='text-asliLight' />
                                </InputAdornment>
                            ),
                            }}
                            variant="standard"
                        />

                        <FormControlLabel
                        className="border border-asliLight rounded-xl md:w-[50%] w-[85%] "
                        control={<Checkbox
                            checked={factoryInfo?.editFactoryComplete}
                            onChange={(e) => setFactoryInfo({...factoryInfo, "editFactoryComplete" : e.target.checked})}
                        />
                        } 
                        label=" تکمیل شده " />

                        <FormControlLabel  
                            className="border border-asliLight rounded-xl md:w-[50%] w-[85%]"
                            control={<Checkbox
                            checked={factoryInfo?.editFactoryActive}
                            onChange={(e) => setFactoryInfo({...factoryInfo, "editFactoryActive" : e.target.checked})}

                            />
                        } 
                            label=" فعال "
                        />

                        </div>

                </div>

                </DialogContent>
                <DialogActions className="p-4 flex flex-row gap-4" >
                <Button className='text-white bg-khas hover:bg-orange-600 w-28' onClick={() => UpdateFactoryApi()} >
                    {loading ? <CircularProgress size="medium" /> : " ثبت تغییرات "}
                </Button>
                <Button variant="soft" color='danger'  onClick={() => setEditFactoryModal(false)}>
                    انصراف
                </Button>
                </DialogActions>
            </Dialog>
            
        </>
    );
}

export default EditFactoryModalPage;