// It was my intial plan to use a JSON file and show fetch() understanding in JS, 
// however, I have settled with an JS import file for upload and commenting purposes (credits).

const categories = [
    
    {
        title: "Shower",
        category: "shower",
    },
    {
        title: "Toilet",
        category: "toilet",
    },
    {
        title: "Tap",
        category: "tap",
    },
    {
        title: "Basin & Bathtub",
        category: "basin",
    },
    {
        title: "Pipe & Fittings",
        category: "pipe",
    },
    {
        title: "Radiator",
        category: "radiator",
    },
    {
        title: "Hot Water Cylinder",
        category: "cylinder",
    },
    {
        title: "Cistern",
        category: "cistern",
    },
]
const primeTags = [
    {
        category: "shower",
        tag: "no water",
    },
    {
        category: "shower",
        tag: "noise",
    },
    {
        category: "shower",
        tag: "wrong temperature",
    },
    {
        category: "toilet",
        tag: "overflow",
    },
    {
        category: "toilet",
        tag: "wrong temperature",
    },
    {
        category: "toilet",
        tag: "smell",
    },
    {
        category: "toilet",
        tag: "no water",
    },
    {
        category: "tap",
        tag: "leaking",
    },
    {
        category: "tap",
        tag: "smell",
    },
    {
        category: "tap",
        tag: "noise",
    },
    {
        category: "tap",
        tag: "wrong temperature",
    },
    {
        category: "tap",
        tag: "discoloured",
    },
    {
        category: "basin",
        tag: "noise",
    },
    {
        category: "basin",
        tag: "smell",
    },
    {
        category: "basin",
        tag: "overflow",
    },
    {
        category: "basin",
        tag: "won't hold water",
    },
    {
        category: "pipe",
        tag: "leaking",
    },
    {
        category: "pipe",
        tag: "shaking",
    },
    {
        category: "pipe",
        tag: "noise",
    },
    {
        category: "pipe",
        tag: "discoloured",
    },
    {
        category: "radiator",
        tag: "noise",
    },
    {
        category: "radiator",
        tag: "wrong temperature",
    },
    {
        category: "radiator",
        tag: "leaking",
    },
    {
        category: "cylinder",
        tag: "leaking",
    },
    {
        category: "cylinder",
        tag: "wrong temperature",
    },
    {
        category: "cylinder",
        tag: "noise",
    },
    {
        category: "cistern",
        tag: "leaking",
    },
    {
        category: "cistern",
        tag: "smell",
    },
    {
        category: "cistern",
        tag: "overflow",
    }
]
const subTags = [
    {
        rootTag: "noise",
        tag: "dripping noise",
    },
    {
        rootTag: "noise",
        tag: "banging noise",
    },
    {
        rootTag: "noise",
        tag: "gurgling noise",
    },
    {
        rootTag: "noise",
        tag: "grinding noise",
    },
    {
        rootTag: "noise",
        tag: "whistling noise",
    },
    {
        rootTag: "smell",
        tag: "foul smell",
    },
    {
        rootTag: "smell",
        tag: "chemical smell",
    },
    {
        rootTag: "smell",
        tag: "metallic smell",
    },
    {
        rootTag: "wrong temperature",
        tag: "hot temperature",
    },
    {
        rootTag: "wrong temperature",
        tag: "cold temperature",
    },
    {
        rootTag: "discoloured",
        tag: "water discoloured",
    },
    {
        rootTag: "discoloured",
        tag: "metal discoloured",
    },
]
const diagnoses = [ //Plumbing NVQ and technical certificate level 2 2005 has been the primary source when researching diagnoses, however, other sources are mentioned where additional research was needed with (description).
    {
        categories: ["shower", "tap", "toilet"],
        tags: ["noise", "banging noise", "shaking"],
        diagnosis: "Water Hammer",
        description: "Closing a valve creates a shockwave that is transmitted along the pipework. Defective tap washers and float valves, particularly on cold taps, can cause this.",
        image: "images/pexels-skitterphoto-615326.jpg",
        // credits: Pexels, skitterphoto-615326 (image), Heinemann, JTL, Plumbing NVQ and technical certificate level 2 (description)
    },
    {
        categories: ["shower", "all"],
        tags: ["noise", "grinding noise"],
        diagnosis: "Jammed Pump",
        description: "When a water pump has jammed or is jamming, debris can cause an issue with the pump's impeller. A grinding noise is often associated with this.",
        image: "images/pexels-pavel-danilyuk-7937300.jpg",
        // credits: Pexels, pexels-pavel-danilyuk-7937300 (image), https://envirowaste.com.au/5-common-reasons-your-water-pump-is-making-noise-and-how-to-fix-them/ (description)
    },
    {
        categories: ["tap"],
        tags: ["noise", "dripping noise", "whistling noise", "banging noise", "leaking"],
        diagnosis: "Worn Tap Valve",
        description: "Faulty tap valves can create an inconsistent flow and a permanent drip when off. They often make a whistling noise when opened or a banging sound when shut.",
        image: "images/pexels-skitterphoto-615326.jpg",
        // credits: Pexels, pexels-skitterphoto-615326 (image), https://tapfaucetcity.com/articles/signs-your-taps-need-to-be-replaced/ (description)
    },
    {
        categories: ["pipe", "all"],
        tags: ["leaking", "discoloured", "metal discoloured", "noise", "noise dripping"],
        diagnosis: "Pinhole Leak",
        description: "Pinhole leaks are small perforations in a pipe that numerous factors can cause. Some contributing factors to corrosion are age, water quality, and chemical composition, such as acidic water..",
        image: "images/industrial_copper_tubing_industry.jpg",
        // credits: Pixabay, industrial_copper_tubing_industry (image), https://www.mnsplumbing.com/plumbing-blog/signs-of-a-pinhole-leak-in-copper-pipe (description)
    },
    {
        categories: ["radiator", "shower", "tap"],
        tags: ["no water", "wrong temperature", "cold temperature"],
        diagnosis: "Closed Valve",
        description: "An appliance not heating correctly or a lack of water can often be due to valves mistakenly left shut, restricting water flow.",
        image: "images/247_home_rescue_radiator.jpg",
        // credits: Wikimedia, 247_home_rescue_radiator (image), Heinemann, JTL, Plumbing NVQ and technical certificate level 2 (description)
    },
    {
        categories: ["basin"],
        tags: ["noise", "gurgling noise", "overflow", "smell", "foul smell"],
        diagnosis: "Blocked Trap",
        description: "Drains are prone to debris building within the trap. This can create gurgling noises and cause backflow; foul smells are common.",
        image: "images/zapachova_uzaverka.jpg",
        // credits: Wikimedia, zapachova_uzaverka (image), Heinemann, JTL, https://www.checkatrade.com/blog/expert-advice/signs-of-blocked-drains/ (description)
    },
    {
        categories: ["shower", "basin"],
        tags: ["smell", "foul smell"],
        diagnosis: "Missing Trap",
        description: "If a drain hasn't had a trap fitted, bugs, smells, and gases from the sewer system can escape. For safety, indoor drains should all have traps fitted, as sewer gases can be flammable.",
        image: "images/zapachova_uzaverka.jpg",
        // credits: Wikimedia, zapachova_uzaverka (image), https://www.kingsservices.com/shower-drains-p-traps (description)
    },
    {
        categories: ["shower", "tap", "radiator", "cylinder", "pipe"],
        tags: ["no water", "wrong temperature", "cold temperature"],
        diagnosis: "Boiler/Water Heater Malfunction",
        description: "When the boiler or water heater malfunctions, the water in your system will go unheated. Malfunctions are often specific to the appliance; however, low pressure, lack of water, and gas or electricity are also factors.",
        image: "images/heating_tankless_water_heater.jpg",
        // credits: Pixabay, heating_tankless_water_heater (image), https://www.boilercentral.com/troubleshooting/no-hot-water-coming-from-your-boiler/ (description)
    },
    {
        categories: ["basin"],
        tags: ["won't hold water"],
        diagnosis: "Plug Has Worn",
        description: "Over time, rubber can harden and crack, and mechanical components may break or seize. These factors can cause plugs to lose their ability to hold water effectively.",
        image: "images/247_home_rescue_plug.jpg",
        // credits: Wikimedia, 247_home_rescue_plug (image), Heinemann, JTL, Plumbing NVQ and technical certificate level 2 (description)
    },
    {
        categories: ["tap", "shower"],
        tags: ["noise", "gurgling noise", "dripping noise", "no water", "wrong temperature", "hot temperature", "leaking"],
        diagnosis: "Low Water Pressure",
        description: "Low water pressure can occur for several reasons; common faults include low mains pressure, possible leaks, incorrect system design, and frozen pipes. If not corrected, low pressure can cause appliances to malfunction.",
        image: "images/pexels-skitterphoto-615326.jpg",
        // credits: Pexels, Skitterphoto (image), Heinemann, JTL, https://quality-hc.com/blog/5-signs-of-low-water-pressure-in-your-owasso-house/ (description)
    },
    {
        categories: ["shower", "tap"],
        tags: ["noise", "grinding noise", "no water", "wrong temperature", "hot temperature", "discoloured", "metal discoloured"],
        diagnosis: "Calcification",
        description: "Calcification occurs when water contains high levels of calcium, commonly referred to as hard water. The calcium builds up in the system, creating a hard, chalky residue known as scale. This buildup can reduce water pressure due to narrowed pipes and cause damage to appliances.",
        image: "images/tap_water_old_running.jpg",
        // credits: pixabay, tap_water_old_running (image), https://www.servicelegends.com/8-signs-that-you-have-hard-water-in-your-plumbing/ (description)
    },
    {
        categories: ["Radiator"],
        tags: ["noise", "gurgling noise", "wrong temperature", "cold temperature"],
        diagnosis: "Electrolysis/Galvanic Corrosion",
        description: "When dissimilar metals, such as a copper pipe and a steel radiator, come into contact in the presence of an electrolyte, they form a galvanic couple, initiating galvanic corrosion. Over time, this process will corrode the anode, leading to hydrogen gas accumulation within the system and the formation of iron oxides.",
        image: "images/247_home_rescue_radiator.jpg",
        // credits: Wikimedia, 247_home_rescue_radiator (image), https://copper.org/applications/plumbing/techcorner/electrolysis_cause_copper_tube_fail.php (description)
    },
    {
        categories: ["tap", "shower", "toilet"],
        tags: ["smell", "foul smell", "chemical smell", "metallic smell", "discoloured", "water discoloured"],
        diagnosis: "Contaminated Water",
        description: "Unusual smells, tastes, or discolouration can indicate contaminated water. Maintenance on mains pipes may introduce oxides and dirt, but chemical or sewage odors signal serious contamination, which can pose health risks. Immediate action should be taken.",
        image: "images/pexels-skitterphoto-615326.jpg",
        // credits: Pexels, Skitterphoto (image), Heinemann, JTL, Plumbing NVQ and technical certificate level 2 (description)
    },
    {
        categories: ["toilet"],
        tags: ["overflow", "smell", "foul smell"],
        diagnosis: "Blocked Toilet Syphon",
        description: "Toilet syphons use the siphon effect to remove waste by creating a pressure differential in the pipe, which draws water and waste through the drain. They are prone to blockages, especially when dry or poorly maintained, as debris can disrupt the siphoning action.",
        image: "images/wc_toilet_purely_public_1.jpg",
        // credits: pixabay, wc_toilet_purely_public_1 (image), https://home.howstuffworks.com/question163.htm (description)
    },
    {
        categories: ["toilet", "cistern"],
        tags: ["noise", "gurgling noise", "dripping noise", "no water", "leaking", "overflow"],
        diagnosis: "Broken Cistern Ballcock",
        description: "When a cistern's ballcock becomes worn or damaged, it can result in either a constant flow of water into the cistern or an inability for the cistern to fill. These valves can also stick due to a build-up of scale, particularly in systems with hard water.",
        image: "images/project_365_250_070915.jgp",
        // credits: Flickr, project_365_250_070915 (image), Heinemann, JTL, https://tapron.co.uk/blogs/news/the-signs-you-need-to-replace-the-cistern-parts-in-your-home (description)
    },
    {
        categories: ["all"],
        tags: ["wrong temperature", "hot temperature"],
        diagnosis: "Pipe Not Insulated",
        description: "If a plumbing system lacks adequate insulation, it can cause pipes carrying both cold and hot water to change temperature. For example, hot water pipes installed beneath uninsulated cold pipes can transfer heat, warming the cold water pipes. Alternatively, uninsulated hot water pipes exposed in a cold wall duct can lose heat to the surrounding environment.",
        image: "images/industrial_copper_tubing_industry.jpg",
        // credits: Pixabay, industrial_copper_tubing_industry (image), Heinemann, JTL, Plumbing NVQ and technical certificate level 2 (description)
    },
    {
        categories: ["all"],
        tags: ["noise", "shaking"],
        diagnosis: "Unsecured Piping or Appliance",
        description: "Any plumbing installation can be prone to human error, meaning appliances, pipes and fittings may be installed without being properly secured. This can lead to rattling and shaking noises if the fixtures are left unsecured.",
        image: "images/industrial_copper_tubing_industry.jpg",
        // Pixabay, industrial_copper_tubing_industry (image), Heinemann, JTL, Plumbing NVQ and technical certificate level 2 (description)
    },
];

export { categories, primeTags, subTags, diagnoses };
