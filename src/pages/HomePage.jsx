
import backgroundImage from "../assets/background.jpg"
import { Link } from "react-router-dom";

function HomePage() {

    return (
      
        <div className="hero min-h-screen" style={{backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover'}}>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-left text-neutral-content">
                <div className="max-w-md">
                    <h1 className="mb-5 text-5xl font-bold">Find your perfect event</h1>
                    <Link to={"/events"}>
                    <button className="btn btn-primary">Find a event</button>
                    </Link>
                </div>
            </div>
        </div>


    );
}

export default HomePage;
