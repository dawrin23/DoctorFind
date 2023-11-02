'use client'

const handledForgotPassword = () => {
  const otp = Math.floor(100000 + Math.random() * 900000);
console.log(otp)  
};

function AboutPage() {
  return (
    <div>
      AboutPage
      <button onClick={handledForgotPassword}>Forgot Password</button>
    </div>
  );
}

export default AboutPage;
