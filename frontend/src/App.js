import React, { useEffect, useState } from "react";
import Catalog from "./components/Catalog";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Toast from "./components/Toast/Toast";

function App() {
    const [location, setLocation] = useState("");

    useEffect(() => {
        setLocation(window.location.hash.slice(2));
    }, []);

    return (
        <div className='App'>
            <Navbar />
            <Toast message={location} />
            <main>
                <Catalog />
            </main>
            <Footer />
        </div>
    );
}

export default App;
