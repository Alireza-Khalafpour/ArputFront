'use client'


import { Download } from '@mui/icons-material';
import { Divider } from '@mui/joy';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Typography from '@mui/joy/Typography';
import Link from 'next/link';
import { useState } from 'react';

export default function GoogleArAppModal() {
  const [open, setOpen] = useState(false);
  return (
    <>

      <ul className="app_btn">
        <li onClick={() => setOpen(true)} >
          <Link className=' border-2 border-asliLight bg-white rounded-xl p-2 hover:border-asliDark transition-colors duration-300' href="/" > <Download className="animate-bounce text-3xl text-asliLight" /> دانلود برنامه  </Link>
        </li>
      </ul>

      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog
          aria-labelledby="nested-modal-title"
          aria-describedby="nested-modal-description"
          sx={(theme) => ({
            [theme.breakpoints.only('xs')]: {
              top: 'unset',
              bottom: 0,
              left: 0,
              right: 0,
              borderRadius: 0,
              transform: 'none',
              maxWidth: 'unset',
            },
          })}
        >
          <Typography id="nested-modal-title" level="h2">
            پیش نیاز
          </Typography>
          <Divider></Divider>
          <Typography id="nested-modal-description"  className="font-semibold py-5">
             قبل از نصب برنامه اطمینان حاصل فرمایید که برنامه ی google play services for Ar بر روی گوشی همراه شما نصب و بروزرسانی شده باشد.
          </Typography>
          <div className='w-full mt-4 mb-2 text-center' >
            <Link href="https://superapp-storage.storage.iran.liara.space/Google-Play-Services-for-AR-1.41.233110983.apk" className="rounded-lg bg-khas text-white p-3 w-full border  " > دانلود google play services for Ar </Link>

          </div>
        </ModalDialog>
      </Modal>
    </>
  );
}