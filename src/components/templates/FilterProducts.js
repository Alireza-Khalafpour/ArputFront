"use client";

import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionGroup,
  AccordionSummary,
  Autocomplete,
  CircularProgress,
  Divider,
  FormControl,
  FormLabel,
  accordionClasses,
} from "@mui/joy";
import axios from "axios";
import { useEffect, useState } from "react";

const FilterProducts = () => {
  const [catgAndFeatures, setCatgAndFeatures] = useState([]);
  const [features, setFeatures] = useState([]);
  const [open, setOpen] = useState(false);
  const loading = open && catgAndFeatures.length === 0;

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      await axios
        .get("https://supperapp-backend.chbk.run/filter/category", {
          headers: {
            accept: "application/json",
          },
        })
        .then((response) => {
          console.log(response.data);
          if (active) {
            setCatgAndFeatures(response.data?.data);
          }
        })
        .catch((error) => {
          console.log(error, "Error");
        });
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  useEffect(() => {
    if (!open) {
      setCatgAndFeatures([]);
    }
  }, [open]);

  return (
    <>
      <div
        id="filterPart"
        className="w-1/6 md:flex hidden max-h-[540px] min-h-[420px] overflow-y-scroll border-asliLight rounded-xl border-2 border-solid p-3 flex-col gap-4"
      >
        <div className="w-full flex flex-row justify-between items-center">
          <span className="text-xl"> فیلتر ها </span>
          <button className="text-sm text-khas"> حذف فیلتر </button>
        </div>
        <Divider />
        <FormControl id="asynchronous">
          <FormLabel>دسته بندی ها</FormLabel>
          <Autocomplete
            placeholder="دسته بندی ها"
            open={open}
            onOpen={() => {
              setOpen(true);
            }}
            onClose={() => {
              setOpen(false);
            }}
            isOptionEqualToValue={(option, value) =>
              option.title === value.title
            }
            getOptionLabel={(i) => i?.category_name}
            options={catgAndFeatures}
            loading={loading}
            onChange={(i, val) => setFeatures(val?.feature_list)}
            endDecorator={
              loading ? (
                <CircularProgress
                  size="sm"
                  sx={{ bgcolor: "background.surface" }}
                />
              ) : null
            }
          />
        </FormControl>
        <div>
          <AccordionGroup
            sx={{
              maxWidth: 400,
              [`& .${accordionClasses.root}`]: {
                marginTop: "0.5rem",
                transition: "0.2s ease",
                '& button:not([aria-expanded="true"])': {
                  transition: "0.3s ease",
                  paddingBottom: "0.625rem",
                },
                "& button:hover": {
                  background: "transparent",
                },
              },
              [`& .${accordionClasses.root}.${accordionClasses.expanded}`]: {
                bgcolor: "background.level1",
                borderRadius: "md",
                borderBottom: "1px solid",
                borderColor: "background.level2",
              },
              '& [aria-expanded="true"]': {
                boxShadow: (theme) =>
                  `inset 0 -1px 0 ${theme.vars.palette.divider}`,
              },
            }}
          >
            {features?.map((i) => (
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  {i?.feature_name}
                </AccordionSummary>
                <AccordionDetails>
                  سمپل هر فیچر برای انتخاب شدن در این قسمت قرار میگیرد
                </AccordionDetails>
              </Accordion>
            ))}
          </AccordionGroup>
        </div>
      </div>
    </>
  );
};

export default FilterProducts;
