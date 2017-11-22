import { Packet } from './packet';

/**
 * Represents a list of packets, from which a complete message can be retrieved
 * @class
 */
export class PacketList
{
    /**
     * The total number of packets that should be in the list
     * @property {number} totalLengthOfMessage
     * @private
     */
    private totalLengthOfMessage: number;

    /**
     * The unique id that each packet in the list must share
     * @property {number} packetId
     * @private
     */
    private id: number;

    /**
     * The internal array of packets
     * @property {Array<Packet>} packets
     * @private
     */
    private packets: Array<Packet> = [];

    /**
     * Class must be instantiated with a single packet.
     *
     * Other packets can be added using the `addPacket()` method
     * @param {Packet} packet Initial packet for the list
     */
    constructor(packet: Packet)
    {
        this.id = packet.messageId;
        this.packets.push(packet);

        this.totalLengthOfMessage = packet.numberOfPackets;
    }

    /**
     * Adds a packet to the list. Will throw if the packet does not belong to the list
     * @method
     * @param {Packet} packet The packet to add to the list
     */
    public addPacket(packet: Packet): void
    {
        const id = packet.messageId;
        if (id !== this.id) {
            throw new Error(`Attempted to add packet with ID of ${id} to a list with ID of ${this.id}`);
        }

        this.packets.push(packet);
    }

    /**
     * Returns a boolean indicating whether or not the packet list is complete
     * @method
     * @returns {boolean}
     */
    public isComplete(): boolean
    {
        return this.packets.length === this.totalLengthOfMessage;
    }

    /**
     * Builds up and returns complete message, in the correct order
     * @method
     * @returns {string}
     */
    public getMessage(): string
    {
        this.sortPackets();

        return this.packets.reduce((message, packet) =>
        {
            const packetText = packet.getText();

            message += `${packetText}\n`;

            return message;
        }, '');
    }

    /**
     * Sorts the packets using the `packetId` on each packet in the list
     * @private
     */
    private sortPackets(): void
    {
        this.packets = this.packets.sort((a, b) =>
        {
            // We assume that no packets will share a packetId
            return a.packetId < b.packetId ? -1 : 1;
        });
    }
}
