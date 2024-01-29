import Link from "next/link";
import GeneralLoader from "../module/GeneralLoader";

const NotAllowedPage = () => {
    return (
        <div className="text-2xl w-full mx-auto flex flex-col gap-5 justify-center items-center h-[60vh] ">
            {/* <h2> دسترسی محدود </h2>
            <Link href="/signin" className="bg-khas px-5 py-2 text-lg rounded-xl hover:scale-105 text-white"> صفحه ورود </Link> */}
            <GeneralLoader/>
        </div>
    );
}

export default NotAllowedPage;