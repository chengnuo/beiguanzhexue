#!/usr/bin/python
# -*- coding: utf-8 -*-


import json
import argparse
import logging
import os
import os.path
from urllib import request, parse

log = logging.getLogger(__name__)


# 将HAR文件解析成对象
def json_decode(file):
    f = open(file)
    json_obj = json.load(f)
    f.close()
    return json_obj


#    获得参数
def parse_arg():
    parser = argparse.ArgumentParser(description='download resource from HAR')
    parser.add_argument(dest="filename",
                        metavar="filename",
                        help="a file contain HAR")
    arg = parser.parse_args()
    return arg


def write_file(data, file):
        with open(file, 'wb') as f:
            f.write(data)


def get_resource(entries):
    for entry in entries:
        r = entry['request']
        url = r['url']
        file = create_file_from(url)
        try:
            u = request.urlopen(
                url
            )
            resp_body = u.read()
            write_file(resp_body, file)
            # print(resp_body)
        except Exception as e:
            print(url, e)


def create_file_from(url):
    components = parse.urlparse(url)
    npath = components.netloc+components.path
    cwd = os.path.abspath('.')
    file = os.path.join(cwd, 'www', npath)
    if os.path.isdir(file):
        file = os.path.join(file, 'index.html')
    dirname = os.path.dirname(file)
    try:
        os.makedirs(dirname)
    except OSError:
        pass
    return file

if __name__ == "__main__":
    args = parse_arg()
    filename = args.filename
    obj = json_decode(filename)
    get_resource(obj['log']['entries'])