export class Packet
{
    private readonly _messageId: number;
    private readonly _packetId: number;
    private readonly _numberOfPackets: number;

    private readonly _originalMessage: string;

    constructor(message: string)
    {
        this._originalMessage = message;
        const splits = message.split(/\s+/);

        this._messageId = parseInt(splits[0], 10);
        this._packetId = parseInt(splits[1], 10);
        this._numberOfPackets = parseInt(splits[2], 10);
    }

    public isFinalPacket(): boolean
    {
        return this._packetId === this._numberOfPackets - 1;
    }

    public get messageId(): number
    {
        return this._messageId;
    }

    public get packetId(): number
    {
        return this._packetId;
    }

    public get numberOfPackets(): number
    {
        return this._numberOfPackets;
    }

    public getText(): string
    {
        return this._originalMessage;
    }
}