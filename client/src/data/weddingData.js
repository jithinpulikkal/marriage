const weddingData = {
    brand: {
        monogram: "R&J",
        title: "",
        subtitle: "A Sacred Union in Tradition & Love",
        tagline: "Two hearts, one beautiful journey begins",
    },

    nav: {
        items: [
            // { label: "Home", hash: "#top" },
            { label: "Wedding Details", hash: "#details" },
            { label: "Location", hash: "#location" },
        ],
        photosLabel: "Photos",
    },

    couple: {
        bride: {
            name: "Dr. Raveena Venugopal",
            parents: "D/o Smt. Rajasree & Sri. Venugopal",
            address: "Cherukudilil House",
            address1: "Chilavil, Ponmundam P O",
            hometown: "Vailathur, Tirur",
        },
        groom: {
            name: "Jithin",
            parents: "S/o Smt. Usha & Sri. Radhakrishnan",
            address: "Pulikkal House",
            address1: "Meenkallu, Mattathur P O",
            hometown: "Othukkungal, Malappuram",
        },
    },

    invitation: {
        title: "Wedding Invitation",
        message:
            "With the blessings of the Almighty and our beloved families, we cordially invite you to grace the wedding ceremony of",
        welcomeMessage: "Your presence will add joy and meaning to this auspicious occasion as we unite in marriage.",
        blessingsMessage: "We seek your blessings, love, and good wishes as we embark on this beautiful journey together.",
        closingLine: "We look forward to celebrating this special day with you.",
    },

    ceremony: {
        title: "",
        subtitle: "Traditional Wedding Rituals",
        intro: "Experience the beauty of a traditional Kerala wedding, rich in culture, music, and rituals.",
        details: ["Ganapathi Homam", "Thalikettu", "Exchange of garlands"],
        // dressCode: "Traditional Kerala attire preferred",
    },

    events: {
        wedding: {
            title: "Wedding Ceremony",
            dateText: "Saturday, 12 September 2026",
            timeText: "1202 Chingam 27",
            muhurthamText: "Muhurtham at 10:45 AM",
            description:
                "Join us as we tie the sacred knot in the presence of our loved ones, following traditional Kerala rituals.",
        },
        reception: {
            title: "Wedding Reception",
            dateText: "Saturday, 12 September 2026",
            timeText: "4:30 PM onwards",
            note: "",
            description: "Celebrate with us in the evening with a grand reception, delightful cuisine, and joyful moments.",
        },
    },

    venues: [
        {
            title: "Wedding Ceremony",
            name: "Emerald Palace",
            addressLines: ["Kalpakancheri, Malappuram", "Kerala, India - 676551"],
            mapLink: "https://maps.google.com/?q=Emerald+Palace+Kalpakancheri",
        },
        {
            title: "Wedding Reception",
            name: "Koyas Convention Center",
            addressLines: ["Valiyaparambu, Malappuram", "Kerala, India - 676503"],
            mapLink:
                "https://www.google.com/maps/place/Koyas+Convention+Centre/@11.0061718,76.0273989,1229m/data=!3m1!1e3!4m6!3m5!1s0x3ba7b5f37de3d707:0xf03f7c4a85a13277!8m2!3d11.0046966!4d76.0299226!16s%2Fg%2F11n5r4s9_n?entry=ttu&g_ep=EgoyMDI2MDMxOC4xIKXMDSoASAFQAw%3D%3D",
        },
    ],

    schedule: [
        {
            time: "09:30 AM",
            event: "Guest Arrival & Welcome",
        },
        {
            time: "10:30 AM",
            event: "Wedding Ceremony Begins",
        },
        {
            time: "10:45 AM",
            event: "Muhurtham",
        },
        {
            time: "12:00 PM",
            event: "Sadya",
        },
        {
            time: "04:30 PM",
            event: "Reception Begins",
        },
    ],

    photos: {
        placeholderCount: 8,
        notice: "Photos will be updated live during and after the wedding celebrations.",
        phaseTwo:
            "Soon, you will be able to explore and download photos categorized into Wedding, Reception, and Highlights.",
    },

    footer: {
        message: "Thank you for being a part of our special day and for your love and blessings.",
        signature: "With love, Raveena & Jithin",
        copyright: `© ${new Date().getFullYear()} Raveena & Jithin. All Rights Reserved.`,
    },
};

export default weddingData;
