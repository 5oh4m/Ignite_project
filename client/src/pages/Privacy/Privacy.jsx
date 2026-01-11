import React from 'react';

const Privacy = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-4xl font-bold text-slate-900 mb-8">Privacy Policy</h1>
            <p className="text-sm text-slate-500 mb-8">Last updated: January 11, 2026</p>

            <div className="prose prose-slate max-w-none">
                <section className="mb-8">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Information We Collect</h2>
                    <p className="text-slate-600 mb-4">
                        We collect information that you provide directly to us, including:
                    </p>
                    <ul className="list-disc pl-6 text-slate-600 space-y-2">
                        <li>Personal identification information (name, email, phone number)</li>
                        <li>Medical history and health records</li>
                        <li>Appointment and consultation data</li>
                        <li>Payment and billing information</li>
                        <li>Location data for hospital search features</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">2. How We Use Your Information</h2>
                    <p className="text-slate-600 mb-4">
                        We use the information we collect to:
                    </p>
                    <ul className="list-disc pl-6 text-slate-600 space-y-2">
                        <li>Provide, maintain, and improve our services</li>
                        <li>Process appointments and facilitate doctor-patient communication</li>
                        <li>Send you technical notices and support messages</li>
                        <li>Respond to your comments and questions</li>
                        <li>Comply with legal obligations and protect our rights</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Data Security</h2>
                    <p className="text-slate-600">
                        We implement industry-standard security measures to protect your personal information.
                        All data is encrypted in transit and at rest. We are HIPAA compliant and follow best
                        practices for healthcare data management.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Information Sharing</h2>
                    <p className="text-slate-600 mb-4">
                        We do not sell your personal information. We may share your information with:
                    </p>
                    <ul className="list-disc pl-6 text-slate-600 space-y-2">
                        <li>Healthcare providers you have appointments with</li>
                        <li>Service providers who assist our operations</li>
                        <li>Legal authorities when required by law</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Your Rights</h2>
                    <p className="text-slate-600">
                        You have the right to access, update, or delete your personal information.
                        Contact us at privacy@medlink.com to exercise these rights.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Contact Us</h2>
                    <p className="text-slate-600">
                        If you have questions about this Privacy Policy, please contact us at:<br />
                        Email: privacy@medlink.com<br />
                        Phone: 1-800-MEDLINK
                    </p>
                </section>
            </div>
        </div>
    );
};

export default Privacy;
