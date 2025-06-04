#  ISS Finder 
___

## Description 

ISS Finder is a minimalistic React App that helps you to locate the International Space Station.
> My daughter asked me whether a blinking star she sees, is ISS. We have an app at home!  
> Just a perfect chance to try out new libraries, improve coding skills with a bunch of simple math gym problems for fun.


___
## Features
 - Shows ISS on a map
 - Helps to find ISS in the sky
 - Calculates visibility score
___
## Get Started

### Installation

```bash
npm install
````

### Dev Mode
```bash
npm run dev
````

Create Certificates For Mobile Development certificates:
```shell
mkdir certs
cd certs
brew install mkcert
mkcert -install
mkcert iss-finder localhost 192.168.1.11
```
___
##    ToDo:
- [ ] Visibility
  - [x] Daytime: service, tests
  - [ ] Visibility: service, tests
- [ ] Design
- [ ] Tests for Services
  - [x] Daytime
  - [ ] Device Location
  - [ ] ISS Location
- [ ] Add weather
- [ ] Add Logger

___
## Known Bugs:
- [ ] Halt fetching location in case of no connection. Add something like max retries and then change the interval

___
## Useful Links:

- [TimeZonesMap](https://en.wikipedia.org/wiki/Coordinated_Universal_Time#/media/File:World_Time_Zones_Map.png)

