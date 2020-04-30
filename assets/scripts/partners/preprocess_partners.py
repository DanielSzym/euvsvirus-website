# -------------------------------------------------------------------------------------------- #
# 
# IMPORTANT:
# Before using this script, please install the requirements via pip install requirements.txt
# Run script from project root folder
# 
# ABOUT:
# This script takes a list of university partners and creates html list elements out of it
# Takes a comma-separated csv file with columns <name> and <link>
# 
# HOW TO USE:
# After activating venv, start with: python3 assets/scripts/partners/preprocess_partners.py
# -------------------------------------------------------------------------------------------- #

import pandas as pd
import numpy as np
import os

# Select either of the three below
INPUT_TEMPLATE = ['universities', 'civil', 'public', 'businesses', 'media']
INPUT = INPUT_TEMPLATE[3]

# recreate all
for idx, val in enumerate(INPUT_TEMPLATE):
    INPUT = val

    df = pd.read_csv('./assets/scripts/partners/input/{}.csv'.format(INPUT))

    ADD_LINKS = False
    HTML = ''

    for index, row in df.iterrows():
        if ADD_LINKS:
            html_list_element = '<a '
            if df.at[index, 'link'] == '-':
                # no link provided, don't add href attribute
                html_list_element += 'target="_blank" rel="noreferrer">'
            else:
                html_list_element += 'href="'+str(df.at[index, 'link'])+'" target="_blank" rel="noreferrer">'
            html_list_element += '<li>'+str(df.at[index, 'name'])+'</li></a>'
        else:
            html_list_element = '<a><li>'+str(df.at[index, 'name'])+'</li></a>'
        HTML += html_list_element

    # add to file
    with open(os.path.join('./assets/scripts/partners/output', 'partners_{}.html'.format(INPUT)), 'w') as unis:
        unis.write(HTML)
