import DashbordSidebar from "@/components/layout/DashboardSidebar";


const layout = ({children}) => {
    return (
        <div>
        <DashbordSidebar>
            {children}
        </DashbordSidebar>
        </div>
    );
}

export default layout;