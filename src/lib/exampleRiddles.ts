const exampleRiddles = [
    {
        exampleRiddle:
            "I run, but I never walk. I have a bed, but I never sleep. What am I?",
        answer: "river",
        usernames: [
            "RiverMaster59",
            "whisperingRiver12",
            "toothless_river",
            "RiverDayDream",
        ],
    },
    {
        exampleRiddle:
            "The more you take, the more you leave behind. What am I?",
        answer: "footsteps",
        usernames: [
            "SilentFootsteps",
            "FootstepsEcho",
            "shadowFootsteps",
            "FootstepsInTheDark",
        ],
    },
    {
        exampleRiddle:
            "I speak without a mouth and hear without ears. I have no body, but I come alive with wind. What am I?",
        answer: "echo",
        usernames: [
            "EchoChamber",
            "whisperedEcho",
            "MountainEchoes",
            "EchoInTheVoid",
        ],
    },
    {
        exampleRiddle:
            "I’m tall when I’m young, and I’m short when I’m old. What am I?",
        answer: "candle",
        usernames: [
            "CandleFlame",
            "BurningCandle",
            "CandleLight123",
            "meltingCandle",
        ],
    },
    {
        exampleRiddle: "What has keys but can’t open locks?",
        answer: "piano",
        usernames: ["PianoKeys", "MelodyPiano", "PianoManiac", "silentPiano"],
    },
    {
        exampleRiddle: "What has a heart that doesn’t beat?",
        answer: "artichoke",
        usernames: [
            "ArtichokeHeart",
            "GreenArtichoke",
            "ArtichokeLover",
            "artichoke_fanatic",
        ],
    },
    {
        exampleRiddle: "What is so fragile that saying its name breaks it?",
        answer: "silence",
        usernames: [
            "EndlessSilence",
            "SilenceWhisper",
            "DeepSilence",
            "ShatteredSilence",
        ],
    },
    {
        exampleRiddle: "The more you have of it, the less you see. What is it?",
        answer: "darkness",
        usernames: [
            "EmbraceDarkness",
            "InTheDarkness",
            "DarknessFalls",
            "DarknessDweller",
        ],
    },
    {
        exampleRiddle:
            "I’m not alive, but I can grow; I don’t have lungs, but I need air. What am I?",
        answer: "fire",
        usernames: ["FireBurn", "EternalFire", "FlameOfFire", "Firestarter23"],
    },

    {
        exampleRiddle: "What has to be broken before you can use it?",
        answer: "egg",
        usernames: ["CrackedEgg", "GoldenEgg", "Eggshell", "EggcellentOne"],
    },
    {
        exampleRiddle:
            "I’m light as a feather, yet the strongest man can’t hold me for much longer. What am I?",
        answer: "breath",
        usernames: ["LastBreath", "BreathOfLife", "DeepBreath", "LostBreath"],
    },
    {
        exampleRiddle: "What has many keys but can’t open a single lock?",
        answer: "piano",
        usernames: ["KeyedUpPiano", "PianoLover", "LockedPiano", "IvoryKeys"],
    },
    {
        exampleRiddle:
            "What can travel around the world while staying in a corner?",
        answer: "stamp",
        usernames: [
            "WorldlyStamp",
            "StampOfApproval",
            "GlobalStamp",
            "CornerStamp",
        ],
    },
    {
        exampleRiddle:
            "What has cities, but no houses; forests, but no trees; and rivers, but no water?",
        answer: "map",
        usernames: ["MappingOut", "Cartographer", "WorldMap", "RiverMap"],
    },
];

export function getExampleRiddle() {
    return exampleRiddles[Math.floor(Math.random() * exampleRiddles.length)];
}

export default getExampleRiddle;
