"use client";

import { ExpandMore, FilterAlt } from "@mui/icons-material";
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
import { Checkbox, FormControlLabel } from "@mui/material";
import { orange } from "@mui/material/colors";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const FilterProducts = ({ setShowSideFilter }) => {
  const url = process.env.NEXT_PUBLIC_URL;

  const [catgAndFeatures, setCatgAndFeatures] = useState([]);
  const [features, setFeatures] = useState([]);
  const [factories, setFactories] = useState([]);
  const [locations, setLocations] = useState([]);
  const [isExpand, setIsExpand] = useState(false);
  const [open, setOpen] = useState(false);
  const loading = open && catgAndFeatures?.length === 0;
  const [queryParams, setQueryParams] = useState(new URLSearchParams());
  const router = useRouter();

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      await axios
        .get(`${url}/filter/`, {
          headers: {
            accept: "application/json",
          },
        })
        .then((response) => {
          console.log(response.data?.data);
          setFactories(response.data?.data?.factory?.factory);
          setLocations(response.data?.data?.location?.location);
          if (active) {
            setCatgAndFeatures(response.data?.data?.category?.category);
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

  const handleExpand = (panel) => (event, newExpanded) => {
    setIsExpand(newExpanded ? panel : false);
  };

  // ---------------------------------------------------------------------------------------------------
  // make URL query; using checked feature_sample and city and factory and etc.. ---

  const handleCheckboxChange = (paramName, item, isChecked) => {
    console.log(item);
    if (isChecked) {
      // Add the parameter to the query
      if (paramName === "city") {
        queryParams.append(paramName, item?.province_id);
      } else if (paramName === "feature_sample") {
        queryParams.append(paramName, item?.feature_sample_id);
      } else if (paramName === "factory") {
        queryParams.append(paramName, item?.factory_id);
      }
    } else {
      // Remove the parameter from the query
      if (paramName === "city") {
        queryParams.delete(paramName, item?.province_id);
      } else if (paramName === "feature_sample") {
        queryParams.delete(paramName, item?.feature_sample_id);
      } else if (paramName === "factory") {
        queryParams.delete(paramName, item?.factory_id);
      }
    }
    // Update the state with the new query parameters
    setQueryParams(new URLSearchParams(queryParams));
  };
  // Construct the URL with the base URL and query parameters
  const baseUrl = `${url}/filter/items`;
  const finalUrl = `${baseUrl}?${queryParams.toString()}`;

  return (
    <>
      <div
        id="filterPart"
        className="w-1/5 md:flex hidden max-h-[540px] min-h-[420px] overflow-y-scroll bg-white border-asliLight rounded-xl border-2 border-solid p-3 flex-col gap-4"
      >
        <div className="w-full flex flex-row justify-between items-center">
          <FilterAlt
            onClick={() => setShowSideFilter(false)}
            className="p-2 bg-khas rounded-full mx-2 text-white text-4xl cursor-pointer hover:bg-orange-500 hover:scale-105"
          />
          <button
            className="text-sm text-khas hover:scale-105"
            onClick={() => setFeatures([])}
          >
            {" "}
            حذف فیلتر{" "}
          </button>
          <Link
            href={finalUrl}
            className="bg-khas text-white py-1 px-2 rounded-2xl hover:scale-105 hover:text-white"
          >
            {" "}
            اعمال{" "}
          </Link>
        </div>
        <Divider />
        <FormControl id="asynchronouss">
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
            // isOptionEqualToValue={(option, value) =>
            //   option.title === value.title
            // }
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
            {factories?.map((item) => (
              <Accordion
                expanded={isExpand === "factories"}
                onChange={handleExpand("factories")}
              >
                <AccordionSummary
                  className="font-bold"
                  expandIcon={<ExpandMore />}
                >
                  کارخانه
                </AccordionSummary>
                <AccordionDetails>
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={(e) =>
                          handleCheckboxChange(
                            "factory",
                            item,
                            e.target.checked
                          )
                        }
                        sx={{
                          color: orange[800],
                          "&.Mui-checked": {
                            color: orange[700],
                          },
                        }}
                      />
                    }
                    label={item?.factory_name}
                  />
                </AccordionDetails>
              </Accordion>
            ))}
          </AccordionGroup>
        </div>
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
            {locations?.map((item) => (
              <Accordion
                expanded={isExpand === "cities"}
                onChange={handleExpand("cities")}
              >
                <AccordionSummary
                  className="font-bold"
                  expandIcon={<ExpandMore />}
                >
                  استان
                </AccordionSummary>
                <AccordionDetails>
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={(e) =>
                          handleCheckboxChange("city", item, e.target.checked)
                        }
                        sx={{
                          color: orange[800],
                          "&.Mui-checked": {
                            color: orange[700],
                          },
                        }}
                      />
                    }
                    label={item?.province_name}
                  />
                </AccordionDetails>
              </Accordion>
            ))}
          </AccordionGroup>
        </div>
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
            {features?.length > 0 ? (
              <Accordion
              // expanded={isExpand === "features"}
              // onChange={handleExpand("features")}
              >
                <AccordionSummary
                  className="font-bold"
                  expandIcon={<ExpandMore />}
                >
                  ویژگی ها
                </AccordionSummary>
                <AccordionDetails>
                  {features?.map((i) => (
                    <Accordion
                      expanded={isExpand === i?.feature_name}
                      onChange={handleExpand(i?.feature_name)}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMore />}
                        aria-controls={i?.feature_name}
                      >
                        {i?.feature_name}
                      </AccordionSummary>
                      <AccordionDetails>
                        {i?.feature_sample_list.map((item) => (
                          <FormControlLabel
                            control={
                              <Checkbox
                                onChange={(e) =>
                                  handleCheckboxChange(
                                    "feature_sample",
                                    item,
                                    e.target.checked
                                  )
                                }
                                sx={{
                                  color: orange[800],
                                  "&.Mui-checked": {
                                    color: orange[700],
                                  },
                                }}
                              />
                            }
                            label={item?.feature_sample_name}
                          />
                        ))}
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </AccordionDetails>
              </Accordion>
            ) : null}
          </AccordionGroup>
        </div>
      </div>
    </>
  );
};

export default FilterProducts;
