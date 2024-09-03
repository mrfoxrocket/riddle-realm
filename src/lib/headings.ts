const headings = [
    "Are you worthy to join our ranks? Add the answer to the riddle somewhere in your username to pass our test.",
    "Ready to join us? Prove your smarts by sneaking the riddle's answer into your username!",
    "You must prove yourself to unlock entry! Solve the riddle and hide the answer somewhere in your username to join us.",
    "Think you’ve got what it takes? Slip the riddle’s answer into your username and show us your wit!",
    "Your challenge awaits! Embed the riddle’s answer in your username to enter.",
    "Only the clever may pass. Solve the riddle and weave the answer into your username!",
    "Dare to enter? Embed the riddle’s answer in your username to prove your worth!",
    "Can you crack the challenge? Hide the riddle’s answer in your username to prove you're worthy.",
    "Prove your riddle-solving skills! Enter the answer in your username to step inside.",
    "The gateway opens only to the sharp-minded. Conceal the riddle’s answer in your username to proceed!",
];

export function getRandomHeading() {
    const heading = headings[Math.floor(Math.random() * headings.length)];
    return heading;
}

export default getRandomHeading;
