import ProfileSidebar from "@/components/layout/ProfileSidebar";

const layout = ({children}) => {
    return (
        <div>
            <ProfileSidebar>
                {children}
            </ProfileSidebar>
        </div>
    );
}

export default layout;