import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import "../styles/Footer.css";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">

                {/* Marca / Nombre */}
                <div className="footer-brand">
                    <h2>Jose Luis Castañeda Osornio</h2>
                    <p>Creating elegant and functional web experiences ✨</p>
                </div>

                {/* Navegación */}
                <ul className="footer-links">
                    <li><a href="#about">About</a></li>
                    <li><a href="#projects">Projects</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>

                {/* Redes sociales */}
                <div className="footer-socials">
                    <a href="https://github.com/castanedaLuis?tab=repositories" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
                    <a href="https://www.linkedin.com/in/jose-luis-casta%C3%B1eda/" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
                    <a href="https://www.instagram.com/luis_castaneda0?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
                </div>
            </div>

            {/* Derechos */}
            <div className="footer-bottom">
                <p>© {new Date().getFullYear()} Jose Luis Castañeda Osornio. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
