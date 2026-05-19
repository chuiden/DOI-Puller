[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
# DOI-Puller
A simple Firefox extension that pulls DOI numbers and metadata from academic journal websites (JSTOR). Pulls straight from the page source for conveniently getting undisplayed DOI numbers from certain articles. 

# About
This extension has been tested on Firefox and JSTOR only as of May 2026. Extracts the GA Data content from JSTOR page with DOI number and additional metadata. May work on other websites that store DOI in gaData.content objects.

# Popup Options
<img width="648" height="447" alt="popup_1" src="https://github.com/user-attachments/assets/9baf4154-5a97-4fd1-a2f1-b8ac75be5472" />

* **Toggle Extractor on Current Page**: Opens and closes the popup window
* **Enable Persistent Dragging**: When disabled, stays fixed on the top right of the screen. When enabled, enables dragging and moving with the window scroll
* **Theme**: Light, Dark, and Soft Colors

# Content Display
The display window appears and closes when the Toggle Extractor on Current Page is pressed. Default shortcut is Cntrl+Shift+F.  

<img width="951" height="1342" alt="popup_2" src="https://github.com/user-attachments/assets/d47ce2c6-21a8-4cf8-995d-d0aa980ba5a9" />

The data is extracted simply under the gaData.content object from the source page.

<img width="2404" height="555" alt="source_page_jstor_example" src="https://github.com/user-attachments/assets/d0a8d94b-9a80-4816-871b-f66e91328e17" />

# Future Updates
* Additional website and object support / sci-hub compatiability
* Export function / auto copy DOI settings
* Persistent window across pages
* More customization

# Disclaimer
The source code for the DOI Puller is licensed under the GPL-3.0 License.
