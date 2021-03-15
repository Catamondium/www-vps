# www-vps readme
This is the source for my personal virtual private server. Bits and pieces may be useful for other projects, but this is built with a very particular goal.
# package.json scripts
All scripts operate after npm install.

For general testing, dev, test and start should suffice and automatically download their dependencies.

* dev: live testing in nodemon.
* start: run the server w/o compilation.
* test: mocha+chai unit testing

The following scripts are primarily intended to be called by Docker, outside of docker they aren't required to get a server running.

* 
* build: compile typescript
* prod: run production server, predicated on having run build

<!--stackedit_data:
eyJoaXN0b3J5IjpbLTEwNDEyMDk5NzYsMjE5Njc4MjQyLC0xNz
k0NjU2Nzg4LC0yMDAxODA0MzQ2XX0=
-->