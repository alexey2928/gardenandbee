import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { useSelector } from "react-redux";
import { selectFaqs, selectFaqsError } from "../../store/slices/faqsSlice";

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
  const faqs = useSelector(selectFaqs);
  const error = useSelector(selectFaqsError);

  if (error) {
    return (
      <section className="mt-10">
        <h2 className="mb-4 text-center text-[35px] font-medium leading-normal text-black sm:mb-10 sm:text-4xl sm:leading-[78px] lg:text-[60px]">
          Frequently <span className="text-primary">Asked Questions</span>
        </h2>
        <div className="mx-auto max-w-[1280px]">{error}</div>
      </section>
    );
  }

  return (
    <section className="mt-10">
      <h2 className="mb-4 text-center text-[35px] font-medium leading-normal text-black sm:mb-10 sm:text-4xl sm:leading-[78px] lg:text-[60px]">
        Frequently <span className="text-primary">Asked Questions</span>
      </h2>
      <div className="mx-auto max-w-[1280px]">
        {faqs.map((faq, index) => (
          <FAQItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </section>
  );
};

export default FAQsSection;
