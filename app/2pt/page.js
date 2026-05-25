'use client';
import { useEffect } from 'react';

export default function TwoPieceTuesdayPage() {
  useEffect(() => {
    if (!document.querySelector('script[src="https://f.convertkit.com/ckjs/ck.5.js"]')) {
      const s = document.createElement('script');
      s.src = 'https://f.convertkit.com/ckjs/ck.5.js';
      s.async = true;
      document.body.appendChild(s);
    }
  }, []);

  return (
    <div className="tpt-page">
      {/* Image 1 — header/hero */}
      <img
        src="/images/2PT (1).png"
        alt="Two-Piece Tuesday"
        className="tpt-image"
      />

      {/* Image 2 — newsletter preview */}
      <img
        src="/images/2PT.png"
        alt="Two-Piece Tuesday Newsletter Preview"
        className="tpt-image"
      />

      {/* ConvertKit subscribe form */}
      <div className="tpt-form-wrap">
        <form
          action="https://app.kit.com/forms/9483998/subscriptions"
          className="seva-form formkit-form"
          method="post"
          data-sv-form="9483998"
          data-uid="aecfb85dd8"
          data-format="inline"
          data-version="5"
          data-options='{"settings":{"after_subscribe":{"action":"message","success_message":"Success! Now check your email to confirm your subscription.","redirect_url":""},"analytics":{"google":null,"fathom":null,"facebook":null,"segment":null,"pinterest":null,"sparkloop":null,"googletagmanager":null},"modal":{"trigger":"timer","scroll_percentage":null,"timer":5,"devices":"all","show_once_every":15},"powered_by":{"show":false,"url":"https://kit.com/features/forms?utm_campaign=poweredby&utm_content=form&utm_medium=referral&utm_source=dynamic"},"recaptcha":{"enabled":false},"return_visitor":{"action":"show","custom_content":""},"slide_in":{"display_in":"bottom_right","trigger":"timer","scroll_percentage":null,"timer":5,"devices":"all","show_once_every":15},"sticky_bar":{"display_in":"top","trigger":"timer","scroll_percentage":null,"timer":5,"devices":"all","show_once_every":15}},"version":"5"}'
          minWidth="400 500 600 700 800"
        >
          <div className="formkit-background" style={{ opacity: 0.2 }} />
          <div data-style="minimal">
            <div className="formkit-header" data-element="header" style={{ color: 'rgb(0,0,0)', fontSize: '27px', fontWeight: 700 }}>
              <h2>Read Two-Piece Tuesday for <br />free every Tuesday morning ☀️</h2>
            </div>
            <div className="formkit-subheader" data-element="subheader" style={{ color: 'rgb(104,104,104)', fontSize: '18px' }}>
              <p>Plus the occasional link to apply to the open roles ;)</p>
            </div>
            <ul className="formkit-alert formkit-alert-error" data-element="errors" data-group="alert" />
            <div data-element="fields" data-stacked="true" className="seva-fields formkit-fields">
              <div className="formkit-field">
                <input className="formkit-input" aria-label="First Name" name="fields[first_name]" placeholder="First Name" type="text" style={{ color: 'rgb(0,0,0)', borderColor: 'rgb(227,227,227)', borderRadius: '4px', fontWeight: 400 }} />
              </div>
              <div className="formkit-field">
                <input className="formkit-input" aria-label="Last Name" name="fields[last_name]" placeholder="Last Name" type="text" style={{ color: 'rgb(0,0,0)', borderColor: 'rgb(227,227,227)', borderRadius: '4px', fontWeight: 400 }} />
              </div>
              <div className="formkit-field">
                <input className="formkit-input" name="email_address" aria-label="Email Address" placeholder="Email Address" required type="email" style={{ color: 'rgb(0,0,0)', borderColor: 'rgb(227,227,227)', borderRadius: '4px', fontWeight: 400 }} />
              </div>
              <div className="formkit-field">
                <input className="formkit-input" aria-label="Phone Number" name="fields[phone_number]" placeholder="Phone Number" type="text" style={{ color: 'rgb(0,0,0)', borderColor: 'rgb(227,227,227)', borderRadius: '4px', fontWeight: 400 }} />
              </div>
              <button data-element="submit" className="formkit-submit" style={{ color: 'rgb(255,255,255)', backgroundColor: 'rgb(0,0,238)', borderRadius: '7px', fontWeight: 400 }}>
                <div className="formkit-spinner"><div /><div /><div /></div>
                <span>Subscribe</span>
              </button>
            </div>
            <div className="formkit-guarantee" data-element="guarantee" style={{ color: 'rgb(77,77,77)', fontSize: '13px', fontWeight: 400 }}>
              We won't send you spam. Unsubscribe at any time.
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
