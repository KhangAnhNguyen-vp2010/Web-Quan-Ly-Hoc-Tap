import React, {
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";

const OtpInput = forwardRef(({ length = 5, onSubmit }, ref) => {
  const [otpValues, setOtpValues] = useState(Array(length).fill(""));
  const inputsRef = useRef([]);

  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otpValues];
    newOtp[index] = value;
    setOtpValues(newOtp);

    if (value && index < length - 1) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text").slice(0, length);
    const pasted = paste.split("").filter((c) => /^\d$/.test(c));
    const newOtp = Array(length).fill("");
    pasted.forEach((digit, i) => (newOtp[i] = digit));
    setOtpValues(newOtp);
    if (pasted.length === length) {
      onSubmit(newOtp.join(""));
    }
  };

  // Expose handleSubmitOTP via useImperativeHandle
  useImperativeHandle(ref, () => ({
    handleSubmitOTP: () => onSubmit(otpValues.join("")),
  }));

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(otpValues.join(""));
      }}
      onPaste={handlePaste}
      style={{ display: "flex", gap: "20px" }}
    >
      {otpValues.map((digit, idx) => (
        <input
          key={idx}
          type="text"
          maxLength="1"
          value={digit}
          onChange={(e) => handleChange(idx, e.target.value)}
          onKeyDown={(e) => handleKeyDown(e, idx)}
          ref={(el) => (inputsRef.current[idx] = el)}
          style={{
            width: "40px",
            height: "40px",
            fontSize: "12px",
            textAlign: "center",
            border: "1px solid #ccc",
            borderRadius: "6px",
          }}
        />
      ))}
    </form>
  );
});

export default OtpInput;
