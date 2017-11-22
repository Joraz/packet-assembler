import { Packet } from '../../src/objects/packet';

describe('Packet', () =>
{
    describe('new Packet()', () =>
    {
        test('When given an undefined value, it should throw an error', () =>
        {
            expect(() =>
            {
                const x = new Packet(undefined);
            }).toThrow('Cannot construct packet from undefined or empty string');
        });

        test('When given an empty string, it should throw an error', () =>
        {
            expect(() =>
            {
                const x = new Packet('            ');
            }).toThrow('Cannot construct packet from undefined or empty string');
        });

        test('When given a correct formatted string, it should set the properties correctly', () =>
        {
            const packet = new Packet('2997    0   19  Did you ever hear the tragedy of Darth');
            expect(packet).toBeDefined();
            expect(packet.messageId).toEqual(2997);
            expect(packet.packetId).toEqual(0);
            expect(packet.numberOfPackets).toEqual(19);
        });
    });

    describe('Packet.getText()', () =>
    {
        let packet: Packet;

        beforeEach(() =>
        {
            packet = new Packet('2997    0   19  Did you ever hear the tragedy of Darth');
        });

        test('It should return the original string that was passed in the constructor', () =>
        {
            expect(packet.getText()).toEqual('2997    0   19  Did you ever hear the tragedy of Darth');
        });
    });
});
