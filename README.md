Created by Ronald Blanco.

mailto:pnald.blanco@gmail.com<br>
https://github.com/ronaldblanco<br>
https://www.linkedin.com/in/ronald-blanco-carrazana-5b506268/<br>
http://codepen.io/ronaldblanco/#<br>
https://www.freecodecamp.com/ronaldblanco<br>

API Timestamp Microservice

User stories:

1) I can pass a string as a parameter, and it will check to see whether that string 
    contains either a unix timestamp or a natural language date (example: Jan 1, 2016)
2) If it does, it returns both the Unix timestamp and the natural language form of that date.
3) If it does not contain a date or Unix timestamp, it returns null for those properties.

Example usage:

https://.../Dec%2015,%202015 OR /December%2015,%202015 OR /Dec 15, 2015
https://.../145013760000
        
Example output:
            
    {
        "unix": 145013760000,
        "natural": "Tue Dec 15, 2015"
    }