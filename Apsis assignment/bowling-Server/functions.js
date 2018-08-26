// game algorithm

// function for every score step
const getFrameScore = function (frames, index) {
    if (Object.keys(frames[index]).length === 0) {
        return -1
    }

    if (index === 9) {
        if (frames[9].firstRoll === 10) {
            if (frames[9].secondRoll === 10 && frames[9].thirdRoll === 10) {
                return 30;
            } else {
                return 10 + frames[9].secondRoll;
            }
        } else if ((frames[9].firstRoll + frames[9].secondRoll) === 10) {
            return 10 + frames[9].thirdRoll;
        } else {
            return frames[9].firstRoll + frames[9].secondRoll;
        }
    }
    if (index === 8) {
        if (frames[8].firstRoll === 10) {
            if (frames[9].firstRoll === 10) {
                if (frames[9].secondRoll === 10) {
                    return 30;
                } else {
                    return 20 + frames[9].secondRoll + frames[9].thirdRoll;
                }
            } else if (Object.keys(frames[9]).length === 0) {
                return -1;
            } else {
                return 10 + frames[9].firstRoll + frames[9].secondRoll;
            }
        } else if ((frames[8].firstRoll + frames[8].secondRoll) === 10) {
            if (Object.keys(frames[9]).length === 0) {
                return -1;
            } else {
                return 10 + frames[9].firstRoll;
            }
        } else {
            return frames[8].firstRoll + frames[8].secondRoll;
        }
    }
    if (frames[index].firstRoll === 10) {
        if (Object.keys(frames[index + 1]).length === 0) {
            return -1;
        } else if (frames[index + 1].firstRoll === 10) {
            if (Object.keys(frames[index + 2]).length === 0) {
                return -1;
            } else if (frames[index + 2].firstRoll === 10 || (frames[index + 2].firstRoll + frames[index + 2].secondRoll) === 10) {
                return 30;
            } else {
                return frames[index + 2].firstRoll + frames[index + 2].secondRoll + 20;
            }
        } else if ((frames[index + 2].firstRoll + frames[index + 2].secondRoll) === 10) {
            if (frames[index + 2].firstRoll === 10) {
                return 30;
            } else if (Object.keys(frames[index + 2]).length === 0) {
                return -1;
            } else {
                return 20 + frames[index + 2].firstRoll;
            }
        } else {
            return frames[index + 1].firstRoll + frames[index + 1].secondRoll + 10
        }
    } else if ((frames[index].firstRoll + frames[index].secondRoll) === 10) {
        if (Object.keys(frames[index + 1]).length === 0) {
            return -1;
        } else if (frames[index + 1].firstRoll === 10) {
            return 20;
        } else {
            return frames[index + 1].firstRoll + 10;
        }
    } else {
        return frames[index].firstRoll + frames[index].secondRoll;
    }
};

const getScore = function (frames) {
    let score = 0;
    let stepScore;
    for (let i = 0; i < frames.length; i++) {
        stepScore = getFrameScore(frames, i);
        if (stepScore === -1) {
            return score;
        } else {
            score += stepScore;
        }
    }
    return score
};

module.exports = getScore;