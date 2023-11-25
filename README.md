# CSCE-A311-Project
### This chrome extension was developed by Ermelina Gonzales and Alfred Soriano.

**To install the extension using GitHub:**  

1. From the [alfredsoriano/CSCE-A311-Project](https://github.com/alfredsoriano/CSCE-A311-Project) repository, in the "<> Code" section, press the green "<> Code" button and download the zip file.

2. After unzipping the downloaded file, go to chrome://extensions, then look to the upper right and press the "developer mode" switch, turning it from gray to blue.

3. Press the "Load unpacked" button, then select and open the CSCE-A311-Project folder. (NOT the CSCE-A311-Project-main folder!) There should be a new extension loaded into the chrome://extensions web page with a pixelated star icon, with the extenstion title.

4. Look to the top right, and press the puzzle piece icon (extensions icon), and press the "CSCE A311 Project" extension. It should have a star icon.

5. (OPTIONAL) Press the pin button to the right of the extension to pin the extension to your search bar for easy access. Enjoy!

**To use the extension:**
- The starting mode is ENCODE MODE.
- There are four buttons: "Get URL", "Copy", "Change Mode", and "Encode/Decode"
- The "Get URL" button sets the input textarea to the current URL.
- The "Copy" button will either:
    - copy the three outputs in encode mode (JSON Map, JSON Array, and Encoded Text) to the user's clipboard, which can then be pasted in a separate text file.
    - copy the decoded string in decode mode to the user's clipboard, which can then be pasted in a separate text file.
- The "Change Mode" button changes the extension to encode or decode mode.
- The "Encode/Decode" button swaps with each mode, and will either:
    - encode a string using huffman encoding, and output a JSON Array, JSON Map, and the string as an encoded binary string of 0's and 1's.
    - decode a JSON Array and JSON Map, then output the decoded message.

**To ENCODE (ENCODE MODE):**  

    1. Type or paste desired text to encode in the text area box.  

    2. Press the "Encode" Button.  

    3. A JSON formatted array, JSON formatted object, and the encoded binary message will be outputted to the user below.  

    4. Save the JSON Array and JSON Map into a separate text file, for later decoding. Can use the "Copy" button to easily copy all three text boxes.

**To DECODE (DECODE MODE):**
NOTE: The "Get URL" button will be disabled.  

    1. Take the saved JSON Array and JSON Map and paste them into their respective text area boxes above the buttons.  

    2. Press the "Decode" button.  

    3. The original, decoded string will be displayed below the buttons. Can use the "Copy" button to copy the decoded message.  
