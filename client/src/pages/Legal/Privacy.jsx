import React from 'react';

const Privacy = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-bold text-slate-900 mb-8">Privacy Policy</h1>

            <div className="prose prose-slate max-w-none">
                <p className="text-lg text-slate-600 mb-8">
                    Last updated: January 11, 2026
                </p>

                <section className="mb-8">
                    <h2 className="text-xl font-bold text-slate-900 mb-4">1. Information We Collect</h2>
                    <p className="text-slate-600 mb-4">
                        We collect information that you provide directly to us, including:
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-slate-600">
                        <li>Personal identification information (Name, email address, phone number)</li>
                        <li>Medical information (Appointment history, uploaded records, symptoms)</li>
                        <li>Location data (for finding nearby hospitals and emergency services)</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-bold text-slate-900 mb-4">2. How We Use Your Information</h2>
                    <p className="text-slate-600 mb-4">
                        Your data is used strictly to provide healthcare services:
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-slate-600">
                        <li>Facilitating appointments with doctors</li>
                        <li>Providing emergency location services</li>
                        <li>Storing and managing your medical records securely</li>
                        <li>Communicating updates about your appointments</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-bold text-slate-900 mb-4">3. Data Security</h2>
                    <p className="text-slate-600 mb-4">
                        We implement industry-standard security measures including encryption and secure socket layers (SSL) to protect your personal information. Your medical records are accessible only to you and authorized healthcare providers.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-bold text-slate-900 mb-4">4. Sharing of Information</h2>
                    <p className="text-slate-600 mb-4">
                        We do not sell your personal data. We share information only with:
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-slate-600">
                        <li>Healthcare providers you choose to book with</li>
                        <li>Emergency services when you trigger an SOS</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-bold text-slate-900 mb-4">5. Contact Us</h2>
                    <p className="text-slate-600">
                        If you have any questions about this Privacy Policy, please contact us at privacy@medlink.com.
                    </p>
                </section>
            </div>
        </div>
    );
};

export default Privacy;
