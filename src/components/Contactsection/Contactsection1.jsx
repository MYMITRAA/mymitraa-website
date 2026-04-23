import "./Contactsection.css";
import flagindia from "../../assets/images/FlagIndia.svg";
import flag2 from "../../assets/images/flag2.svg";
import email from "../../assets/images/email.svg.svg";


function ContactSection() {
  return (
    <section className="contact-section">
      <div className="contact-container">

        
        <div className="contact-left">
          <h2 className="contact-title">
            We are Excited to Be a Part <br />
            of Your Next Big Project!
          </h2>

          <p className="contact-subtext">
            Your big dreams deserve the right strategy. Fill out the form,
            pick a time that works for you, and let’s connect!
          </p>

          <div className="contact-info">
            <div className="info-item">
              <img src={flagindia} alt="India Flag" />
              <p>+91 99833 30784</p>
            </div>

            <div className="info-item">
              <img src={flag2} alt="Canada Flag" />
              <p>+1 (226) 339-0503</p>
            </div>

            <div className="info-item">
              <img src={email} alt="Email Icon" />
              <p>info@mitratechgroup.com</p>
            </div>
          </div>
        </div>

       
        <div className="contact-right">
          <form className="contact-form">

            <div className="form-group">
              <label>Full Name <span>*</span></label>
              <input type="text" placeholder="Enter Name" />
            </div>

            <div className="form-group">
              <label>Email ID <span>*</span></label>
              <input type="email" placeholder="Enter Email ID" />
            </div>

            <div className="form-group">
              <label>Contact Number <span>*</span></label>

              <div className="phone-group">
                <div className="country-code"><img src={flagindia} alt="India Flag" />▾</div>   
                <input type="text" placeholder="Enter Contact Number" />
              </div>
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea placeholder="Enter Description"></textarea>
            </div>

            <div className="form-bottom">
              <div className="attach">
                📎 <span>Attach your document</span>
              </div>

              <button type="submit" className="proposal-btn">
                Request Proposal
              </button>
            </div>

          </form>
        </div>

      </div>
    </section>
  );
}

export default ContactSection;