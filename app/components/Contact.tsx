import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { Textarea } from "./ui/Textarea";
import { Send, Mail, MessageSquare, Users } from "lucide-react";

interface ContactSectionProps {}

const Contact = ({}: ContactSectionProps) => {
  return (
    <section
      className="py-16 px-4 bg-gradient-to-b from-purple-50 to-white"
      id="contact"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Contact Us</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Have questions about our courses or need more information? Reach out
            to our team and we'll get back to you as soon as possible.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Illustration */}
              <div className="relative h-64 lg:h-auto bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center">
                <div className="relative w-full h-full flex flex-col items-center justify-center p-8">
                  <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-blue-400 rounded-full opacity-20 animate-pulse"></div>
                  <div
                    className="absolute bottom-1/3 right-1/3 w-20 h-20 bg-indigo-400 rounded-full opacity-20 animate-pulse"
                    style={{ animationDelay: "1s" }}
                  ></div>

                  <div className="relative z-10 flex flex-col items-center space-y-6">
                    <div className="p-4 bg-white rounded-full shadow-lg">
                      <Mail size={40} className="text-blue-500" />
                    </div>

                    <div className="flex space-x-8">
                      <div className="p-3 bg-white rounded-full shadow-md">
                        <MessageSquare size={24} className="text-indigo-500" />
                      </div>
                      <div className="p-3 bg-white rounded-full shadow-md">
                        <Users size={24} className="text-blue-500" />
                      </div>
                    </div>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent flex flex-col justify-end p-6 lg:hidden">
                    <h3 className="text-white text-xl font-bold">
                      Get in Touch
                    </h3>
                    <p className="text-white/80 text-sm">
                      We&apos;re here to help with any questions you have
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="p-8">
                <h3 className="text-2xl font-semibold mb-6">
                  Send Us a Message
                </h3>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Your Name
                      </label>
                      <Input
                        id="name"
                        placeholder="John Doe"
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Email Address
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Subject
                    </label>
                    <Input
                      id="subject"
                      placeholder="Course Inquiry"
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Message
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Your message here..."
                      className="w-full min-h-[150px]"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white flex items-center justify-center gap-2"
                  >
                    <Send className="h-4 w-4" />
                    Send Message
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
