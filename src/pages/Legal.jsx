import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Legal() {
  return (
    <>
      <Header />
      <main className="section light">
        <h1 className="mb-6">Legal Information</h1>
        <p>Terms of service, privacy policy, and compliance statements will appear here.</p>
      </main>
      <Footer />
    </>
  );
}
