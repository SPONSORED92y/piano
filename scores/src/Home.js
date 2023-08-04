import { useEffect, useState } from "react";

const Home = () => {
    const [today, setDate] = useState(new Date()); // Save the current date to be able to trigger an update

    useEffect(() => {
        const timer = setInterval(() => { // Creates an interval which will update the current data every minute
            // This will trigger a rerender every component that uses the useDate hook.
            setDate(new Date());
        }, 1000);
        return () => {
            clearInterval(timer); // Return a funtion to clear the timer so that it will stop being called on unmount
        }
    }, []);

    const specific = today.toLocaleDateString('roc', { weekday: 'long', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' });
    const day = today.getDay();
    const hour = today.getHours();
    const minute = today.getMinutes();
    const second = today.getSeconds();

    return (
        <div className="Home">
            <h1>首頁</h1>
            <h1>{specific}</h1>
            <h1>{day}</h1>
            <h1>{hour}</h1>
            <h1>{minute}</h1>
            <h1>{second}</h1>
        </div>
    );
}

export default Home;