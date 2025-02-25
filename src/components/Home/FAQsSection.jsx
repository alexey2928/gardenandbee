import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-2.5 rounded-[15px] border border-primary bg-white px-3.5 py-5 sm:mb-[18px] sm:pb-[29px] sm:pl-9 sm:pr-[31px] sm:pt-[26px]">
      <button
        type="button"
        className="flex w-full items-center justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        <p className="pr-5 text-left text-xl font-medium leading-[30px] text-black sm:pr-0 sm:text-lg sm:leading-6 lg:text-[25px] lg:leading-[30px]">
          {question}
        </p>
        <FaChevronDown
          className={`text-black transform ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>
      {isOpen && (
        <div className="mt-2.5">
          <p className="text-base font-normal leading-[26px] text-black sm:leading-6 lg:text-lg lg:leading-[30px]">
            {answer}
          </p>
        </div>
      )}
    </div>
  );
};

const FAQsSection = () => {
  const faqs = [
    {
      question: "What Should I Know Before My Eyelash Extension Appointment?",
      answer:
        "Preparing for your lash extension appointment is essential for achieving the best results. We recommend arriving with a clean face free of any makeup or oil, to ensure proper adhesion of the extensions.",
    },
    {
      question: "What Benefits Do Your Rejuvenating Facials Provide?",
      answer:
        "Our rejuvenating facials are designed to revitalize your skin, helping to improve texture, reduce signs of aging, and promote a radiant glow. Each treatment is tailored to your unique skin type and concerns.",
    },
    {
      question: "Are the Products Used at Your Salon Safe?",
      answer:
        "Yes, we are committed to using high-quality products that are safe and effective. Our team is trained in the latest techniques and continually educates themselves on the best practices in the beauty industry.",
    },
    {
      question: "How Can I Schedule an Appointment?",
      answer:
        "You can easily schedule your appointment online through our booking system. We also encourage you to reach out via phone if you have specific questions or need assistance with the scheduling process.",
    },
    {
      question: "What Should I Prepare Before a Facial?",
      answer:
        "Prior to your facial appointment, it’s beneficial to discuss any skin concerns you may have with our team. Arriving with no makeup allows our estheticians to assess your needs effectively.",
    },
    {
      question: "How Do I Ensure the Best Results from My Services?",
      answer:
        "Communicating openly with our professionals, following post-treatment care instructions, and maintaining a regular beauty regimen will help you achieve and maintain the best results.",
    },
  ];

  return (
    <section className="mt-10">
      <div className="mx-auto max-w-[1570px] px-5 lg:px-10 2xl:px-5">
        <h2 className="mb-4 text-center text-[35px] font-medium leading-normal text-black sm:mb-10 sm:text-4xl sm:leading-[78px] lg:text-[60px]">
          Frequently <span className="text-primary">Asked Questions</span>
        </h2>
        <div className="mx-auto max-w-[1280px]">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQsSection;
