import { useState } from "react";
import HomePage from "./pages/home.page";
import AboutPage from "./pages/about.page";

export default function AppComponent() {
    const [currentPage, setCurrentPage] = useState<"home" | "about">("home");

    function drawPage() {
        switch (currentPage) {
            case "about":
                return <AboutPage />

            default:
                return <HomePage />;
        }
    }

    return (
        <>
            <header>
                <span>F10 = Fullscreen</span>
                <span>F12 = Dev Tools</span>
                <span>F5 = Reload</span>
            </header>
            <h1>dummy electron app</h1>
            <button onClick={() => setCurrentPage("home")}>home</button>
            <button onClick={() => setCurrentPage("about")}>about</button>
            {drawPage()}
        </>
    )
}