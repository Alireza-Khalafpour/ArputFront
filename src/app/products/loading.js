import LoaderPage from "@/components/module/LoaderPage";
import { Suspense } from "react";
import Products from "./page";

const Loading = () => {
    return (
        <Suspense fallback={<LoaderPage/>}>
            <Products/>
        </Suspense>
    );
}

export default Loading;
