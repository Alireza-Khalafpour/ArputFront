import GeneralLoader from "@/components/module/GeneralLoader";
import Shops from "./page";
import { Suspense } from "react";

const loading = () => {
    return (
        <Suspense fallback={<GeneralLoader/>}>
            <Shops/>
        </Suspense>
    );
}

export default loading;