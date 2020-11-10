import React, { Component } from 'react';
import $ from 'jquery';

class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contactName: "",
            contactEmail: "",
            contactSubject: "",
            contactMessage: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value})
    }

    handleSubmit(event) {
        event.preventDefault();

        var data = {
            service_id: 'default_service',
            template_id: 'template_default',
            user_id: 'user_key',
            template_params: {
                contactName: this.state.contactName,
                contactEmail: this.state.contactEmail,
                contactSubject: this.state.contactSubject,
                contactMessage: this.state.contactMessage
            }
        };

        $('#image-loader').fadeIn();
        $.ajax('https://api.emailjs.com/api/v1.0/email/send', {
            type: "POST",
            data: JSON.stringify(data),
            contentType: 'application/json'
        }).done(function() {
            $('#image-loader').fadeOut();
            $('#message-warning').hide();
            $('#contactForm').fadeOut();
            $('#message-success').fadeIn();
        }).fail(function() {
            $('#image-loader').fadeOut();
            $('#message-warning').html();
            $('#message-warning').fadeIn();
        });
    }

  render() {

    if(this.props.data){
      var name = this.props.data.name;
      var city = this.props.data.address.city;
      var state = this.props.data.address.state;
      var phone= this.props.data.phone;
      var email = this.props.data.email;
      var message = this.props.data.contactmessage;
    }

    return (
      <section id="contact">
         <div className="row section-head">

            <div className="two columns header-col">
               <h1><span>Get In Touch.</span></h1>
            </div>

            <div className="ten columns">
                  <p className="lead">{message}</p>
            </div>
         </div>

         <div className="row">
            <div className="eight columns">

               <form id="contactForm" className="contactForm" onSubmit={this.handleSubmit}>
					<fieldset>
                        <div>
						   <label htmlFor="contactName">Name <span className="required">*</span></label>
						   <input type="text" size="35" id="contactName" name="contactName" value={this.state.contactName} onChange={this.handleChange}/>
                        </div>
                        <div>
						   <label htmlFor="contactEmail">Email <span className="required">*</span></label>
						   <input type="text" size="35" id="contactEmail" name="contactEmail" value={this.state.contactEmail} onChange={this.handleChange}/>
                        </div>
                        <div>
						   <label htmlFor="contactSubject">Subject</label>
						   <input type="text" size="35" id="contactSubject" name="contactSubject" value={this.state.contactSubject} onChange={this.handleChange}/>
                        </div>
                        <div>
                            <label htmlFor="contactMessage">Message <span className="required">*</span></label>
                            <textarea cols="50" rows="15" id="contactMessage" name="contactMessage" value={this.state.contactMessage} onChange={this.handleChange}></textarea>
                        </div>
                        <div>
                            <button type="submit" className="submit">Submit</button>
                            <span id="image-loader">
                            <img alt="" src="images/loader.gif" />
                            </span>
                        </div>
					</fieldset>
               </form>

                <div id="message-warning"> Error boy</div>
                <div id="message-success">
                    <i className="fa fa-check"></i>Your message was sent, thank you!<br />
                </div>
           </div>

            <aside className="four columns footer-widgets">
               <div className="widget widget_contact">
                   <h4>Location and Contact</h4>
                   <p className="address">
                       {name}<br />
                       {city}, {state}<br />
                       {email}<br />
                       <span>{phone}</span>
                   </p>
               </div>

               <div className="widget widget_tweets">
                  <h4 className="widget-title">Latest Work</h4>
                  <ul id="twitter">
                     <li>
                        <span>
                        Render latest commits here
                        </span>
                     </li>
                  </ul>
		         </div>
            </aside>
         </div>
      </section>
    );
  }
}

export default Contact;
