import { useState, useRef } from "react";
import { motion } from "framer-motion";
import parse from "html-react-parser";
import { contactData } from "../assets/data";
import emailjs from "@emailjs/browser";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
type formProps = {
  name: string;
  email: string;
  subject: string;
  message: string;
};
type FormOptionProps = {
  type: string;
  placeholder: string;
  name: string;
};

const FormOption = ({ type, placeholder, name }: FormOptionProps) => {
  const [focus, setFocus] = useState(false);
  return (
    <div className="relative w-full">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: focus ? "100%" : 0 }}
        className="absolute h-[1px] bg-secondary bottom-0"
      ></motion.div>
      {type === "box" ? (
        <textarea
          required
          name={name}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          rows={6}
          placeholder={placeholder}
          className="outline-none bg-inputBox text-inputBox placeholder:text-inputBox px-5 py-3 w-full"
        />
      ) : (
        <input
          required
          name={name}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          type={type}
          placeholder={placeholder}
          className="outline-none bg-inputBox text-inputBox placeholder:text-inputBox px-5 py-3 w-full"
        />
      )}
    </div>
  );
};

const Contact = () => {
  const [sending, setSending] = useState<boolean>(false);
  const formRef = useRef<HTMLFormElement>(null);
  const sendEmail = (e: any) => {
    setSending(true);
    e.preventDefault();
    emailjs
      .sendForm(
        import.meta.env.VITE_REACT_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_REACT_APP_EMAILJS_TEMPLATE_ID,
        formRef.current as HTMLFormElement,
        import.meta.env.VITE_REACT_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        (result: any) => {
          // show the user a success message
          toast.success("Message Sent");
          formRef.current?.reset();
          setSending(false);
        },
        (error: any) => {
          // show the user an error
          toast("Some error occurred. Please try again later");
          formRef.current?.reset();
          setSending(false);
        }
      );
  };
  return (
    <div id="contact" className="flex flex-col w-[98%] mx-auto space-y-3 ">
      <ToastContainer />
      <h6>&lt;div&gt;</h6>
      <div className="flex flex-col w-[98%] mx-auto space-y-4 relative">
        <div className="absolute z-[1] flex items-center justify-end top-[-39%] md:top-[-37%] lg:top-[-35%] text-[rgba(255,255,255,0.04)] md:right-[-45%] lg:right-[-65%] h-full text-[11rem] lg:text-[20rem]">
          <p>CONTACT</p>
        </div>
        <div className="z-[10]">
          <h6>&lt;h2&gt;</h6>
          <div className="flex flex-col w-[98%] mx-auto">
            <div className="flex items-center text-[45px] md:text-[65px] font-extrabold">
              <>
                {contactData.number?.split("").map((letter, idx) => (
                  <motion.h2
                    initial={{
                      opacity: 0,
                    }}
                    whileInView={{
                      opacity: 1,
                      scale: [1, 1.2, 1],
                      transition: {
                        // type: "spring",
                        stiffness: 300,
                        delay: idx * 0.1,
                      },
                    }}
                    viewport={{ once: true }}
                    whileHover={{
                      // color: "#5DECCC",
                      scaleY: [1, 0.9, 0.8, 0.7, 1.3, 1],
                      scaleX: [1, 1.1, 1.2, 1.3, 0.7, 1],
                      transition: {
                        stiffness: 100,
                        damping: 30,
                        duration: 0.5,
                      },
                    }}
                    className="text-white"
                    key={idx}
                  >
                    {letter}
                  </motion.h2>
                ))}
                <p className="w-3"></p>
                {contactData.title?.split("").map((letter, idx) => (
                  <motion.h2
                    initial={{
                      opacity: 0,
                    }}
                    whileInView={{
                      opacity: 1,
                      scale: [1, 1.2, 1],
                      transition: {
                        // type: "spring",
                        stiffness: 300,
                        delay: (idx + 3) * 0.1,
                      },
                    }}
                    viewport={{ once: true }}
                    whileHover={{
                      // color: "#5DECCC",
                      scaleY: [1, 0.9, 0.8, 0.7, 1.3, 1],
                      scaleX: [1, 1.1, 1.2, 1.3, 0.7, 1],
                      transition: {
                        stiffness: 100,
                        damping: 30,
                        duration: 0.5,
                      },
                    }}
                    className="text-secondary"
                    key={idx}
                  >
                    {letter == "/" ? parse("<span>&nbsp;</span>") : letter}
                  </motion.h2>
                ))}
              </>
            </div>
          </div>
          <h6>&lt;/h2&gt;</h6>
        </div>
        <div className="z-[10] space-y-5">
          <h6>&lt;p&gt;</h6>
          <div className="flex flex-col w-[93%] lg:w-[96%] mx-auto">
            <p className="text-white lg:w-[50%]">{contactData.desc}</p>
          </div>
          <h6>&lt;/p&gt;</h6>
        </div>
        <div className="z-[10] flex flex-col w-[98%] mx-auto space-y-4">
          <h6>&lt;form&gt;</h6>
          <div className="flex flex-col w-[98%] mx-auto">
            <form
              onSubmit={sendEmail}
              ref={formRef}
              className="flex flex-col space-y-3 lg:w-[50%]"
            >
              <div className="flex space-x-3">
                <FormOption type="text" placeholder="Name" name="name" />
                <FormOption type="email" placeholder="Email" name="email" />
              </div>

              <FormOption type="text" placeholder="Subject" name="subject" />
              <FormOption type="box" placeholder="Message" name="message" />
              <motion.button
                initial={{ opacity: 0, translateY: "40%" }}
                animate={{
                  opacity: 1,
                  translateY: "0",
                  transition: {
                    delay: 1.2,
                    duration: 0.4,
                  },
                }}
                className="buttonFlow self-end"
              >
                {sending ? "Sending..." : "Send message!"}
              </motion.button>
            </form>
            <h6>&lt;/form&gt;</h6>
          </div>
        </div>
      </div>
      <h6>&lt;/div&gt;</h6>
    </div>
  );
};

export default Contact;
