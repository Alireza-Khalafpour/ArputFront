import { Category } from "@mui/icons-material";
import { Alert, Autocomplete, Button, Checkbox, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControlLabel, InputAdornment, Snackbar, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";

const EditFactoryModalPage = ({editFactoryModal, setEditFactoryModal, editFactoryInfo}) => {

    const cookie = new Cookies();
    const Auth = cookie.get('tokenDastResi')

    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState();
    const [alert, setAlert] = useState(false);
    const [errorAlert, setErrorAlert] = useState(false);

    // ---------------------
    
    const [factoryInfo, setFactoryInfo] = useState({
        "factoryIdForEditFactory": "",
        "editFactoryName": "",
        "editFactoryCategories": [],
        "editFactoryTelephone": "",
        "editFactoryImage" : "",
    });

    
    useEffect(() => {
        setFactoryInfo({
            "factoryIdForEditFactory" : editFactoryInfo?.id,
            "editFactoryName" : editFactoryInfo?.name,
            "editFactoryCategories" : [editFactoryInfo?.category[0].id],
            "editFactoryTelephone": editFactoryInfo?.telephone,
            "editFactoryImage" : ""
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
                "id": factoryInfo.factoryIdForEditFactory,
                "name": factoryInfo.editFactoryName,
                "categories": factoryInfo.editFactoryCategories,
                "telephone": factoryInfo.editFactoryTelephone,
                "image": factoryInfo.editFactoryImage,
            }, 
            {
              headers: headers
            })
            .then((response) => {
                setAlert(true)
              if(response.data.Done === true){
                setAlert(true)
                setMessage(response.data.Message)
                setLoading(false)
                setEditFactoryModal(false)

              }else {
                setLoading(false)
                setMessage(response.data.Message)
                setErrorAlert(true)
                setEditFactoryModal(false)

              }
            })
            .catch(function (error) {
                console.log(error)
                setMessage(" متاسفیم،خطایی رخ داده است ")
                setErrorAlert(true)
                setLoading(false)
                setEditFactoryModal(false)
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

            <Snackbar
        open={alert}
        autoHideDuration={4000}
        onClose={() => setAlert(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        se
        >
        <Alert variant='filled' severity='success' className='text-lg text-white font-semibold' > {message} </Alert>
        </Snackbar>

        <Snackbar
        open={errorAlert}
        autoHideDuration={4000}
        onClose={() => setErrorAlert(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        se
        >
        <Alert variant='filled' severity='error' className='text-lg text-white font-semibold' > {message} </Alert>
        </Snackbar>
            
        </>
    );
}

export default EditFactoryModalPage;