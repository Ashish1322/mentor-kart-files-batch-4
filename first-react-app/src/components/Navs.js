

import "./nav.css"

export default function SimpleNav({bgcolor})
{
    return (
        <div style={{backgroundColor:bgcolor,margin:0,padding:0}}>
            <ul>
                <li><a href="">Home</a></li>
                <li><a href="">About</a></li>
                <li> <a href="">Contact</a></li>
            </ul>
        </div>
    )
}

