import tkinter as tk
from tkinter import filedialog
import json
import os
from PIL import Image, ImageTk
import urllib.parse

# Create a window
root = tk.Tk()
root.withdraw()

# Ask user for type of output and acquire path to cnexus backup
programtype = input("What type of output should we create? (local, remote, pi)")
folder_path = filedialog.askdirectory()
books = folder_path + "/Books/"
metadata = folder_path + "/Metadata/"
extracted = folder_path + "/Extracted/"
root.title("ComicNexus")

# Create files to load twee into 
directorytw = ':: directory\n[[tags]]\n[[collection]]\n[[artists]]\n[[special]]'
tagstw = ''
collectiontw = ':: collection\n'
artiststw = ''
comicstw = ''
specialtw = ':: special\n'

# Create empty arrays and dicts for data
tags = []
tagdict = {}

artists = []
artistdict = {}

special = [1, 312, 683, 725, 763, 1944, 2311, 3627, 4107, 4419, 4754, 4370, 4373, 4808, 5013, 5014, 5297, 5384, 5483, 5546, 5704, 5766, 5861, 5932, 6228, 6230, 6245, 6561, 6600, 6694, 6704, 6927, 6958, 7087, 7101, 7122, 7278, 7315, 7326, 7393, 7439, 7446, 7457, 7464, 7472, 7671, 7676, 7874, 7890, 7907, 7976, 8004, 8010, 8013, 8025, 8090, 8184, 8207, 8239, 8295, 8564, 8606, 8701, 8736, 8746]

metadict = {}

# Extract metadata of each comic and compile by tag
page = "001"
for comic in os.listdir(metadata):
    index = comic.split(" ")[0] # get index of comic
    
    # Try to acquire metadata file of the comic, trying png, jpeg, and jpg filetypes
    try:
        json_location = metadata + comic + "/comicnexus_" + index + "_" + page + ".png" + ".json"
        meta_file = open(json_location, "r", encoding='utf8')
    except:
        try:
            json_location = metadata + comic + "/comicnexus_" + index + "_" + page + ".jpeg" + ".json"
            meta_file = open(json_location, "r", encoding='utf8')
        except:
            json_location = metadata + comic + "/comicnexus_" + index + "_" + page + ".jpg" + ".json"
            meta_file = open(json_location, "r", encoding='utf8')
    metadict[comic] = json.load(meta_file)

    # Add artist to dictionary of artists if not present, otherwise add comic to the artist
    artist =  metadict[comic]["artist"]
    if artist not in artists:
        artists.append(artist)
    if artist in artistdict:
        artistdict[artist].append(comic)
    else:
        artistdict[artist] = [comic]

    # Add tag to dictionary of tags if not present, otherwise add comic to the tag
    for tag in metadict[comic]["tags"]:
        if tag not in tags:
            tags.append(tag)
        if tag in tagdict:
            tagdict[tag].append(comic)
        else:
            tagdict[tag] = [comic]
    
    # Add comic with tags to collection 
    collectiontw += "[[" + comic + "]] <span style=\"font-weight: bold;\">[[" + metadict[comic]["artist"] + "]]</span> ["
    for tag in metadict[comic]["tags"]:
        collectiontw += "[[" + tag + "]] "
    collectiontw += "]\n"
    
    if int(index) in special:
        # Add special comic with tags to collection 
        specialtw += "[[" + comic + "]] <span style=\"font-weight: bold;\">[[" + metadict[comic]["artist"] + "]]</span> ["
        for tag in metadict[comic]["tags"]:
            specialtw += "[[" + tag + "]] "
        specialtw += "]\n"

    # Create page for the comic with all of the image files and return link
    comicstw += ":: " + comic + "\n"
    for imgfile in os.listdir(extracted + comic):
        if (programtype == "pi"):
            comicstw += "<img src=\"" + "/Stories/C/Extracted/" + urllib.parse.quote(comic) + "/" + imgfile + "\" style=\"max-width: 80vw\">\n"
        elif (programtype == "local"):
            comicstw += "<img src=\"" + "file://S:/GAS PEDAL/ComicNexus/Extracted/" + urllib.parse.quote(comic) + "/" + imgfile + "\" style=\"max-width: 80vw\">\n"
        elif (programtype == "remote"):
            comicstw += "<img src=\"" + "http://45.30.150.140/Stories/C/Extracted/" + urllib.parse.quote(comic) + "/" + imgfile + "\" style=\"max-height: 80vh; max-width: 80vw\">\n"
    comicstw += "<<return \"Return\">>\n\n"

# Add link back to directory in collection and special
collectiontw += "<<link [[directory]]>><</link>>\n\n" 
specialtw += "<<link [[directory]]>><</link>>\n\n" 

# Create tag page for each tagged comic
for tag in tags:
    tagstw += ":: " + tag + "\n"
    for comic in tagdict[tag]:
        tagstw += "[[" + comic + "]] <span style=\"font-weight: bold;\">[[" + metadict[comic]["artist"] + "]]</span> ["
        for tag in metadict[comic]["tags"]:
            tagstw += "[[" + tag + "]] "
        tagstw += "]\n"
    tagstw += "<<link [[tags]]>><</link>>\n\n"

# Create tags directory page
tagstw += ":: tags\n\n"
for tag in tags:
    tagstw += "[[" + tag + "]]\n"
tagstw += "<<link [[directory]]>><</link>>\n\n"

# Create artist page for each artist's comic
for artist in artists:
    artiststw += ":: " + artist + "\n"
    for comic in artistdict[artist]:
        artiststw += "[[" + comic + "]] <span style=\"font-weight: bold;\">[[" + metadict[comic]["artist"] + "]]</span> ["
        for tag in metadict[comic]["tags"]:
            artiststw += "[[" + tag + "]] "
        artiststw += "]\n"
    artiststw += "<<link [[artists]]>><</link>>\n\n"

# Create artist directory page
artiststw += ":: artists\n\n"
for artist in artists:
    artiststw += "[[" + artist + "]]\n"
artiststw += "<<link [[directory]]>><</link>>\n\n"

f = open(os.path.abspath(os.getcwd()) + "/tweego/Inputs/Tweego Source/collection.tw", 'w', encoding='utf8')
f.write(collectiontw)
f.close()
f = open(os.path.abspath(os.getcwd()) + "/tweego/Inputs/Tweego Source/comics.tw", 'w', encoding='utf8')
f.write(comicstw)
f.close()
f = open(os.path.abspath(os.getcwd()) + "/tweego/Inputs/Tweego Source/tags.tw", 'w', encoding='utf8')
f.write(tagstw)
f.close()
f = open(os.path.abspath(os.getcwd()) + "/tweego/Inputs/Tweego Source/directory.tw", 'w', encoding='utf8')
f.write(directorytw)
f.close()
f = open(os.path.abspath(os.getcwd()) + "/tweego/Inputs/Tweego Source/artists.tw", 'w', encoding='utf8')
f.write(artiststw)
f.close()
f = open(os.path.abspath(os.getcwd()) + "/tweego/Inputs/Tweego Source/special.tw", 'w', encoding='utf8')
f.write(specialtw)
f.close()
