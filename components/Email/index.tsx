"use client";
import React, { useState } from "react";
import { init, send } from "@emailjs/browser";

const Email = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");

  const sendEmail = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const userId = process.env.NEXT_PUBLIC_EMAILJS_USER_ID;
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;

    if (userId && serviceId && templateId) {
      //emailjsを初期化する
      init(userId);

      const params = {
        name: name,
        email: email,
        content: content,
      };
      await send(serviceId, templateId, params);
      setName("");
      setEmail("");
      setContent("");
    }
  };
  return (
    <form className="flex flex-col [&_input]:border-2 [&_input]:w-80">
      <label>Name</label>
      <input
        type="text"
        name="user_name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label>Email</label>
      <input
        type="email"
        name="user_email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label>Message</label>
      <textarea
        name="message"
        className="border-2 w-80"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button onClick={sendEmail} className="bg-primary-700 w-20">
        送信
      </button>
    </form>
  );
};

export default Email;
