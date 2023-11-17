import Carousel from "@/components/module/Carousel";


export default function Home() {

  const slides = [
    "/public/images/download.jpg",
    "/public/images/evil-dead-rise-2023-small.jpg",
    "/public/images/photo-1575936123452-b67c3203c357.avif"
  ]


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-6">
        hello world!

        <div className="w-[75%] h-[10vh] mr-36" >
          <Carousel slides={slides}  />
        </div>




        <div>
          <div  className="test w-full h-[30vh] hover:cursor-pointer ">jsnglksd</div>
        </div>







        {/* <a href="https://lordicon.com/">Icons by Lordicon.com</a> */}

    </main>
  )
}
