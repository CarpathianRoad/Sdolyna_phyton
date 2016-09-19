#!/usr/bin/env python
# -*- coding: utf-8 -*-
import os, sys

path = '/app'
if path not in sys.path:
    sys.path.append(path)
from dolyna import app

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80, debug=True)
