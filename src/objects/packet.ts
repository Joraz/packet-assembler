/**
 * Class that represents a parsed incoming packet
 * @class
 */
export class Packet
{
    /**
     * The shared identifier for all packets within a message
     * @property {number} messageId
     */
    public readonly messageId: number;

    /**
     * The unique identifier of the packet within the message
     * @property {number} packetId
     */
    public readonly packetId: number;

    /**
     * The total number of packets within a complete packet
     * @property {number} numberOfPackets
     */
    public readonly numberOfPackets: number;

    /**
     * The original message before the packet was parsed
     * @property {string} originalMessage
     */
    public readonly originalMessage: string;

    /**
     * Create a new packet object from a `string` message
     * @constructor
     * @param {string} message The unparsed message
     */
    constructor(message: string)
    {
        if (!message || message.trim().length === 0) {
            throw new Error('Cannot construct packet from undefined or empty string');
        }
        this.originalMessage = message;
        const splits = message.split(/\s+/);

        this.messageId = parseInt(splits[0], 10);
        this.packetId = parseInt(splits[1], 10);
        this.numberOfPackets = parseInt(splits[2], 10);
    }

    /**
     * Retrieves the original message
     * @method getText
     * @returns {string}
     */
    public getText(): string
    {
        return this.originalMessage;
    }
}
