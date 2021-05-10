class Calculate {
    constructor(lat, long, m) {
        this.lat = lat;
        this.long = long;
        this.masshtab = m;
    }

    zone() {

        let m = parseInt((parseInt(this.long) / 6) + 31);
        let n = parseInt((parseInt(this.lat) / 4) + 1);
        let alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'X', 'Y', 'Z']
        let letter = "";
        for (let i = 0; i < alphabet.length; i++) {
            if (i == n - 1) {
                letter = alphabet[i]
                break;
            }
        }
        return `${letter} - ${m}`
    }

    hundred() {
        let degree_lat = parseInt(this.lat);
        let degree_long = parseInt(this.long);
        let long = parseInt(this.long);
        let dlat = 4;
        let dlong = 6;
        let lat1, lat2, long1, long2;

        for (let i = 0; i < 90; i += dlat) {
            if (degree_lat > i && degree_lat <= i + dlat) {
                lat1 = i;
                lat2 = i + dlat;
            }
        }

        for (let j = 0; j < 180; j += dlong) {
            if (degree_long > j && degree_long <= j + dlong) {
                long1 = j;
                long2 = j + dlong;
            }
        }

        let l = parseInt((this.lat - lat1) / (20 / 60)) + 1;
        let l1 = parseInt((this.long - long1) / (30 / 60)) + 1;

        let num = (12 - l) * 12 + l1;
        return {
            masshtab: "1: 100 000",
            nomenklatura: this.zone() + " - " + num,
            latitude: {
                start: lat1 + ((l - 1) * 20 / 60),
                end: lat1 + (l * 20 / 60),
            },
            longitude: {
                start: long1 + ((l1 - 1) * 30 / 60),
                end: long1 + (l1 * 30 / 60)
            }
        }

    }

    fifty() {
        let num, latStart, longStart;
        let lat1 = this.hundred().latitude.start;
        let lat2 = this.hundred().latitude.end;
        let lat3 = (lat1 + lat2) / 2;
        let long1 = this.hundred().longitude.start;
        let long2 = this.hundred().longitude.end;
        let long3 = (long1 + long2) / 2;

        if (this.lat > lat3 && this.lat < lat2) {
            latStart = lat3
            if (this.long > long3 && this.long < long2) {
                num = "Б";
                longStart = long3
            } else {
                num = "А";
                longStart = long1
            }
        } else {
            latStart = lat1

            if (this.long > long3 && this.long < long2) {
                longStart = long3
                num = "Г";
            } else {
                longStart = long1
                num = "В";
            }
        }

        return {
            masshtab: "1: 50 000",
            nomenklatura: this.hundred().nomenklatura + " - " + num,
            latitude: {
                start: latStart,
                end: latStart + (10 / 60)
            },
            longitude: {
                start: longStart,
                end: longStart + (15 / 60)
            }
        }

    }
    tventyFive() {
        let num, latStart, longStart;
        let lat1 = this.fifty().latitude.start;
        let lat2 = this.fifty().latitude.end;
        let lat3 = (lat1 + lat2) / 2;
        let long1 = this.fifty().longitude.start;
        let long2 = this.fifty().longitude.end;
        let long3 = (long1 + long2) / 2;

        if (this.lat > lat3 && this.lat < lat2) {
            latStart = lat3
            if (this.long > long3 && this.long < long2) {
                num = "б";
                longStart = long3
            } else {
                num = "а";
                longStart = long1
            }
        } else {
            latStart = lat1

            if (this.long > long3 && this.long < long2) {
                longStart = long3
                num = "г";
            } else {
                longStart = long1
                num = "в";
            }
        }

        return {
            masshtab: "1: 25 000",
            nomenklatura: this.fifty().nomenklatura + " - " + num,
            latitude: {
                start: latStart,
                end: latStart + (5 / 60)
            },
            longitude: {
                start: longStart,
                end: longStart + (7.5 / 60)
            }
        }
    }

    teen() {
        let num, latStart, longStart;
        let lat1 = this.tventyFive().latitude.start;
        let lat2 = this.tventyFive().latitude.end;
        let lat3 = (lat1 + lat2) / 2;
        let long1 = this.tventyFive().longitude.start;
        let long2 = this.tventyFive().longitude.end;
        let long3 = (long1 + long2) / 2;

        if (this.lat > lat3 && this.lat < lat2) {
            latStart = lat3
            if (this.long > long3 && this.long < long2) {
                num = "2";
                longStart = long3
            } else {
                num = "1";
                longStart = long1
            }
        } else {
            latStart = lat1

            if (this.long > long3 && this.long < long2) {
                longStart = long3
                num = "4";
            } else {
                longStart = long1
                num = "3";
            }
        }

        return {
            masshtab: "1: 25 000",
            nomenklatura: this.tventyFive().nomenklatura + " - " + num,
            latitude: {
                start: latStart,
                end: latStart + (2.5 / 60)
            },
            longitude: {
                start: longStart,
                end: longStart + (3.75 / 60)
            }
        }
    }
    five() {
        let num, latStart, longStart;
        let lat1 = this.hundred().latitude.start;
        let lat2 = this.hundred().latitude.end;
        let long1 = this.hundred().longitude.start;
        let long2 = this.hundred().longitude.end;
        let dlat = (1 / 60) + (15 / 3600);
        let dlong = (1 / 60) + (52.5 / 3600);
        let column, row, lat11;

        for (let i = lat1; i < lat2; i += dlat) {
            if (this.lat > i && this.lat < i + dlat) {
                latStart = i;
            }
        }

        for (let j = long1; j < long2; j += dlong) {
            if (this.long > j && this.long < j + dlong) {
                longStart = j;
            }
        }
        row = parseInt((latStart - lat1) / dlat);
        column = parseInt((longStart - long1) / dlong) + 1;

        num = 241- (row * 16) + column

        return {
            masshtab: "5 000",
            nomenklatura: this.hundred().nomenklatura + "(" + num + ")",
            latitude: {
                start: latStart,
                end: latStart + dlat
            },
            longitude: {
                start: longStart,
                end: longStart + dlong
            }
        }
    }
}


module.exports = Calculate