import React from 'react';

const Terms = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-bold text-slate-900 mb-8">Terms of Service</h1>

            <div className="prose prose-slate max-w-none">
                <p className="text-lg text-slate-600 mb-8">
                    Last updated: January 11, 2026
                </p>

                <section className="mb-8">
                    <h2 className="text-xl font-bold text-slate-900 mb-4">1. Acceptance of Terms</h2>
                    <p className="text-slate-600 mb-4">
                        By accessing and using MedLink, you accept and agree to be bound by the terms and provision of this agreement.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-bold text-slate-900 mb-4">2. Medical Disclaimer</h2>
                    <p className="text-slate-600 mb-4">
                        MedLink is a technology platform connecting patients with healthcare providers. We do not provide medical advice, diagnosis, or treatment. In case of a medical emergency, please contact local emergency services immediately or use our SOS feature to find help.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-bold text-slate-900 mb-4">3. User Responsibilities</h2>
                    <ul className="list-disc pl-5 space-y-2 text-slate-600">
                        <li>You agree to provide accurate and complete information during registration.</li>
                        <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
                        <li>You agree not to misuse the appointment booking system.</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-bold text-slate-900 mb-4">4. Appointment Booking</h2>
                    <p className="text-slate-600 mb-4">
                        Appointments are subject to doctor availability. MedLink is not liable for cancellations or rescheduling by healthcare providers, though we will make every effort to notify you in a timely manner.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-bold text-slate-900 mb-4">5. Termination</h2>
                    <p className="text-slate-600 mb-4">
                        We reserve the right to terminate or suspend access to our service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
                    </p>
                </section>
            </div>
        </div>
    );
};

export default Terms;
