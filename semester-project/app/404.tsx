import Link from 'next/link'

export default function NotFound() {
    return(
        <div className="not-found">
        <h1>404</h1>
        <h2>OOOPS! This page is on a coffee break, probably sipping java with other rebellious pages. 
            While we send out a search party, enjoy the chaos. 
            In the meantime, tell a joke or ponder life's great mysteries. 
            If the page doesn't return, blame it on cosmic typos and consider this your internet scavenger hunt training.</h2>
            <p>Redirecting to the <Link href="/">Homepage</Link></p>

            <style jsx>{`
            .not-found {
                background: #fff;
                padding: 30px;
                box-shadow: 1px 3px 5px rgba(0,0,0,0.1);
                transform: rotateZ(-1deg);
            }
            h1 {
                font-size: 3em
            }
            `
            }
            </style>
    </div>
    )
}