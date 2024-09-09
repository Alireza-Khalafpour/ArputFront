import axios from "axios";

async function SingleBlog({ params: { single_blog } }) {
  // get single product data ------------------------------
  const headers = {
    accept: "application/json",
  };

  const res = await axios
    .get(`https://supperapp-backend.chbk.run/blogs/${single_blog}`, {
      headers: {
        accept: "application/json",
      },
    })
    .catch((error) => {
      console.log(error, "Error");
    });

  const blogContent = res?.data?.data;


  return (
    <>
      <div className="w-full h-full flex flex-col justify-center items-center gap-10">
        <div className="min-h-36 bg-asliLight w-full text-center flex flex-col gap-5 justify-center items-center rounded-3xl text-white text-4xl font-semibold ">
          {blogContent?.main_title}
          <h2 className="border-white border-2 rounded-3xl p-2 text-sm text-white ">
            {blogContent?.tags}
          </h2>
        </div>
        <div className="text-pretty text-justify p-10 ">
          <div dangerouslySetInnerHTML={{ __html: blogContent?.main_content }} />
        </div>
      </div>
    </>
  );
}

export default SingleBlog;
