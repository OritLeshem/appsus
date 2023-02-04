const { Link, NavLink } = ReactRouterDOM

export function Home() {

    return <section className="home">
        {/* <img src="img/background.jpg" alt="" /> */}

        <Link to="/note">
            <img className="homepage-imgs" src="img/google-keep.svg" alt="" />
            {/* <img className="homepage-imgs" src="img/notes-btn.png" alt="" /> */}

        </Link>
        <Link to="/mail">
            {/* <img className="homepage-imgs" src="img/mails-btn.png" alt="" />  */}
            <img className="homepage-imgs" src="img/gmail-logo.svg" alt="" />
        </Link>
    </section>
}






