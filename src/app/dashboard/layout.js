import DashbordSidebar from "@/components/layout/DashboardSidebar";
import { Providers } from "../GlobalRedux/provider";


const layout = ({children}) => {
    return (
        <div>
            <Providers>
                <DashbordSidebar>
                    {children}
                </DashbordSidebar>
            </Providers>
        </div>
    );
}

export default layout;