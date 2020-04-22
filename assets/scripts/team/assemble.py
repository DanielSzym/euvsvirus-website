# -------------------------------------------------------------------------------------------- #
# 
# IMPORTANT:
# Before using this script, please install the requirements via pip install requirements.txt
# Run script from project root folder
# 
# ABOUT:
# This script takes a list of all team members and creates & outputs the correct html format for the website
# Takes a comma-separated csv file with columns <name>, <team>, <position> and <badge>
# 
# -------------------------------------------------------------------------------------------- #

import pandas as pd
import numpy as np
import os

INPUT = 'team'
df = pd.read_csv('./assets/scripts/team/{}.csv'.format(INPUT))

grouped = df.groupby('team')
HTML_FULL = ''


# assemble menu
HTML_MENU = '<div class="team-menu"><ul class="team-menu-list">'
idx = 0
for name, group in grouped:
    HTML_MENU += '<a href="#'
    # anchor
    HTML_MENU += str(idx)
    HTML_MENU += '"><h4><u>'
    # menu name
    HTML_MENU += name
    HTML_MENU += '</u></h4></a>'
    idx += 1
HTML_MENU += '</ul></div>'
HTML_FULL += HTML_MENU


# loop over grouped teams
idx = 0
for name, group in grouped:
    HTML_FULL += '<div id="'
    HTML_FULL += str(idx)
    HTML_FULL += '" class="anchor"></div>'

    HTML_FULL += '<h3 class="mt-5">'+name+'</h3>'
    HTML_FULL += '<div class="badges-wrapper">'

    # loop over people
    html_single_badges = ''
    for index, row in group.iterrows():
        html_single_badges += '<div class="team-member">'
        # placeholder:
        # html_single_badges += '<img src="./../assets/img/team/badge.png">'
        html_single_badges += row['badge']
        html_single_badges += '<p class="team-member-position">'
        html_single_badges += row['position']
        html_single_badges += '</p></div>'

        HTML_FULL += html_single_badges
        html_single_badges = ''

    HTML_FULL += ('<div style="width: 250px; height: 2px;"></div>')*2
    HTML_FULL += '</div>'
    idx += 1



# create html file
with open(os.path.join('./assets/scripts/team', 'team.html'), 'w') as unis:
    unis.write(HTML_FULL)