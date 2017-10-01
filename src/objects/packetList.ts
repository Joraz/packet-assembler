import { Packet } from './packet';

export class PacketList
{
    private _messageId: number;
    private _totalLengthOfMessage: number;
    private _packets: Array<Packet> = [];

    constructor(packet: Packet)
    {
        this._packets.push(packet);

        this._messageId = packet.messageId;
        this._totalLengthOfMessage = packet.numberOfPackets;
    }

    public addPacket(packet: Packet): void
    {
        this._packets.push(packet);
    }

    public isComplete(): boolean
    {
        return this._packets.length === this._totalLengthOfMessage;
    }

    public getCompletePacket(): string
    {
        this.sortPackets();

        return this._packets.reduce((message, packet) => {
            const packetText = packet.getText();

            message += `${packetText}\n`;

            return message;
        }, '');
    }

    private sortPackets(): void
    {
        this._packets = this._packets.sort((a, b) =>
        {
            return a.packetId < b.packetId ? -1 : 1;
        });
    }
}