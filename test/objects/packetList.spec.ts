import { Packet } from '../../src/objects/packet';
import { PacketList } from '../../src/objects/packetList';

describe('PacketList', () =>
{
    describe('new PacketList()', () =>
    {
        let packet: Packet;
        beforeEach(() =>
        {
            packet = new Packet('2997    0   19  Did you ever hear the tragedy of Darth');
        });

        test('When given a packet, it should not throw', () =>
        {
            expect(() =>
            {
                const x = new PacketList(packet);
            }).not.toThrow();
        });
    });

    describe('PacketList.addPacket()', () =>
    {
        let packetList: PacketList;

        beforeEach(() =>
        {
            const packet = new Packet('2997    0   19  Did you ever hear the tragedy of Darth');
            packetList = new PacketList(packet);
        });

        test('When given a packet with a different ID, it should throw', () =>
        {
            const packet = new Packet('1938    0   17  You read the Bible, Brett? Well there\'s');
            expect(() =>
            {
                packetList.addPacket(packet);
            }).toThrow('Attempted to add packet with ID of 1938 to a list with ID of 2997');
        });

        test('When given a packet with a matching ID, it should not throw', () =>
        {
            const packet = new Packet('2997    2   19  story the Jedi would tell you. It\'s a Sith');
            expect(() =>
            {
                packetList.addPacket(packet);
            }).not.toThrow();
        });
    });

    describe('PacketList.isComplete()', () =>
    {
        let packetList: PacketList;

        beforeEach(() =>
        {
            const packet = new Packet('2997    0   2  Did you ever hear the tragedy of Darth');
            packetList = new PacketList(packet);
        });

        test('When the list is incomplete, it should return false', () =>
        {
            expect(packetList.isComplete()).toEqual(false);
        });

        test('When the list is complete, it should return true', () =>
        {
            // Add another packet to complete the list
            const packet = new Packet('2997    1   2  ');
            packetList.addPacket(packet);

            // Now assert
            expect(packetList.isComplete()).toEqual(true);
        });
    });

    describe('PacketList.getMessage()', () =>
    {
        let packetList: PacketList;

        // Set up a complete packetlist
        beforeEach(() =>
        {
            const messages = [
                '2997    9   19  Force is a pathway to many abilities some',
                '2997    13  19  he did. Unfortunately, he taught his',
                '2997    0   19  Did you ever hear the tragedy of Darth',
                '2997    1   19  Plagueis the Wise? I thought not. It\'s not a',
                '2997    14  19  apprentice everything he knew, then his',
                '2997    10  19  consider to be unnatural. He became so',
                '2997    5   19  Force to influence the midichlorians to',
                '2997    3   19  legend. Darth Plagueis was a Dark Lord of the',
                '2997    8   19  cared about from dying. The dark side of the',
                '2997    18  19',
                '2997    16  19  he could have others from death, but not',
                '2997    7   19  dark side that he could even keep the once he',
                '2997    17  19  himself.',
                '2997    6   19  create life...He had such a knowledge of the',
                '2997    12  19  losing his power. Which eventually, of course,',
                '2997    2   19  story the Jedi would tell you. It\'s a Sith',
                '2997    4   19  Sith so powerful and so wise, he could use the',
                '2997    11  19  powerful...The only thing he was afraid of was',
                '2997    15  19  apprentice killed him in his sleep. Ironic,',
            ];

            messages.forEach((message, index) =>
            {
                const packet = new Packet(message);

                if (index === 0)
                {
                    packetList = new PacketList(packet);
                }
                else
                {
                    packetList.addPacket(packet);
                }
            });
        });

        test('It should return the message in order', () =>
        {
            expect(packetList.getMessage()).toEqual(`2997    0   19  Did you ever hear the tragedy of Darth
2997    1   19  Plagueis the Wise? I thought not. It's not a
2997    2   19  story the Jedi would tell you. It's a Sith
2997    3   19  legend. Darth Plagueis was a Dark Lord of the
2997    4   19  Sith so powerful and so wise, he could use the
2997    5   19  Force to influence the midichlorians to
2997    6   19  create life...He had such a knowledge of the
2997    7   19  dark side that he could even keep the once he
2997    8   19  cared about from dying. The dark side of the
2997    9   19  Force is a pathway to many abilities some
2997    10  19  consider to be unnatural. He became so
2997    11  19  powerful...The only thing he was afraid of was
2997    12  19  losing his power. Which eventually, of course,
2997    13  19  he did. Unfortunately, he taught his
2997    14  19  apprentice everything he knew, then his
2997    15  19  apprentice killed him in his sleep. Ironic,
2997    16  19  he could have others from death, but not
2997    17  19  himself.
2997    18  19\n`);
        });
    });
});
