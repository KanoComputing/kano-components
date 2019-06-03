const defaultLocales = {
    minute: 'less than a minute',
    minutes: '%d minutes',
    hour: 'less than an hour',
    hours: '%d hours',
    day: 'one day',
    days: '%d days',
    month: 'one month',
    months: '%d months',
    year: 'one year',
    years: '%d years',
};

export function timeAgo(interval, unit, locales = defaultLocales) {
    const key = interval > 1 ? `${unit}s` : unit;
    return locales[key].replace(/%d/, interval);
}

export function timeSince(date, locales = defaultLocales) {
    const UTCDate = /Z$/.test(date) ? date : `${date}Z`;
    const parsedDate = new Date(Date.parse(UTCDate));
    const seconds = Math.floor((new Date() - parsedDate) / 1000);
    let interval = Math.floor(seconds / 31536000);
    if (interval >= 1) {
        return timeAgo(interval, 'year', locales);
    }
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
        return timeAgo(interval, 'month', locales);
    }
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) {
        return timeAgo(interval, 'day', locales);
    }
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) {
        return timeAgo(interval, 'hour', locales);
    }
    interval = Math.floor(seconds / 60);
    return timeAgo(interval, 'minute', locales);
}
