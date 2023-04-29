import { useState } from "react";
import { Link } from "react-router-dom";

function HeaderMenu() {
    const [popup, setPopup] = useState(false)
    return (
        <div id="HeaderMenu">
            <button onClick={() => { setPopup(!popup) }}>Menu</button>
            {
                popup &&
                <div className="menu">
                    <p>Lithi</p>
                    <p>Mgwebi</p>
                </div>
            }
        </div>
    )
}

export default HeaderMenu