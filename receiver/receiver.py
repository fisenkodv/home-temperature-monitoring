#!/usr/bin/python

import argparse
import time
import serial


class Receiver(object):
    def __init__(self, url):
        self.url = url

    def start(self):
        serialConfig = serial.Serial(
            port='/dev/ttyUSB0',
            baudrate=9600,
            parity=serial.PARITY_NONE,
            stopbits=serial.STOPBITS_ONE,
            bytesize=serial.EIGHTBITS,
            timeout=1
        )
        while True:
            line = str(serialConfig.readline())[2:-5]
            data = self.parse(line)
            if data != None:
                print(data)

    def parse(self, line):
        """
        :param line: string
        """
        data = line.split(":")
        if len(data) == 5:
            return {
                "device": int(data[0]),
                "humidity": float(data[1]),
                "celsius": float(data[2]),
                "fahrenheit": float(data[3]),
                "heatIndex": float(data[4])
            }
        else:
            return None


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Temperature data receiver.')
    parser.add_argument('--url', help='API url to save data.')

    args = parser.parse_args()
    receiver = Receiver(args.url)
    receiver.start()
