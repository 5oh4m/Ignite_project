import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Doctor from './models/Doctor.js';
import Hospital from './models/Hospital.js';
import connectDB from './config/db.js';

dotenv.config();

const seedData = async () => {
    try {
        await connectDB();

        console.log('🌱 Seeding data...');

        // 1. Seed Hospital
        let hospital = await Hospital.findOne({ name: 'City General Hospital' });
        if (!hospital) {
            hospital = await Hospital.create({
                name: 'City General Hospital',
                address: {
                    street: '123 Health Ave',
                    city: 'Metropolis',
                    state: 'NY',
                    zip: '10001',
                    country: 'USA'
                },
                location: {
                    type: 'Point',
                    coordinates: [-74.006, 40.7128] // NYC
                },
                phone: '+1-555-0123',
                email: 'contact@citygeneral.com',
                departments: ['Cardiology', 'Neurology', 'Pediatrics', 'Orthopedics'],
                totalBeds: 500,
                availableBeds: 120,
            });
            console.log('✅ Hospital seeded');
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
            console.log('✅ Admin user seeded');
        }

        // 3. Seed Doctor
        const doctorEmail = 'doctor@medlink.com';
        const doctorUserExists = await User.findOne({ email: doctorEmail });
        let doctorUser = doctorUserExists;

        if (!doctorUser) {
            doctorUser = await User.create({
                name: 'Dr. John Smith',
                email: doctorEmail,
                password: 'doctorpassword123',
                role: 'doctor',
            });
            console.log('✅ Doctor user seeded');
        }

        const doctorProfileExists = await Doctor.findOne({ user: doctorUser._id });
        if (!doctorProfileExists) {
            await Doctor.create({
                user: doctorUser._id,
                specialization: 'Cardiology',
                qualifications: ['MBBS', 'MD'],
                experienceYears: 10,
                hospital: hospital._id,
                consultationFee: 100,
                availability: [
                    { day: 'Monday', slots: [{ startTime: '09:00', endTime: '12:00' }] },
                    { day: 'Wednesday', slots: [{ startTime: '14:00', endTime: '18:00' }] }
                ],
                licenseNumber: 'MD123456',
                isVerified: true
            });
            console.log('✅ Doctor profile seeded');
        }

        console.log('🎉 Seeding complete!');
        process.exit();
    } catch (error) {
        console.error(`❌ Seeding failed: ${error.message}`);
        process.exit(1);
    }
};

seedData();
