import React, { useState } from "react";
import emailjs from '@emailjs/browser';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    organization: "",
    Address: "",
    email: "",
    contact: "",
    country: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    emailjs
      .send(
        "YOUR_SERVICE_ID", // <-- EmailJS Service ID
        "YOUR_TEMPLATE_ID", // <-- EmailJS Template ID
        {
          name: formData.name,
          organization: formData.organization,
          email: formData.email,
          contact: formData.contact,
          message: formData.message,
        },
        "YOUR_PUBLIC_KEY" // <-- EmailJS Public Key
      )
      .then(() => {
        setSubmitted(true);
        setFormData({
          name: "",
          organization: "",
          Address: "",
          email: "",
          contact: "",
          country: "",  
          message: "",
        });
        setIsSubmitting(false);
      })
      .catch(() => {
        setError(
          "There was an error submitting your message. Please try again."
        );
        setIsSubmitting(false);
      });
  };

  return (
    <section id="contact" className="bg-black text-white py-24 px-6 md:px-20">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="text-orange-500">Get in</span> Touch
        </h2>
        <p className="text-gray-300 text-lg md:text-xl">
          Have questions or a B2B project in mind? Reach out to us using the form
          below, and our team will get back to you promptly.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto bg-white/5 p-10 rounded-3xl shadow-xl space-y-6 backdrop-blur-md border border-gray-700"
      >
        <div className="grid md:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label className="block mb-2 font-medium text-gray-200">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
              className="w-full p-4 rounded-xl bg-gray-800 border border-gray-700 text-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
            />
          </div>

          {/* Organization */}
          <div>
            <label className="block mb-2 font-medium text-gray-200">
              Organization Name
            </label>
            <input
              type="text"
              name="organization"
              value={formData.organization}
              onChange={handleChange}
              placeholder="Your Organization Name"
              required
              className="w-full p-4 rounded-xl bg-gray-800 border border-gray-700 text-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
            />
          </div>
          {/* Address */}
          <div>
            <label className="block mb-2 font-medium text-gray-200">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.Address}
              onChange={handleChange}
              placeholder="Your Address"
              required
              className="w-full p-4 rounded-xl bg-gray-800 border border-gray-700 text-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
            />
          </div>
          {/* Email */}
          <div>
            <label className="block mb-2 font-medium text-gray-200">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
              className="w-full p-4 rounded-xl bg-gray-800 border border-gray-700 text-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
            />
          </div>
           {/* Email */}
          <div>
            <label className="block mb-2 font-medium text-gray-200">Country</label>
            <input
              type=""
              name="country"
              value={formData.country}
              onChange={handleChange}
              placeholder="Your Country"
              required
              className="w-full p-4 rounded-xl bg-gray-800 border border-gray-700 text-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
            />
          </div>

          {/* Contact */}
          <div>
            <label className="block mb-2 font-medium text-gray-200">Contact</label>
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              placeholder="+977 98XXXXXXXX"
              required
              className="w-full p-4 rounded-xl bg-gray-800 border border-gray-700 text-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
            />
          </div>
        </div>

        {/* Message */}
        <div>
          <label className="block mb-2 font-medium text-gray-200">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your message..."
            required
            className="w-full p-4 rounded-xl bg-gray-800 border border-gray-700 text-white h-40 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
          ></textarea>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 font-semibold rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-500 transition-all duration-300 disabled:opacity-50"
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </button>

        {submitted && (
          <p className="text-green-400 text-center mt-4 animate-pulse">
            Message sent successfully!
          </p>
        )}
      </form>
    </section>
  );
};

export default Contact;