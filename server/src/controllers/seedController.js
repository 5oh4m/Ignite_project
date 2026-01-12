import Hospital from '../models/Hospital.js';
import User from '../models/User.js';
import Doctor from '../models/Doctor.js';

// @desc    Seed database with sample data
// @route   GET /api/seed
// @access  Public (Protected by secret query)
export const seedDatabase = async (req, res, next) => {
    try {
        const { secret } = req.query;
        if (secret !== 'ignite_seed_123') {
            return res.status(403).json({ success: false, message: 'Invalid seed key' });
        }

        const sampleHospitals = [
            // India Hospitals (User's Region)
            {
                name: 'Apollo Hospital',
                city: 'Mumbai',
                state: 'MH',
                zip: '400001',
                coords: [72.8777, 19.0760]
            },
            {
                name: 'AIIMS',
                city: 'New Delhi',
                state: 'DL',
                zip: '110029',
                coords: [77.2090, 28.6139]
            },
            {
                name: 'Fortis Hospital',
                city: 'Bangalore',
                state: 'KA',
                zip: '560076',
                coords: [77.5946, 12.9716]
            },
            // US Hospitals
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
            }
        ];

        let createdHospitals = [];
        let logs = [];

        // 1. Seed Hospitals
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
                        country: 'IN'
                    },
                    location: {
                        type: 'Point',
                        coordinates: h.coords
                    },
                    phone: '+91-98765-43210',
                    email: `contact@${h.name.toLowerCase().replace(/\s/g, '')}.com`,
                    departments: ['Cardiology', 'Neurology', 'Pediatrics', 'Orthopedics'],
                    totalBeds: 500,
                    availableBeds: Math.floor(Math.random() * 200),
                });
                logs.push(`✅ Hospital created: ${h.name}`);
            } else {
                logs.push(`ℹ️ Hospital exists: ${h.name}`);
            }
            createdHospitals.push(hospital);
        }

        // 2. Seed Admin
        const adminEmail = 'admin@medlink.com';
        let admin = await User.findOne({ email: adminEmail });
        if (!admin) {
            admin = await User.create({
                name: 'Super Admin',
                email: adminEmail,
                password: 'adminpassword123',
                role: 'admin',
            });
            logs.push(`✅ Admin user created: ${adminEmail}`);
        }

        // 3. Seed Doctors
        for (const hospital of createdHospitals) {
            const doctorEmail = `dr.${hospital.city.toLowerCase().replace(' ', '')}@medlink.com`;
            let doctorUser = await User.findOne({ email: doctorEmail });

            if (!doctorUser) {
                doctorUser = await User.create({
                    name: `Dr. of ${hospital.city}`,
                    email: doctorEmail,
                    password: 'doctorpassword123',
                    role: 'doctor',
                });
                logs.push(`✅ Doctor user created for: ${hospital.name}`);
            }

            const doctorProfileExists = await Doctor.findOne({ user: doctorUser._id });
            if (!doctorProfileExists) {
                await Doctor.create({
                    user: doctorUser._id,
                    specialization: 'Cardiology',
                    qualifications: ['MBBS', 'MD'],
                    experienceYears: 10,
                    hospital: hospital._id,
                    consultationFee: 500,
                    availability: [
                        { day: 'Monday', slots: [{ startTime: '09:00', endTime: '12:00' }] }
                    ],
                    licenseNumber: `MD${Math.floor(Math.random() * 100000)}`,
                    isVerified: true
                });
                logs.push(`✅ Doctor profile created for: ${hospital.name}`);
            }
        }

        res.json({ success: true, message: 'Database seeded successfully', logs });
    } catch (error) {
        console.error("Seeding Error:", error);
        res.status(500).json({ success: false, message: 'Seeding failed', error: error.message });
    }
};
