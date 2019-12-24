This is a basic bot for single team use that can be used as a template to build other, more complex bots.

Refer to this Medium article for more information:

Before following the below instructions, use yarn or npm to install all dependencies

Run:
lt --port 8765 --subdomain YOURSUBDOMAIN -h http://localtunnel.me --local-https false

*Note, the "-h http://localtunnel.me --local-https false" part above is needed as localtunnel's certificate has expired and has not been renewed yet (https://github.com/localtunnel/localtunnel/issues/332) once it is renewed this part can be removed

to start the local tunnel (in a seperate terminal window).

run the bot with with:
    node .

Test:

npm run test
