'use client'

import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { QuestionMark } from '@mui/icons-material';

export default function QA_Accordion() {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className="md:w-[85vw] w-[95vw] bg-[#FFFFFF] md:p-20 p-4 rounded-3xl shadow-2xl flex flex-col justify-center items-center" >
      <div className='border-b-2 border-asliLight text-asliDark pb-2 mb-10' >
        <h2 className='text-3xl' >
          سوالات متداول
        </h2>
      </div>
      <Accordion className="md:w-3/4 w-full" expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <div className='w-10 h-10 text-center bg-asliLight text-white rounded-full mx-2' >
            <QuestionMark/>
          </div>
          <h3 > سوالات متداول </h3>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
            Aliquam eget maximus est, id dignissim quam.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion className="md:w-3/4 w-full" expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
      <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <div className='w-10 h-10 text-center bg-asliLight text-white rounded-full mx-2' >
            <QuestionMark/>
          </div>
          <h3 > سوالات متداول </h3>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
            Aliquam eget maximus est, id dignissim quam.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion className="md:w-3/4 w-full" expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
      <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <div className='w-10 h-10 text-center bg-asliLight text-white rounded-full mx-2' >
            <QuestionMark/>
          </div>
          <h3 > سوالات متداول </h3>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
            Aliquam eget maximus est, id dignissim quam.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion className="md:w-3/4 w-full" expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
      <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <div className='w-10 h-10 text-center bg-asliLight text-white rounded-full mx-2' >
            <QuestionMark/>
          </div>
          <h3 > سوالات متداول </h3>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
            Aliquam eget maximus est, id dignissim quam.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
