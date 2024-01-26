import LoaderPage from "@/components/module/LoaderPage";
import { Suspense } from "react";
import CreateCategory from "./page";


const Loading = () => {
    return (
        <Suspense fallback={<LoaderPage/>}>
            <CreateCategory/>
        </Suspense>
    );
}

export default Loading;
