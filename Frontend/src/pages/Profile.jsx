import React from 'react';

const About = () => {
    // Informasi tentang pengguna (Anda bisa mengganti dengan informasi Anda sendiri)
    const userData = {
        name: "Rizqi Zaidan",
        npm: "2206059742",
        jurusan: "Teknik Komputer",
        angkatan: "2022",
        // URL foto Anda (Anda bisa menyimpan foto di direktori /public atau menggunakan URL eksternal)
        photoUrl: "https://media.licdn.com/dms/image/D4D03AQEUyLYd20tqOQ/profile-displayphoto-shrink_800_800/0/1682003780191?e=2147483647&v=beta&t=2tOhrjzdSFKLsHodHcxBzgiDJseXIBq1cDVKCwc-Ux0"
    };

    return (
        <div className="flex items-start mt-4 bg-gray-900">
            <img src={userData.photoUrl} alt={userData.name} className="rounded-full w-32 h-32 mr-8 ml-8" /> {/* Menggunakan mr-8 untuk memberikan jarak kanan */}
            <div>
                <h1 className="text-4xl font-semibold mb-2">{userData.name}</h1>
                <p className="text-lg text-white-600 mb-2">NPM: {userData.npm}</p>
                <p className="text-lg text-white-600 mb-2">Jurusan: {userData.jurusan}</p>
                <p className="text-lg text-white-600 mb-4">Angkatan: {userData.angkatan}</p>
            </div>
        </div>
    );
};

export default About;
