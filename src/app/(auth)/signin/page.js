import SignInPage from "@/components/templates/SignInPage";



async function SignIn() {

    return (
        <div id="backGroundSignin-up" className="flex justify-center items-center w-full h-full"  >
            <div className="">
                <SignInPage/>
            </div>
        </div>
    );
}

export default SignIn;