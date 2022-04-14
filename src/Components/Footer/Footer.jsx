import React from 'react';
import './Footer.scss';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
function Footer() {
  return (
    <footer className="footer">
      <div className="footer__content">
        <div className="footer__content__icons">
          <div className="footer__content__icons__icon">
            <FacebookIcon />
          </div>
          <div className="footer__content__icons__icon">
            <InstagramIcon />
          </div>
          <div className="footer__content__icons__icon">
            <TwitterIcon />
          </div>
        </div>
        <div className="footer__content__support">
          <ul>
            <li>
              <a href="#Info">Info</a>
            </li>

            <li>
              <a href="#Support">Support</a>
            </li>

            <li>
              <a href="#Marketting">Marketting</a>
            </li>

            <li>
              <a href="#Terms">Terms of Use</a>
            </li>

            <li>
              <a href="#Privacy">Privacy Policy</a>
            </li>
          </ul>
        </div>
        <div className="footer__content__copyright">@Clone By DTV</div>
      </div>
    </footer>
  );
}

export default Footer;
