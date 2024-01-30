"use client"

const BackgroundVideo = () => {
    return (
        <div className="w-full h-full z-40 relative" >
            <div className="absolute w-full h-full top-0 left-0 bg-black opacity-40" ></div>
            <video src="https://superapp-storage.storage.iran.liara.space/video/1.mp4" className="object-cover w-full h-full" autoPlay loop muted />
            <div className="absolute w-full h-full top-0 flex justify-center items-center text-white" >
                <h1> معرفی آرپوت مارکت </h1>
            </div>

        </div>
    );
}

export default BackgroundVideo;