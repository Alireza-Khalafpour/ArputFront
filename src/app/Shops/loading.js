'use client'


// import GeneralLoader from "@/components/module/GeneralLoader";
import Shops from "./page";
import { Suspense } from "react";
import LoaderPage from "@/components/module/LoaderPage";

const loading = () => {
    return (
        <Suspense fallback={<LoaderPage/>}>
            <Shops/>
        </Suspense>
    );
}

export default loading;