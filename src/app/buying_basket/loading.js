import { Suspense } from "react";
import BuyingBasket from "./page";
import GeneralLoader from "@/components/module/GeneralLoader";

const Loading = () => {
    return (
        <Suspense fallback={<GeneralLoader/>}>
            <BuyingBasket/>
        </Suspense>
    );
}

export default Loading;
