#!/usr/bin/python

import argparse
import time
import serial
import urllib.request
import json


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
                self.send_data(data)

    def parse(self, line):
        """
        :param line: string
        """
        data = line.split(":")
        if len(data) == 3:
            return {
                "device_uuid": data[0],
                "humidity": float(data[1]),
                "temperature": float(data[2])
            }
        else:
            return None

    def send_data(self, data):
        try:
            request = urllib.request.Request(self.url)
            request.add_header('Content-Type', 'application/json; charset=utf-8')
            json_data = json.dumps(data)
            json_data_as_bytes = json_data.encode('utf-8')
            request.add_header('Content-Length', len(json_data_as_bytes))
            urllib.request.urlopen(request, json_data_as_bytes)
        except Exception as exception:
            print("Error occurred:", exception.args)

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Temperature data receiver.')
    parser.add_argument('--url', help='API url to save data.')

    args = parser.parse_args()
    receiver = Receiver(args.url)
    receiver.start()
