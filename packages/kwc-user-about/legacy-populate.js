function _getAppProgress(progress, app) {
    if (!progress[app]) {
        return 0;
    }
    return progress[app].percentage;
}

export const getStatsForUser = (userProfile, staffPicks) => {
    const result = {};
    if (userProfile.stats
            && userProfile.stats.computed) {
        result.medals = userProfile.stats.computed.num_offline_badges;
        result.shares = userProfile.stats.computed.online_shares;
    }
    if (userProfile.followers) {
        result.followers = userProfile.followers.length;
    }
    if (Number.isInteger(staffPicks)) {
        result.picks = staffPicks;
    }
    return result;
};

export const getProgressForUser = (user, progress) => {
    const { profile } = user;
    const result = {};
    if (profile && profile && profile.legacyProgress) {
        const { legacyProgress } = profile;
        result.makeArt = _getAppProgress(legacyProgress, 'kano-draw');
        result.makeSnake = _getAppProgress(legacyProgress, 'make-snake');
        result.makeMinecraft = _getAppProgress(legacyProgress, 'make-minecraft');
        result.makePong = _getAppProgress(legacyProgress, 'make-pong');
        result.terminalQuest = _getAppProgress(legacyProgress, 'linux-story');
    }
    if (progress) {
        [
            { source: progress['badges-vanilla'].badges, target: 'kanoCode', max: 4 },
            { source: progress['badges-pixel-kit'].badges, target: 'pixelKit', max: 7 },
            { source: progress['badges-motion-sensor'].badges, target: 'motionSensor', max: 5 },
        ].forEach((spec) => {
            const doneCount = spec.source.reduce((sum, badge) => {
                if (badge.unlocked) {
                    return sum + 1;
                }
                return sum;
            }, 0);
            result[spec.target] = Math.min((doneCount / spec.max) * 100, 100);
        });
    }
    return result;
};
