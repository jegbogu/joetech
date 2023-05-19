import Logo from "./logo";
import Link from 'next/link';
import Account from "../account";

const MainNavigation = () => {
    return (
        <header>
            <nav>
                <Link href='/'>
                    <Logo />
                </Link>
                <menu>
                    <ul>
                        <li><Link href='/dashboard'>Dashboard</Link></li>
                        <li><Link href='/portfolio'>My Portfolio</Link></li>
                        <li><Link href='/contact'>Contact</Link></li>
                        <li><Link href='/services'>Services</Link></li>
                        <li><Link href='/blog'>Blog</Link></li>
                    </ul>
                </menu>
                <Account />
            </nav>

        </header>
    );
}

export default MainNavigation;