import React from 'react';
import  './Footer.css';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className='footer-main'>
        <footer className="footer">
         
              <div className="footer-col-1">
                <h4>company</h4>
                <ul>
                  <li><Link>about us</Link></li>
                  <li><Link>our services</Link></li>
                  <li><Link>privacy policy</Link></li>
                  <li><Link>affiliate program</Link></li>
                </ul>
              </div>
              <div className="footer-col-2">
                <h4>get help</h4>
                <ul>
                  <li><Link>FAQ</Link></li>
                  <li><Link>shipping</Link></li>
                  <li><Link>returns</Link></li>
                  <li><Link>order status</Link></li>
                  <li><Link>payment options</Link></li>
                </ul>
              </div>
              <div className="footer-col-3">
                <h4>online shop</h4>
                <ul>
                  <li><Link>watch</Link></li>
                  <li><Link>bag</Link></li>
                  <li><Link>shoes</Link></li>
                  <li><Link>dress</Link></li>
                </ul>
              </div>
              <div className="footer-col-4">
                <h4>follow us</h4>
                <div className="social-links">
                  <Link><i className="fa fa-facebook-f"></i></Link>
                  <Link><i className="fa fa-twitter"></i></Link>
                  <Link><i className="fa fa-instagram"></i></Link>
                  <Link><i className="fa fa-linkedin-in"></i></Link>
                </div>
              </div>
         
        </footer>
          <div className='copy-right'>
            &copy; {new Date().getFullYear()} All Rights Reserved
          </div>

      
    </div>
  )
}

export default Footer
 