[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
# DOI-Puller
<h1 align="center">
<img width="256" height="256" alt="bitmap" src="https://github.com/user-attachments/assets/7e0400dc-e705-41f7-9076-052abc512d90" /><?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg
   width="256"
   height="256"
   viewBox="0 0 256 256"
   version="1.1"
   id="SVGRoot"
   xmlns="http://www.w3.org/2000/svg"
   xmlns:svg="http://www.w3.org/2000/svg">
  <defs
     id="defs706" />
  <g
     id="layer1"
     transform="translate(120,120)">
    <circle
       style="fill:#d4aa00;stroke-width:16.049"
       id="path1470"
       cx="8"
       cy="8"
       r="128" />
    <rect
       style="fill:#000000;stroke-width:13.9506"
       id="rect1638"
       width="36.799999"
       height="128"
       x="-10.666718"
       y="-88"
       rx="1.6" />
    <path
       style="fill:#000000"
       id="path1710"
       d="m 9.9918146,10.111869 c 0.051638,0.0889 -1.1501647,2.183037 -1.2013359,2.272207 -0.051171,0.08917 -1.2528811,2.183359 -1.3556904,2.183629 -0.1028092,2.69e-4 -1.3154829,-2.08759 -1.3671209,-2.176491 -0.051638,-0.0889 -1.2644042,-2.176707 -1.213233,-2.265877 0.051171,-0.08917 2.4656476,-0.09545 2.5684568,-0.09572 0.1028092,-2.69e-4 2.5172854,-0.0067 2.5689234,0.08225 z"
       transform="matrix(15.572102,0.0376256,-0.03509632,17.975574,-107.23839,-142.1426)" />
  </g>
</svg>

</h1>
A simple open-source Firefox extension that pulls DOI numbers and metadata from academic journal websites (<a href="https://www.jstor.org/">JSTOR</a>). Pulls from the page source for conveniently copying undisplayed DOI numbers from certain articles. 

# About
This extension has been tested on Firefox and JSTOR only as of May 2026. This extension only extracts the GA Data content from JSTOR pages with DOI number and additional metadata. May work on other websites that store DOI in gaData.content objects.

# Popup Options
You can customize the display of the extension popup, as well as the content display on refreshes, in the popup window. Settings are persistent.
<img width="608" height="418" alt="popup_1" src="https://github.com/user-attachments/assets/aad48e08-f75b-4590-9342-94eb5c230239" />

* **Toggle Extractor on Current Page**: Opens and closes the popup window
* **Enable Persistent Dragging**: When disabled, stays fixed on the top right of the page. When enabled, enables dragging and moving with the window scroll
* **Theme**: Light, Dark, and Soft Colors

# Content Display
The display window appears and closes when the Toggle Extractor on Current Page is pressed. Default shortcut is Ctrl+Shift+F.  
<img width="955" height="1026" alt="popup_2" src="https://github.com/user-attachments/assets/3659d71c-d907-4fce-9703-ae4fae41ff85" />

The data displayed is extracted under the gaData.content object from the source page.

<img width="1368" height="498" alt="source_page_jstor_example" src="https://github.com/user-attachments/assets/15d2615f-5ff7-4c83-bbb8-9c06112d830d" />


# Future Updates
* Additional website and object support / sci-hub compatibility
* Export function / auto copy DOI settings
* Persistent window across pages
* More customization

# Disclaimer
The source code for the DOI Puller is licensed under the GPL-3.0 License.
