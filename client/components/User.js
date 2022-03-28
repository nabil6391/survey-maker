import { useStepperContext } from "../context/StepperContext";

export default function User() {
    const { userData, setUserData } = useStepperContext();

    return (
        <div className="flex flex-col ">

            <div className='bg-red-400'>
                <h1>Nabil</h1>
                <h1>{JSON.stringify(userData)}</h1>
            </div>

        </div>
    );
}