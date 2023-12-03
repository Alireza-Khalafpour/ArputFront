// 'use client'

// import * as React from 'react';
// import AspectRatio from '@mui/joy/AspectRatio';
// import Button from '@mui/joy/Button';
// import Card from '@mui/joy/Card';
// import CardContent from '@mui/joy/CardContent';
// import CardOverflow from '@mui/joy/CardOverflow';
// import { Divider, FormControl, FormControlLabel, FormLabel, Grid, InputAdornment, Radio, RadioGroup, TableRow, TextField } from '@mui/material';
// import { AddBoxRounded, CloudUpload, Delete, Filter1Rounded, FilterAlt, Payment, Person, Search, TableRowsRounded} from '@mui/icons-material';
// import { DialogActions, DialogContent, DialogTitle, Modal, ModalDialog } from '@mui/joy';
// import { e2p, sp } from '@/utils/replaceNumbers';



// export default function AdminAddProductCard() {

//   const[addProductModal, setAddProductModal] = React.useState(false);
//   const[count, setCount] = React.useState(0);
//   const[price, setPrice] = React.useState(0);
//   const [image, setImage] = React.useState([])
//   const[fileName, setFileName] = React.useState("فایلی انتخاب نشده...")

//   const DeleteImg = () => {
//     setFileName("فایلی انتخاب نشده...")
//     setImage([])
//   }


//   return (
//     <Grid className='w-full flex flex-row justify-center gap-6' >

//       <div className='w-1/6 flex flex-col bg-paszamine2 rounded-xl gap-4' >
        
//         <div className='w-full bg-asliDark text-white rounded-2xl text-lg p-4 ' > فیلتر <FilterAlt className='text-asliLight' /> </div>
        
//         <FormLabel> جستجوی عنوان </FormLabel>

//         <TextField
//           className='mx-4 rounded-lg bg-white'
//           variant='standard'
//           size='medium'
//           placeholder='جستجوی عنوان'
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="end">
//                 <Search className='text-asliLight' />
//               </InputAdornment>
//             ),
//           }}
//         />

//         <Divider/>

//         <FormControl className='mx-4  ' >
//           <FormLabel id="demo-row-radio-buttons-group-label"> دسته بندی</FormLabel>
//           <RadioGroup
//             row
//             aria-labelledby="demo-row-radio-buttons-group-label"
//             name="row-radio-buttons-group"
//             defaultValue={"All"}
//           >
//             <FormControlLabel value="All" control={<Radio />} label="همه" />
//             <FormControlLabel value="tile" control={<Radio />} label="کاشی" />
//             <FormControlLabel value="ceramic" control={<Radio />} label="سرامیک" />
//             <FormControlLabel value="tile2" control={<Radio />} label="تایل" />

//           </RadioGroup>
//         </FormControl>

//         <Divider/>

//         <div className=' flex flex-row gap-3 justify-end mx-4' >

//             <Button variant="soft" color='danger'  onClick={() => setAddProductModal(false)}>
//               ریست
//             </Button>

//             <Button className='text-white bg-khas hover:bg-orange-600 w-36' onClick={() => setAddProductModal(false)}>
//                جستجو
//             </Button>

          
//         </div>

//       </div>

//       <div className='w-5/6 flex flex-row flex-wrap gap-6 justify-between items-center' >
//         <Card className="w-80 max-w-[100%] shadow-lg">
//           <CardOverflow>
//             <AspectRatio className="min-w-[200px]">
//               <img
//                 src="https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286"
//                 loading="lazy"
//                 alt="تکستچر"
//               />
//             </AspectRatio>
//           </CardOverflow>
//           <CardContent className='w-full text-center' >
//             <Grid
//               fontWeight="lg"
//               overlay
//             >
//               تکستچر سرامیک  
//             </Grid>
//           </CardContent>
//           <CardOverflow>
//             <Button onClick={() => setAddProductModal(true)} endDecorator={<AddBoxRounded/>} variant="solid" className=' hover:bg-asliLight bg-sky-700 transition-all duration-200' size="lg">
//               افزودن تکستچر  
//             </Button>
//           </CardOverflow>
//         </Card>
//         <Card className="w-80 max-w-[100%] shadow-lg">
//           <CardOverflow>
//             <AspectRatio className="min-w-[200px]">
//               <img
//                 src="https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286"
//                 loading="lazy"
//                 alt="تکستچر"
//               />
//             </AspectRatio>
//           </CardOverflow>
//           <CardContent className='w-full text-center' >
//             <Grid
//               fontWeight="lg"
//               overlay
//             >
//               تکستچر سرامیک  
//             </Grid>
//           </CardContent>
//           <CardOverflow>
//             <Button onClick={() => setAddProductModal(true)} endDecorator={<AddBoxRounded/>} variant="solid" className='hover:bg-asliLight bg-sky-700 transition-all duration-200' size="lg">
//               افزودن تکستچر  
//             </Button>
//           </CardOverflow>
//         </Card>
//         <Card className="w-80 max-w-[100%] shadow-lg">
//           <CardOverflow>
//             <AspectRatio className="min-w-[200px]">
//               <img
//                 src="https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286"
//                 loading="lazy"
//                 alt="تکستچر"
//               />
//             </AspectRatio>
//           </CardOverflow>
//           <CardContent className='w-full text-center' >
//             <Grid
//               fontWeight="lg"
//               overlay
//             >
//               تکستچر سرامیک  
//             </Grid>
//           </CardContent>
//           <CardOverflow>
//             <Button onClick={() => setAddProductModal(true)} endDecorator={<AddBoxRounded/>} variant="solid" className='hover:bg-asliLight bg-sky-700 transition-all duration-200' size="lg">
//               افزودن تکستچر  
//             </Button>
//           </CardOverflow>
//         </Card>
//         <Card className="w-80 max-w-[100%] shadow-lg">
//           <CardOverflow>
//             <AspectRatio className="min-w-[200px]">
//               <img
//                 src="https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286"
//                 loading="lazy"
//                 alt="تکستچر"
//               />
//             </AspectRatio>
//           </CardOverflow>
//           <CardContent className='w-full text-center' >
//             <Grid
//               fontWeight="lg"
//               overlay
//             >
//               تکستچر سرامیک  
//             </Grid>
//           </CardContent>
//           <CardOverflow>
//             <Button onClick={() => setAddProductModal(true)} endDecorator={<AddBoxRounded/>} variant="solid" className='hover:bg-asliLight bg-sky-700 transition-all duration-200' size="lg">
//               افزودن تکستچر  
//             </Button>
//           </CardOverflow>
//         </Card>
//         <Card className="w-80 max-w-[100%] shadow-lg">
//           <CardOverflow>
//             <AspectRatio className="min-w-[200px]">
//               <img
//                 src="https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286"
//                 loading="lazy"
//                 alt="تکستچر"
//               />
//             </AspectRatio>
//           </CardOverflow>
//           <CardContent className='w-full text-center' >
//             <Grid
//               fontWeight="lg"
//               overlay
//             >
//               تکستچر سرامیک  
//             </Grid>
//           </CardContent>
//           <CardOverflow>
//             <Button onClick={() => setAddProductModal(true)} endDecorator={<AddBoxRounded/>} variant="solid" className='hover:bg-asliLight bg-sky-700 transition-all duration-200' size="lg">
//               افزودن تکستچر  
//             </Button>
//           </CardOverflow>
//         </Card>
//         <Card className="w-80 max-w-[100%] shadow-lg">
//           <CardOverflow>
//             <AspectRatio className="min-w-[200px]">
//               <img
//                 src="https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286"
//                 loading="lazy"
//                 alt="تکستچر"
//               />
//             </AspectRatio>
//           </CardOverflow>
//           <CardContent className='w-full text-center' >
//             <Grid
//               fontWeight="lg"
//               overlay
//             >
//               تکستچر سرامیک  
//             </Grid>
//           </CardContent>
//           <CardOverflow>
//             <Button onClick={() => setAddProductModal(true)} endDecorator={<AddBoxRounded/>} variant="solid" className='hover:bg-asliLight bg-sky-700 transition-all duration-200' size="lg">
//               افزودن تکستچر  
//             </Button>
//           </CardOverflow>
//         </Card>
//         <Card className="w-80 max-w-[100%] shadow-lg">
//           <CardOverflow>
//             <AspectRatio className="min-w-[200px]">
//               <img
//                 src="https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286"
//                 loading="lazy"
//                 alt="تکستچر"
//               />
//             </AspectRatio>
//           </CardOverflow>
//           <CardContent className='w-full text-center' >
//             <Grid
//               fontWeight="lg"
//               overlay
//             >
//               تکستچر سرامیک  
//             </Grid>
//           </CardContent>
//           <CardOverflow>
//             <Button onClick={() => setAddProductModal(true)} endDecorator={<AddBoxRounded/>} variant="solid" className='hover:bg-asliLight bg-sky-700 transition-all duration-200' size="lg">
//               افزودن تکستچر  
//             </Button>
//           </CardOverflow>
//         </Card>
//         <Card className="w-80 max-w-[100%] shadow-lg">
//           <CardOverflow>
//             <AspectRatio className="min-w-[200px]">
//               <img
//                 src="https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286"
//                 loading="lazy"
//                 alt="تکستچر"
//               />
//             </AspectRatio>
//           </CardOverflow>
//           <CardContent className='w-full text-center' >
//             <Grid
//               fontWeight="lg"
//               overlay
//             >
//               تکستچر سرامیک  
//             </Grid>
//           </CardContent>
//           <CardOverflow>
//             <Button onClick={() => setAddProductModal(true)} endDecorator={<AddBoxRounded/>} variant="solid" className='hover:bg-asliLight bg-sky-700 transition-all duration-200' size="lg">
//               افزودن تکستچر  
//             </Button>
//           </CardOverflow>
//         </Card>
//       </div>


    //   <Modal open={addProductModal} onClose={() => setAddProductModal(false)}>
    //     <ModalDialog variant="outlined" role="definition" className="w-[40vw] h-[65vh] p-0" >
    //       <DialogTitle className="flex justify-center items-center rounded-xl w-full h-[3rem] bg-asliDark text-paszamine1">
    //          افزودن مشخصات *نام تکستچر* 
    //       </DialogTitle>
    //       <Divider />
    //       <DialogContent className="flex flex-col justify-center items-center gap-10" >
    //         <div>
    //           <form onClick={() => document.getElementById("fileInput").click()} className='flex flex-col justify-center items-center border-2 cursor-pointer border-dashed border-asliLight w-56 h-36 rounded-3xl hover:animate-pulse' >
    //           <input 
    //             type='file' 
    //             id='fileInput' 
    //             multiple 
    //             hidden 
    //             accept='image/*'
    //             onChange={({target: {files}}) =>{
    //               files[0] && setFileName(files[0].name)
    //               if(files){
    //                 setImage(URL.createObjectURL(files[0]))
    //               } 
    //             }           
    //             }
    //           />
    //           {image.length!==0 ?
    //             <img className='w-full h-full p-1 rounded-3xl' src={image} alt="تصویر محصول"  />
    //             :
    //             <div className='text-center'>
    //               <CloudUpload className='text-3xl text-asliLight'/>
    //               <p> آپلود عکس محصول </p>
    //             </div>
    //           }
    //           </form>
    //           <div className='w-52 flex flex-row justify-between items-center mt-1 p-1 text-sm' >
    //             <Delete className='text-khas hover:text-orange-600 cursor-pointer' onClick={() => DeleteImg()}/>
    //             <p>{fileName}</p>
    //           </div>
    //         </div>
            

    //         <div className='w-full flex flex-row justify-around items-center' >
    //           <TextField
    //             id="input-with-icon-textfield"
    //             label=" تعداد موجودی "
    //             placeholder=" تعداد موجودی "
    //             value={e2p(count) }
    //             onChange={(e) => setCount(e.target.value)}
    //             InputProps={{
    //               startAdornment: (
    //                 <InputAdornment position="end">
    //                   <TableRowsRounded className='text-asliLight' />
    //                 </InputAdornment>
    //               ),
    //             }}
    //             variant="standard"
    //           />
            
    //           <TextField
    //             id="input-with-icon-textfield"
    //             label="قیمت به ريال"
    //             placeholder="قیمت به ريال"
    //             value={e2p(price) }
    //             onChange={(e) => setPrice(e.target.value)}
    //             InputProps={{
    //               startAdornment: (
    //                 <InputAdornment position="end">
    //                   <Payment className='text-asliLight' />
    //                 </InputAdornment>
    //               ),
    //             }}
    //             variant="standard"
    //           />
    //         </div>


    //       </DialogContent>
    //       <DialogActions className="p-4" >
    //         <Button className='text-white bg-khas hover:bg-orange-600 w-36' onClick={() => setAddProductModal(false)}>
    //            ثبت
    //         </Button>
    //         <Button variant="soft" color='danger'  onClick={() => setAddProductModal(false)}>
    //           انصراف
    //         </Button>
    //       </DialogActions>
    //     </ModalDialog>
    //   </Modal>

//     </Grid>
//   );
// }