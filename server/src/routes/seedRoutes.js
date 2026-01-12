import express from 'express';
import User from '../models/User.js';
import Doctor from '../models/Doctor.js';
import Hospital from '../models/Hospital.js';

export const seedDatabase = async (req, res) => {
    try {
        // 1. Seed Hospitals
        const sampleHospitals = [
            {
                name: 'City General Hospital',
                city: 'New York',
                state: 'NY',
                zip: '10001',
                coords: [-74.006, 40.7128]
            },
            {
                name: 'Westside Medical Center',
                city: 'Los Angeles',
                state: 'CA',
                zip: '90001',
                coords: [-118.2437, 34.0522]
            },
            {
                name: 'Lakeside Health Institute',
                city: 'Chicago',
                state: 'IL',
                zip: '60601',
                coords: [-87.6298, 41.8781]
            },
            {
                name: 'Sunshine State Hospital',
                city: 'Miami',
                state: 'FL',
                zip: '33101',
                coords: [-80.1918, 25.7617]
            },
            {
                name: 'Central Tech Hospital',
                city: 'Austin',
                state: 'TX',
                zip: '73301',
                coords: [-97.7431, 30.2672]
            }
        ];

        let createdHospitals = [];
        let logs = [];

        for (const h of sampleHospitals) {
            let hospital = await Hospital.findOne({ name: h.name });
            if (!hospital) {
                hospital = await Hospital.create({
                    name: h.name,
                    address: {
                        street: '123 Health Ave',
                        city: h.city,
                        state: h.state,
                        zip: h.zip,
                        country: 'USA'
                    },
                    location: {
                        type: 'Point',
                        coordinates: h.coords
                    },
                    phone: '+1-555-0123',
                    email: `contact@${h.name.toLowerCase().replace(/\s/g, '')}.com`,
                    departments: ['Cardiology', 'Neurology', 'Pediatrics', 'Orthopedics'],
                    totalBeds: 500,
                    availableBeds: Math.floor(Math.random() * 200),
                });
                logs.push(`✅ Hospital created: ${h.name}`);
            } else {
                logs.push(`ℹ️ Hospital already exists: ${h.name}`);
            }
            createdHospitals.push(hospital);
        }

        // 2. Seed Admin
        const adminEmail = 'admin@medlink.com';
        const adminExists = await User.findOne({ email: adminEmail });
        if (!adminExists) {
            await User.create({
                name: 'Super Admin',
                email: adminEmail,
                password: 'adminpassword123',
                role: 'admin',
            });
            logs.push('✅ Admin user created');
        } else {
            logs.push('ℹ️ Admin user already exists');
        }

        // 3. Seed Doctors
        for (const hospital of createdHospitals) {
            const doctorEmail = `dr.${hospital.name.split(' ')[0].toLowerCase()}@medlink.com`;
            let doctorUser = await User.findOne({ email: doctorEmail });

            if (!doctorUser) {
                doctorUser = await User.create({
                    name: `Dr. (${hospital.name.split(' ')[0]})`,
                    email: doctorEmail,
                    password: 'doctorpassword123',
                    role: 'doctor',
                });
                logs.push(`✅ Doctor user created for ${hospital.name}`);
            }

            const doctorProfileExists = await Doctor.findOne({ user: doctorUser._id });
            if (!doctorProfileExists) {
                await Doctor.create({
                    user: doctorUser._id,
                    specialization: 'Cardiology',
                    qualifications: ['MBBS', 'MD'],
                    experienceYears: Math.floor(Math.random() * 20) + 5,
                    hospital: hospital._id,
                    consultationFee: 100 + Math.floor(Math.random() * 50),
                    availability: [
                        { day: 'Monday', slots: [{ startTime: '09:00', endTime: '12:00' }] },
                        { day: 'Wednesday', slots: [{ startTime: '14:00', endTime: '18:00' }] }
                    ],
                    licenseNumber: `MD${Math.floor(Math.random() * 100000)}`,
                    isVerified: true
                });
                logs.push(`✅ Doctor profile created for ${hospital.name}`);
            }
        }

        res.json({
            success: true,
            message: "Database seeded successfully",
            logs
        });

    } catch (error) {
        console.error("Seeding error:", error);
        res.status(500).json({
            success: false,
            message: "Seeding failed",
            error: error.message
        });
    }
};

const router = express.Router();
router.get('/', seedDatabase);

export default router;
