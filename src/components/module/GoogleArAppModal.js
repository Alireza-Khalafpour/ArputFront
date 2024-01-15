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

      <button className='rounded-full bg-paszamine1 text-center text-khas p-2 w-16 h-16 outline-dashed outline-khas ' onClick={() => setOpen(true)}>
            <Link href="https://superapp-storage.storage.iran.liara.space/ARPutMarketApp.apk" className="rounded-full bg-paszamine1 text-khas p-2 w-16 h-16 " > <Download className="animate-bounce text-4xl" /> </Link>
      </button>
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