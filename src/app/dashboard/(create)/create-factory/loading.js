import LoaderPage from "@/components/module/LoaderPage";
import { Suspense } from "react";
import CreateFactory from "./page";


const Loading = () => {
    return (
        <Suspense fallback={<LoaderPage/>}>
            <CreateFactory/>
        </Suspense>
    );
}

export default Loading;
