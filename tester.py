from cgitb import enable
enable()

from cgi import FieldStorage
from html import escape



check1 = "Nothing"
check2 = "Nothing"

thePage = """
        <p>
            <label for="checkBox1">First checkbox: </label>
            <input type="text" name="checkBox1" id="checkBox1" value="" />
            <label for="checkBox2">Second checkbox checkbox: </label>
            <input type="text" name="checkBox2" id="checkBox2" value="" />
        </p>"""

form_data = FieldStorage()
if len(form_data) != 0:
    check1 = escape(form_data.getfirst('checkBox1', '').strip())
    check2 = escape(form_data.getfirst('checkBox2', '').strip())



print('Content-Type: text/html')
print()
print("""<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <link rel="icon" type="image/png" href="favicon.png">
        <title>Big Guy</title>
    </head>
    <body>)
        %s
        <br/>
        <p>
            The input for the first chckbox we have for you is %s.
            <br/>
            The input for the second chckbox we have for you is %s.
        </p>
    </body>
</html>""" % (thePage, check1, check2))
