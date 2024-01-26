import LoaderPage from "@/components/module/LoaderPage";
import { Suspense } from "react";
import CreateFeature from "../CreateFeature/page";


const Loading = () => {
    return (
        <Suspense fallback={<LoaderPage/>}>
            <CreateFeature/>
        </Suspense>
    );
}

export default Loading;
