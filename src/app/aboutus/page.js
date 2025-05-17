import axios from "axios";
import Image from "next/image";
import pic from "../../../public/images/Final Light Blur Transparented.png"


async function AboutUs() {

  const url = process.env.NEXT_PUBLIC_URL


    const res =  await axios.get(`${url}/about_us/show`, {
        headers:{
          'accept': 'application/json',
        }
        })
        .catch((error) => {
          console.log(error, "Error");
        });

    const content = res?.data?.content



    return (
        <div className="w-full min-h-[70vh] flex md:flex-row flex-col justify-center items-center gap-6 md:mx-10 mx-auto p-6" >

            <div className="w-full md:hidden flex justify-center items-center " >
                <Image src={pic} width={250} height={250} />
            </div>

            <div className="md:w-1/2 w-full text-xl" >
                <h2 className="leading-10" > 
                    {content}
                </h2>
            </div>

            <div className="w-1/2 md:flex hidden justify-center items-center " >
                <Image src={pic} width={400} height={400} />
            </div>

            
        </div>
    );
}

export default AboutUs;