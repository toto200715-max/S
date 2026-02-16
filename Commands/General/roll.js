const { createCanvas } = require('canvas');
const { MessageAttachment } = require('discord.js');

module.exports = {
    name: 'roll',
    run: async (client, message, args) => {
        const canvas = createCanvas(200, 200);
        const ctx = canvas.getContext('2d');

        // Generate a random number
        const randomNumber = Math.floor(Math.random() * 100) + 1;

        // Draw the random number on the canvas
        ctx.font = '48px sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center'; // Center the text horizontally
        ctx.textBaseline = 'middle'; // Center the text vertically
        ctx.fillText(`🎲 ${randomNumber}`, canvas.width / 2, canvas.height / 2);

        // Create a buffer from the canvas
        const buffer = canvas.toBuffer();

        // Create a new attachment with the buffer
        const attachment = new MessageAttachment(buffer, 'roll.png');

        // Send the attachment as a message
        message.channel.send({ files: [attachment] });
    }
};
