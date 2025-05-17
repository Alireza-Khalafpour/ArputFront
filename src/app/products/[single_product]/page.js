import { Chip, Divider } from "@mui/joy";
import CommentTextArea from "@/components/module/CommentTextArea";
import axios from "axios";
import { cookies } from "next/headers";
import Link from "next/link";
import ViewProduct from "@/components/module/ViewProduct";
import SellerDetails from "@/components/module/SellerDetails";
import SpecificationProduct from "@/components/module/SpecificationProduct";
import LikeDislikeComment from "@/components/module/LikeDislikeComment";

async function SingleProduct({ params: { single_product } }) {
  const Auth = cookies().get("tokenDastResi")?.value
    ? cookies().get("tokenDastResi")?.value
    : null;

  const url = process.env.NEXT_PUBLIC_URL;

  // get single product data ------------------------------
  const headers = {
    accept: "application/json",
    Authorization: `Bearer ${Auth}`,
  };

  const res = await axios
    .get(`${url}/product/product/${single_product}`, {
      headers: {
        accept: "application/json",
      },
    })
    .catch((error) => {
      console.log(error, "Error");
    });

  const productList = res?.data;

  // get comments of pre product ----------------------------------

  const CommentsApi = await axios
    .get(
      `${url}/comment/pre_product/comment_list?pre_product_id=${single_product}`,
      {
        headers: {
          accept: "application/json",
        },
      }
    )
    .catch((error) => {
      console.log(error, "Error");
    });

  const CommentsList = CommentsApi?.data?.data;

  return (
    <>
      <div className=" my-5 flex flex-col gap-5">
        <Divider
          className="text-asliLight text-4xl"
          sx={{ "--Divider-childPosition": "10%" }}
        >
          <Link
            href={`/Shops/${productList?.seller_info[0]?.seller_id}/${productList?.seller_info[0]?.seller_name}`}
          >
            فروشگاه{" "}
            {productList?.seller_info[0]?.seller_name
              ? productList?.seller_info[0]?.seller_name
              : "آرپوت مارکت"}
          </Link>
        </Divider>

        <div className=" flex md:flex-row flex-col w-full">
          <div className=" flex flex-col gap-8 md:w-2/3 w-full">
            <ViewProduct
              className="w-full"
              productList={productList}
              single_product={single_product}
            />
            <SellerDetails className="w-full" productList={productList} />
            <div className="w-full md:hidden block">
              <SpecificationProduct productList={productList} />
            </div>
            <div className="w-full flex flex-col gap-12 justify-center items-center">
              <div className="w-full text-center">
                <span className="border-b-8 border-khas p-2 text-2xl">
                  دیدگاه و نظرات{" "}
                </span>
              </div>

              <div className="w-full">
                <CommentTextArea single_product={single_product} />
              </div>

              <ul className="w-full mx-auto flex flex-col gap-6 justify-center items-center ">
                {CommentsList?.map((i) => (
                  <li className="md:w-[90%] w-full flex flex-row justify-between items-center p-4 gap-4 odd:bg-slate-200 border-black border-b-2 ">
                    <div>
                      <div className="p-2 text-sm bg-paszamine3 max-w-fit text-white rounded-2xl">
                        {i?.title}
                      </div>
                      <span> {i?.content} </span>
                    </div>
                    <div>
                      <LikeDislikeComment
                        CommentId={i.id}
                        single_product={single_product}
                        Like={i.like}
                        DisLike={i.dislike}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className=" md:w-1/3 left-0 md:block hidden">
            <SpecificationProduct productList={productList} />
          </div>
        </div>

        {/* <div className="w-full flex flex-col gap-12 justify-center items-center">
            <div className="w-full">
              <span className="border-b-8 border-khas p-2 text-2xl">
                دیدگاه و نظرات{" "}
              </span>
            </div>

            <div className="md:w-[90%] w-full">
              <CommentTextArea single_product={single_product} />
            </div>

            <ul className="w-[80%] mx-auto flex flex-col gap-6 justify-center items-center ">
              {
                CommentsList?.map((i) => (
                  <li className="md:w-[90%] w-full flex flex-row justify-between items-center p-4 gap-4 odd:bg-slate-200 border-black border-b-2 ">
                      <div>
                        <div
                            className="p-2 text-sm bg-paszamine3 max-w-fit text-white rounded-2xl"
                          >
                            {i?.title}
                          </div>
                        <span> {i?.content} </span>
                      </div>
                      <div>
                        <LikeDislikeComment CommentId={i.id} single_product={single_product} Like={i.like} DisLike={i.dislike} />
                      </div>
                  </li>
                ))
              }
            </ul>
          </div> */}
      </div>
    </>
  );
}

export default SingleProduct;
