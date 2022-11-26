import './Footer.scss'
import react from '../images/react.svg'
import django from '../images/django.svg'


const Footer = () => {

    return (

        <footer className="footer">

            <p>Powered by:</p>

            <div className='img-container'>
                <figure>
                    <img className='react-logo' src={react} alt="react" />
                </figure>
                <figure>
                    <img className='django-logo' src={django} alt="django" />
                </figure>
            </div>

        </footer>

    )
}

export default Footer