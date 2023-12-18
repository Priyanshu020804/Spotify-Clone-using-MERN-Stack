import { useState } from 'react';
import { Icon } from '@iconify/react';

const PasswordInput = ({ label, placeholder, className , value , setValue}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className={`PasswordInput flex flex-col space-y-2 ${className}`}>
      <label htmlFor={label} className="font-semibold text-white">
        {label}
      </label>
      <div className="relative flex items-center">
        <input
            type={showPassword ? 'text' : 'password'}
            placeholder={placeholder}
            className="p-2 pr-10 text-white bg-zinc-900 border border-gray-400 border-solid rounded placeholder-gray-500 hover:border-white focus:border-white focus:outline-none flex-grow"
            id={label}
            values={value}
            onChange={(e) =>{
              setValue(e.target.value);
            }}
        />
        <Icon class='eye'
            icon={showPassword ? 'feather:eye' : 'feather:eye-off'}
            width="25"
            color="white" 
            onClick={togglePasswordVisibility}
            className='absolute top-2 right-2 cursor-pointer transform transition-transform hover:scale-125'
        />
      </div>
    </div>
  );
};

export default PasswordInput;


