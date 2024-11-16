import styles from "../styles/footer.module.css";
function Footer() {
  return (
    <div className={styles.footer}>
      <div>
        <div>
          <img
            src="https://assets.inshorts.com/website_assets/images/logo_footer.png"
            alt=""
          />
          <p>
            <b>Inshorts</b>Pte. Ltd.
          </p>
          <p>COPYRIGHT 2024 </p>
        </div>
      </div>
      <div>
        <div>
        <p>Contact Us</p>
        <p>Terms & Conditions</p>
        <p>Privacy Policy</p>
        </div>
        <div>
            <img src="https://assets.inshorts.com/website_assets/images/facebook.png" alt="facebook"/>
            <img src="https://assets.inshorts.com/website_assets/images/twitter.png" alt="twitter"/>
            <img src="https://assets.inshorts.com/website_assets/images/linkedin.png" alt="instagram"/>
            
        </div>
      </div>
    </div>
  );
}
export default Footer;
