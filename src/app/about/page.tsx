'use client'
const handletForgotPassword = () => {
  const otp = Math.floor(100000 + Math.random() * 900000);
  console.log(otp);
};

function AboutPage() {
  return (
    <div>
      AboutPage
      <button onClick={handletForgotPassword}>Forgot Password</button>
    </div>
  );
}

export default AboutPage;
