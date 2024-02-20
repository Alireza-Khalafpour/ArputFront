import LoaderPage from "@/components/module/LoaderPage";
import { Suspense } from "react";
import CreateFeatureSample from "./page";


const Loading = () => {
    return (
        <Suspense fallback={<LoaderPage/>}>
            <CreateFeatureSample/>
        </Suspense>
    );
}

export default Loading;
