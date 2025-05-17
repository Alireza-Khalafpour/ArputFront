import { Suspense } from "react";
import GeneralLoader from "@/components/module/GeneralLoader";
import ContactUs from "./page";

const Loading = () => {
    return (
        <Suspense fallback={<GeneralLoader/>}>
            <ContactUs/>
        </Suspense>
    );
}

export default Loading;

