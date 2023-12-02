import * as React from "react";

interface EmailTemplateProps {
  otp: number;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  otp,
}) => (
  <div>
    <div className="bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <img
              className="h-48 w-full object-cover md:w-48"
              src="https://res.cloudinary.com/dbvlq1k1b/image/upload/v1696345177/logo_Doctor_Finder.png"
              alt="Logo"
            />
          </div>
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
              Tu OTP
            </div>
            <p className="mt-2 text-gray-500">{otp}</p>
            <p className="mt-2 text-gray-500">
              Por favor, introduce este OTP para verificar tu cuenta.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);
