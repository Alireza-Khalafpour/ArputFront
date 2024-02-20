import LoaderPage from "@/components/module/LoaderPage";
import { Suspense } from "react";
import { CreateDepartment } from "./page";


const Loading = () => {
    return (
        <Suspense fallback={<LoaderPage/>}>
            <CreateDepartment/>
        </Suspense>
    );
}

export default Loading;
